# LeetCode List Bulk Importer 🚀

A lightweight, vanilla JavaScript browser script that allows you to bulk import hundreds of LeetCode problems into a Custom List using a comma-separated string of problem numbers. 

Managing massive problem sets (like company-specific lists, blind 75, or advanced graphs camps) in external spreadsheets disconnects you from LeetCode's native environment. This script bridges that gap by leveraging LeetCode's GraphQL API to push external lists directly into your account so you can utilize native tags, difficulty filters, and progress tracking.

## ✨ Features
* **No Extensions Required:** Runs entirely in your browser's Developer Console.
* **Smart ID Mapping:** Automatically maps standard LeetCode problem numbers (e.g., `1`, `42`) to their internal database IDs.
* **Rate-Limit Safe:** Batches GraphQL mutations into chunks with built-in delays to prevent HTTP 429 (Too Many Requests) errors.
* **Privacy First:** Prompts for your specific List Hash and problem numbers locally. No personal data is hardcoded.

## 🛠️ Prerequisites
1. An active [LeetCode](https://leetcode.com/) account.
2. A customized list created on your LeetCode profile.
3. A comma-separated list of the problem numbers you want to add.

## 🚀 How to Use

### Step 1: Get Your List ID Hash
1. Go to your [LeetCode Lists Page](https://leetcode.com/problem-list/) and create a new list (e.g., "Google DSA Prep").
2. Click on the list to open it.
3. Look at the URL in your browser's address bar. It will look like this: `https://leetcode.com/problem-list/ab1c23d/`.
4. Copy the 6 or 7 character code at the end (e.g., **`ab1c23d`**). This is your List ID Hash.

### Step 2: Run the Script
1. Keep your LeetCode List tab open and logged in.
2. Press `F12` (or `Right-Click` -> `Inspect`) to open your browser's Developer Tools.
3. Navigate to the **Console** tab.
4. Copy the entire contents of `script.js` from this repository.
5. Paste the script into the console and press **Enter**.
   * *Note: If Chrome gives you a security warning about pasting code, type `allow pasting` into the console and hit Enter first, then paste the script.*
6. A prompt will appear asking for your **List ID Hash**. Paste the code from Step 1.
7. A second prompt will ask for your **Problem Numbers**. Paste your comma-separated list (e.g., `1,2,42,4,9`).
8. Let the script run! You will see progress logs in the console. Once it says `✅ Successfully finished...`, simply refresh the page to see your populated list.

## ⚠️ Troubleshooting
* **"Aborted: No valid numbers found"**: Ensure your input string is purely numbers separated by commas, without trailing letters or special characters.
* **Browser Security Warning**: Modern browsers block pasting code into the console by default to protect against self-XSS. You must manually type `allow pasting` (in Chrome) to unlock the console.
* **Some problems didn't import**: Premium/Locked problems might fail to import if you do not have an active LeetCode Premium subscription.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](../../issues) if you want to contribute.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
