# Extensions Code for Chrome — YouTube Video Links Extractor

> A fast, lightweight Chrome Extension (Manifest V3) and standalone script suite to extract, deduplicate, and copy all YouTube video URLs (`/watch?v=...`) directly to your clipboard or download them as a `.txt` file.

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Manifest V3](https://img.shields.io/badge/Chrome_Extension-Manifest_V3-green.svg)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![Author](https://img.shields.io/badge/Author-kartikktr880-red.svg)](https://github.com/kartikktr880)

---

## 🚀 Overview

This repository provides tools for bulk-extracting YouTube video links from any YouTube page (channel video catalogs, playlists, search results, home feed, or watch queues):

1. **Chrome Extension (Manifest V3)**: Install directly into Google Chrome, Brave, Edge, or any Chromium browser. Click the extension icon on any YouTube page to extract, view, copy to clipboard, or download as a text file in 1 click.
2. **Standalone DevTools Snippet**: Ready-to-paste JavaScript code for running directly in the browser's Developer Tools Console (`F12`).
3. **Original Code Reference**: Preserves the original `code to extract youtube videos.txt` reference script.

---

## ✨ Features

- **1-Click Extraction**: Scans the active YouTube tab and detects all video links (`/watch?v=`).
- **Automatic Deduplication**: Filters out duplicate links and normalizes query parameters (`https://www.youtube.com/watch?v={id}`).
- **Direct Clipboard Copy**: Copies the full newline-delimited list of URLs directly into your system clipboard.
- **File Export**: Download the extracted URLs as a timestamped `.txt` file (`youtube_video_links_YYYY-MM-DD.txt`).
- **Zero Dependencies**: Pure modern JavaScript and native browser APIs.
- **Manifest V3 Compliant**: Built following Google's latest extension security standards.

---

## 📁 Repository Structure

```text
extensions-code-for-chrome/
├── .gitignore
├── LICENSE
├── README.md
├── code to extract youtube videos.txt     # Original extraction script
├── extension/                            # Complete Manifest V3 Chrome Extension
│   ├── manifest.json                     # Extension metadata & permissions
│   ├── popup.html                        # Sleek UI popup
│   ├── popup.css                         # Dark theme styles
│   ├── popup.js                          # Extraction & export logic
│   ├── content.js                        # Content script for YouTube tabs
│   └── icons/                            # Extension icons (16px, 48px, 128px)
│       ├── icon16.png
│       ├── icon48.png
│       └── icon128.png
└── scripts/
    └── extract_youtube_videos.js         # Modular DevTools console snippet
```

---

## 🛠️ How to Install & Use the Chrome Extension

### Step 1: Load the Extension into Chrome
1. Open Google Chrome (or any Chromium browser like Brave, Edge, Opera).
2. Navigate to `chrome://extensions/` in your address bar.
3. Enable **Developer mode** using the toggle switch in the top-right corner.
4. Click **Load unpacked** in the top-left corner.
5. Select the `extension` folder from this repository.
6. The **YouTube Video Extractor** extension is now installed! Pin it to your Chrome toolbar for quick access.

### Step 2: Extract Videos
1. Open any YouTube page with video links (e.g., a channel's **Videos** tab or a **Playlist**).
2. *(Optional)* Scroll down to load as many videos as you need.
3. Click the extension icon in your Chrome toolbar.
4. Click **Extract Links Now**.
5. Click **Copy All** or **Download TXT** to save your video list!

---

## 💻 Alternative: Using DevTools Console Snippet

If you don't want to install an extension, you can run the standalone script directly:

1. Open YouTube in Chrome.
2. Press `F12` (or `Ctrl + Shift + I` / `Cmd + Option + I`) to open Developer Tools.
3. Switch to the **Console** tab.
4. Copy and paste the code from [`scripts/extract_youtube_videos.js`](scripts/extract_youtube_videos.js) (or [`code to extract youtube videos.txt`](code%20to%20extract%20youtube%20videos.txt)) and press `Enter`.
5. The extracted links will be logged in the console and automatically copied to your clipboard.

---

## 🔐 Security & Safety Guarantee

- **No Secrets or Credentials**: This repository contains strictly client-side browser automation code and zero sensitive credentials or API keys.
- **100% Cloud-Backed**: Once pushed to GitHub under [`kartikktr880`](https://github.com/kartikktr880), the full history and files are preserved remotely and can be cloned anywhere with:
  ```bash
  git clone https://github.com/kartikktr880/extensions-code-for-chrome.git
  ```

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).
Created and maintained by [kartikktr880](https://github.com/kartikktr880).
