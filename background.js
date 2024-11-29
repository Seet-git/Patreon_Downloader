let m3u8Files = [];

// Fetch and analyze .m3u8 file content
async function analyzeM3U8(url) {
  try {
    const response = await fetch(url);
    const text = await response.text();

    // Extract bandwidth or resolution information
    const bandwidthMatch = text.match(/BANDWIDTH=(\d+)/g);
    const resolutionMatch = text.match(/RESOLUTION=(\d+x\d+)/g);

    const bandwidths = bandwidthMatch ? bandwidthMatch.map(bw => parseInt(bw.split('=')[1])) : [];
    const resolutions = resolutionMatch ? resolutionMatch.map(res => res.split('=')[1]) : [];

    // Only return files with valid data
    if (bandwidths.length > 0 || resolutions.length > 0) {
      return {
        url: url,
        bandwidths: bandwidths,
        resolutions: resolutions
      };
    } else {
      return null; 
    }
  } catch (error) {
    console.error(`Error analyzing ${url}:`, error);
    return null;
  }
}

// Monitor network requests to detect .m3u8 files
chrome.webRequest.onCompleted.addListener(
  async (details) => {
    if (details.url.includes(".m3u8") && !m3u8Files.some((file) => file.url === details.url)) {
      const analyzedFile = await analyzeM3U8(details.url);
      if (analyzedFile) {
        m3u8Files.push(analyzedFile);
        console.log(`Added .m3u8 file:`, analyzedFile);
      } else {
        console.log(`Ignored .m3u8 file: ${details.url}`);
      }
    }
  },
  { urls: ["<all_urls>"] }
);

// Handle messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.command === "get_m3u8_files") {
    sendResponse({ files: m3u8Files });
  } else if (message.command === "clear_m3u8_files") {
    m3u8Files = [];
    sendResponse({ success: true });
  }
});
