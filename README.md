
# Patreon Video Downloader

**⚠ WARNING: This extension is intended for personal use only and should only be used to download videos you have legally obtained access to, such as through a paid subscription or explicit permission from the content owner. Unauthorized downloading of copyrighted content is illegal and against this project's intended use. ⚠**


## Demo

*(TODO)*

## Installation

1. Download or clone this repository:
   ```bash
   git clone https://github.com/Seet-git/Patreon_Downloader.git
   ```
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer Mode**.
4. Click **Load Unpacked** and select the project folder.

## Usage

1. Activate the extension and navigate to a page where an M3U8 file is being streamed.
2. Click the extension icon to open the popup.
3. View detected files, copy URLs, or download them using the generated script.
4. Run the generated script to convert M3U8 files to MP4 using FFmpeg.

## Configuration

### Permissions

This extension requires the following permissions:
- `webRequest`: To monitor network requests and detect M3U8 files.
- `activeTab`: To interact with the active browser tab.

### Technologies used

- **Manifest v3**: To define the extension's metadata.
- **JavaScript**: For file analysis and interaction handling.
- **HTML and CSS**: For the popup user interface.

## External dependencies

- [FFmpeg](https://ffmpeg.org/): Required to convert M3U8 files to MP4. Make sure FFmpeg is installed on your system and added to your `PATH`.

## Development

### File structure

- `background.js`: Manages background events and M3U8 file detection.
- `popup.html` and `popup.js`: User interface for displaying and interacting with detected files.
- `manifest.json`: Configuration file for the extension.

### Useful commands

- Local conversion with FFmpeg:
  ```bash
  ffmpeg -i "m3u8_file_url" -c copy output.mp4
  ```

## Future improvements

- Compatibility for Firefox, Safari
- Direct video downloads from the interface.
- Add an interface to select resolutions for download.

## Contributions

Contributions are welcome! Please open an issue or pull request for any suggestions or improvements.
