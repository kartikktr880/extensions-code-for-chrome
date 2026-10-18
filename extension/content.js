/**
 * YouTube Video Link Extractor - Content Script
 * Scans DOM anchor elements for YouTube video watch URLs,
 * deduplicates them, and standardizes them.
 */

function extractYouTubeVideoUrls() {
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

  // Remove duplicate URLs
  return [...new Set(urls)];
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'EXTRACT_VIDEOS') {
    const videoUrls = extractYouTubeVideoUrls();
    sendResponse({ success: true, count: videoUrls.length, urls: videoUrls });
  }
  return true;
});
