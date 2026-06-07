(async function() {
    console.log("Starting LeetCode List Importer...");

    // 1. Prompt user for their List ID
    const listHash = prompt("1. Enter your LeetCode list ID Hash (e.g., if your URL is https://leetcode.com/problem-list/ab1c23d/, enter ab1c23d):");
    if (!listHash) return console.log("Aborted: No List ID provided.");

    // 2. Prompt user for their problem numbers
    const numbersInput = prompt("2. Enter a comma-separated list of LeetCode question numbers (e.g., 1,2,3,42):");
    if (!numbersInput) return console.log("Aborted: No numbers provided.");

    // Clean and parse the input into an array of integers
    const targetNumbers = numbersInput.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
    if (targetNumbers.length === 0) return console.log("Aborted: No valid numbers found in input.");
    
    console.log(`Parsed ${targetNumbers.length} valid question numbers. Fetching LeetCode problem mappings...`);

    // 3. Fetch LeetCode API to map Frontend ID to Internal Question ID
    const metaRes = await fetch("https://leetcode.com/api/problems/all/");
    const metaData = await metaRes.json();
    
    const idMap = {};
    metaData.stat_status_pairs.forEach(pair => {
        idMap[String(pair.stat.frontend_question_id)] = pair.stat.question_id;
    });
    
    const internalIds = targetNumbers.map(n => idMap[String(n)]).filter(Boolean);
    console.log(`Matched ${internalIds.length} out of ${targetNumbers.length} questions. Starting import...`);

    if (internalIds.length === 0) return console.log("Aborted: No internal IDs matched.");

    // 4. Retrieve CSRF Token needed for GraphQL operations
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };
    const csrfToken = getCookie("csrftoken") || "";

    // 5. Send GraphQL Mutations in chunks
    const CHUNK_SIZE = 30; 
    
    for(let i = 0; i < internalIds.length; i += CHUNK_SIZE) {
        const chunk = internalIds.slice(i, i + CHUNK_SIZE);
        const mutations = chunk.map((id, idx) => 
            `add${idx}: addQuestionToFavorite(favoriteIdHash: "${listHash}", questionId: "${id}") { ok }`
        ).join(" ");
        
        const query = `mutation { ${mutations} }`;
        
        await fetch('https://leetcode.com/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify({ query })
        });
        
        console.log(`Pushed batch ${Math.floor(i / CHUNK_SIZE) + 1} of ${Math.ceil(internalIds.length / CHUNK_SIZE)}...`);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log("✅ Successfully finished adding all questions! Refresh your LeetCode list page.");
})();
