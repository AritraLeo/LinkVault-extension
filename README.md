# LinkVault - Chrome Extension

## Overview
LinkVault is a Chrome extension that allows users to save URLs of web pages for easy access and reference. This extension provides a simple interface with a button to save the current tab's URL and title, and it attempts to save the URLs to a Firebase database.

## Features
- Save URLs locally using Chrome's storage API.
- Attempt to save URLs to a Firebase database.
- Simple and intuitive user interface.
- Easy access to saved URLs.

## Installation
1. Clone the repository to your local machine.
2. Open Google Chrome and go to `chrome://extensions/`.
3. Enable Developer Mode.
4. Click on "Load unpacked" and select the directory where the extension files are located.

## Usage
1. Click on the extension icon in the Chrome toolbar.
2. Click the "Save Current Tab" button to save the URL and title of the current tab.
3. Access saved URLs by opening the extension popup.

## Technologies Used
- HTML
- CSS
- JavaScript
- Chrome Extension API
- Firebase

## Known Issues
- Policy restrictions preventing saving to Firebase.
- Limited error handling for Firebase integration.

## Future Improvements
- Enhance error handling for Firebase integration.
- Implement better UI feedback for successful saves.
- Add functionality to categorize and organize saved URLs.

## Contributors
- AritrLeo

## License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

Feel free to contribute, report issues, or suggest improvements by creating a pull request or opening an issue.

Thank you for using LinkVault
