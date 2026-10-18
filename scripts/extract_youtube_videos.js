/**
 * YouTube Video Link Extractor (DevTools Console Snippet)
 * 
 * Usage:
 * 1. Open any YouTube page (channel videos tab, playlist, search results, or home).
 * 2. Press F12 or Ctrl+Shift+I to open Chrome Developer Tools.
 * 3. Switch to the 'Console' tab.
 * 4. Paste this script and press Enter.
 * 5. All unique video links will be copied directly to your clipboard!
 */

(function extractYouTubeVideos() {
  console.log("%c[YouTube Extractor] Scanning page for video links...", "color: #3b82f6; font-weight: bold;");

  const allLinks = document.getElementsByTagName('a');
  const urls = [];

  for (let i = 0; i < allLinks.length; i++) {
    const href = allLinks[i].href;
    if (href && href.includes('/watch?v=')) {
      try {
        const urlObj = new URL(href);
        const videoId = urlObj.searchParams.get('v');
        if (videoId) {
          urls.push(`https://www.youtube.com/watch?v=${videoId}`);
        } else {
          urls.push(href);
        }
      } catch {
        urls.push(href);
      }
    }
  }

  // Deduplicate
  const uniqueUrls = [...new Set(urls)];
  const finalResult = uniqueUrls.join('\n');

  console.log(finalResult);

  // Copy to clipboard
  if (typeof copy === 'function') {
    copy(finalResult);
    console.log(`%c[YouTube Extractor] SUCCESS: ${uniqueUrls.length} unique video links copied to clipboard!`, "color: #22c55e; font-weight: bold; font-size: 14px;");
  } else if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(finalResult).then(() => {
      console.log(`%c[YouTube Extractor] SUCCESS: ${uniqueUrls.length} unique video links copied to clipboard!`, "color: #22c55e; font-weight: bold; font-size: 14px;");
    }).catch(err => {
      console.warn("[YouTube Extractor] Clipboard write failed. Please copy the text logged above manually.", err);
    });
  } else {
    console.log(`%c[YouTube Extractor] Found ${uniqueUrls.length} unique links. Copy them from the console output above.`, "color: #f59e0b; font-weight: bold;");
  }

  return uniqueUrls;
})();
