document.addEventListener("DOMContentLoaded", () => {
  const fileList = document.getElementById("file-list");
  const resetButton = document.getElementById("reset");

  // Get and display the file
  chrome.runtime.sendMessage({ command: "get_m3u8_files" }, (response) => {
    fileList.innerHTML = ""; // Clear existing list
    response.files.forEach((file) => {
      const highestBandwidthIndex = file.bandwidths.indexOf(Math.max(...file.bandwidths));
      const bestResolution = file.resolutions[highestBandwidthIndex] || "Unknown";
      const bestBandwidth = file.bandwidths[highestBandwidthIndex] || "Unknown";
      const bestUrl = file.url;

      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <strong>URL:</strong> <a href="${file.url}" target="_blank">${file.url}</a><br>
        <button class="select-btn" data-url="${file.url}">Copy URL</button>
        <button class="download-btn" data-url="${bestUrl}">Download MP4</button>
      `;
      fileList.appendChild(listItem);
    });

    // "Copy URL" buttons
    document.querySelectorAll(".select-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const url = event.target.getAttribute("data-url");
        navigator.clipboard.writeText(url);
      });
    });

    // "Download MP4" buttons
    document.querySelectorAll(".download-btn").forEach((button) => {
      button.addEventListener("click", async (event) => {
        const url = event.target.getAttribute("data-url");

        // Generate a script to download and convert the file to MP4
        const ffmpegCommand = `ffmpeg -i "${url}" -c copy output.mp4
`;
        const blob = new Blob([ffmpegCommand], { type: "text/plain" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "convert_to_mp4.sh"; // Script for Linux/Mac (WINDUMB)
        a.click();
        URL.revokeObjectURL(a.href);
      });
    });
  });

  // Reset the lists
  resetButton.addEventListener("click", () => {
    chrome.runtime.sendMessage({ command: "clear_m3u8_files" }, (response) => {
      if (response.success) {
        fileList.innerHTML = "";
      }
    });
  });
});
