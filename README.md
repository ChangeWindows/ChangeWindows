# About Horizon

Horizon is the next major version of ChangeWindows. For version 5, see Viv.

# Release notes
ChangeWindows 7 Preview 3 is a major feature update to bring ChangeWindows 7 to near-feature-parity with ChangeWindows 5. All (or very close to all) features we already have have been re-implemented with this update.

## Features
### #33 Channels
The Channels-page is back with an improved overview page. Each platform will now show all channels across all releases. When a channel in a release is no longer supported, it will be grayed-out to indicate this.

### Timeline
* 5c9cb84 Timeline has an updated icon.
* #12 **Clickable timeline**: timeline items are now clickable and will link to their corresponding release.
* #41 **Clickable channels**: like timeline flights, the channels on the right-hand-side are now also clickable to navigate quickly to the corresponding release.
* #34 **Combine timeline items**: flight that have been released on the same platform in multiple channels on the same day will now be shown on one line instead of each flight having its own line.
* 2aec402 **Channels on mobile**: as part of the introduction of the Channels-page, the channels on the Timeline will now disappear entirely on small screens.

### Releases
* #18 **Life-cycle timeline**: the responsive design of the life-cycle timeline has been drastically improved with a timeline that will now split to multiple lines.
* #39 The order of releases on the Releases-page has been updated from "by version" to "by platform by version" to better group related releases.

### Platforms
* e6524af Introduces an updated, cleaner heading design for the Platform-pages.
* #41 **Clickable channels**: the channels at the top of the page will now link to the specific release that this channel currently holds.

### General UX
* #35 Improved dropdown design and better support for touch screens.
* #37 **Better platform listings**: we've updated the pages where all platforms are shown in order to show tool-platforms (like SDK and ISO) at the end of the list instead of appearing after all non-legacy platforms.
* #38 **Platform navigation**: the platform navigation at the top of pages like the Timeline, Platforms, and Channels has been improved with a more responsive design that will show the platforms even to the smallest screens.
* c34473e The main navigation will require slightly less space, allowing more items to be shown on smaller screens.
* 247593b The progressbar at the top of the page now uses our brand color.

### Management
* #29 **Changelog editor**: introduces a dedicated management page for the changelog of a release to provide more space to edit.
* #32 **Updates Tweet variables**: to allow for more customization between platforms, the `%OS%` variable for tweets has been split up into `%RELEASE%` and `%VERSION%` and the `%CODENAME` variable has been added.

## Bug fixes
- d4ccf93 Fixes an issue where the page height wouldn't update properly when resizing the window.
- 3ca7b57 Fixes the incorrect spelling of "Platforms" on the Platforms-page.