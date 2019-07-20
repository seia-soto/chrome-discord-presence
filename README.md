# Chrome Discord Presence

Discord Presence extension for Google Chrome.

## Table of Contents

- [Installation](#Installation)
- [Usage](#Usage)
- [Notice](#Notice)
- [Updates](#Updates)

### Installation

You need to install via compressed or extracted extension source because this extension is not available on Chrome web store.

- [Are you searching for compressed extension(.crx)?](https://github.com/Seia-Soto/chrome-discord-presence/tree/master/dist)

1. Go to [releases tab](https://github.com/Seia-Soto/chrome-discord-presence/releases) and download latest release.

2. Extract the zip archive and go to [Chrome extensions management page(chrome://extensions)](chrome://extensions).

3. Enable developer mode at right top of page and click 'Load unpacked extension...' button.

4. Locate folder `src` inside of extracted zip archive and click 'Select folder(directory)' to finalize installation.

5. You can see Discord icon at right top from under the Chrome tabs.

### Usage

After you installed this extension, you need to open Discord via web browser to crawl token of your account. Token will automatically saved into local storage assigned to extension(This will not synced by Chrome).

1. Click Discord icon at right top from under the Chrome tabs.

2. Tab 'Enable Rich Presence' button.

- If you're on first-run of extension or your token was expired, you can see prompt to open Discord via web browser. Then just open Discord via web browser(not main page) and click retry button inside of prompt. Extension will detect your token from urls below: `https://discordapp.com/app`, `https://discordapp.com/activity`, `https://discordapp.com/channels/@me`

3. Finally, you can see you're playing 'Chrome - {ACTIVE_TAB_NAME}' on Discord.

### Notice

- **You need to becareful at managing your token.** I don't say Chrome will save your token 100% safety. However, you can delete all data by using 'Delete' button from [Chrome extensions management page(chrome://extensions)](chrome://extensions).

- **Check that you're using this extension downloaded and installed from trustful source.** Your security of account is important and make sure you're using extension downloaded from GitHub(here). If you use this extension downloaded and installed from other website or source, it can cause leak of token.

- **Currently, preparing webpage of this extension.** Please wait until this work done.

- **You can request support of this application(extension) via any contactable form.** Your account is important to me and there is no warranty. However I'll help you if you have any questions. You can use issues tab or links in extension.

- **Make sure that you are using latest version of extension.** For your security as I said above.

### Updates

- `1.0.1`: Add caching to reduce traffic and set refresh rate to 3.
