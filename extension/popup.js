document.addEventListener('DOMContentLoaded', () => {
  const extractBtn = document.getElementById('extractBtn');
  const copyBtn = document.getElementById('copyBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const resultsArea = document.getElementById('resultsArea');
  const statsSection = document.getElementById('statsSection');
  const videoCount = document.getElementById('videoCount');
  const statusToast = document.getElementById('statusToast');

  let extractedList = [];

  function showToast(message, type = 'success') {
    statusToast.textContent = message;
    statusToast.className = `toast ${type}`;
    statusToast.classList.remove('hidden');
    setTimeout(() => {
      statusToast.classList.add('hidden');
    }, 3000);
  }

  // Extract function to execute inside the tab
  function extractFromPage() {
    const allLinks = document.getElementsByTagName('a');
    const urls = [];

    for (let i = 0; i < allLinks.length; i++) {
      const href = allLinks[i].href;
      if (href && href.includes('/watch?v=')) {
        try {
          const urlObj = new URL(href);
          const v = urlObj.searchParams.get('v');
          if (v) {
            urls.push(`https://www.youtube.com/watch?v=${v}`);
          } else {
            urls.push(href);
          }
        } catch {
          urls.push(href);
        }
      }
    }

    return [...new Set(urls)];
  }

  extractBtn.addEventListener('click', async () => {
    extractBtn.disabled = true;
    extractBtn.textContent = 'Extracting...';

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      if (!tab || !tab.url) {
        showToast('Unable to access current tab.', 'error');
        extractBtn.disabled = false;
        extractBtn.innerHTML = '<span class="btn-icon">⚡</span> Extract Links Now';
        return;
      }

      if (!tab.url.includes('youtube.com')) {
        showToast('Please open a YouTube page first!', 'error');
        extractBtn.disabled = false;
        extractBtn.innerHTML = '<span class="btn-icon">⚡</span> Extract Links Now';
        return;
      }

      // Execute script on active YouTube tab
      const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: extractFromPage
      });

      if (results && results[0] && Array.isArray(results[0].result)) {
        extractedList = results[0].result;
        resultsArea.value = extractedList.join('\n');
        videoCount.textContent = extractedList.length;
        statsSection.classList.remove('hidden');

        if (extractedList.length > 0) {
          copyBtn.disabled = false;
          downloadBtn.disabled = false;
          showToast(`Found ${extractedList.length} unique video URLs!`);
        } else {
          copyBtn.disabled = true;
          downloadBtn.disabled = true;
          showToast('No video links found on this page.', 'error');
        }
      } else {
        showToast('No links could be extracted.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Error extracting links: ' + err.message, 'error');
    } finally {
      extractBtn.disabled = false;
      extractBtn.innerHTML = '<span class="btn-icon">⚡</span> Extract Links Now';
    }
  });

  copyBtn.addEventListener('click', async () => {
    if (!extractedList.length) return;
    try {
      await navigator.clipboard.writeText(extractedList.join('\n'));
      showToast(`Copied ${extractedList.length} links to clipboard!`);
    } catch {
      // Fallback
      resultsArea.select();
      document.execCommand('copy');
      showToast('Copied to clipboard via fallback!');
    }
  });

  downloadBtn.addEventListener('click', () => {
    if (!extractedList.length) return;
    const blob = new Blob([extractedList.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `youtube_video_links_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Download started!');
  });
});
