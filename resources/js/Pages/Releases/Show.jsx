import React from 'react'

import App from '../../Layouts/App'
import Channel from '../../Components/Cards/Channel'
import Flight from '../../Components/Timeline/Flight'
import Timeline from '../../Components/Timeline/Timeline'
import Progress from '../../Components/Progress/Progress'
import ProgressBar from '../../Components/Progress/ProgressBar'
import ReleaseCard from '../../Components/Cards/ReleaseCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag, faLaptop, faListTimeline, faNotes } from '@fortawesome/pro-regular-svg-icons'

export default function Show() {
    return (
        <App>
            <nav className="navbar navbar-expand-xl navbar-light sticky-top">
                <div className="container">
                    <a className="navbar-brand" href="#">Releases</a>
                </div>
            </nav>
        
            <div className="container my-3">
                <div className="row g-3">
                    <div className="col-12">
                        <div className="d-flex">
                            <div className="me-2">
                                <h1 className="h2 text-pc"><FontAwesomeIcon icon={faLaptop} fixedWidth /></h1>
                            </div>
                            <div>
                                <h1 className="h2 mb-0 text-pc fw-bold">Windows 10 version 2004</h1>
                                <h2 className="h5 text-muted">April 2020 Update, Vibranium</h2>
                            </div>
                        </div>

                        <div className="row g-2 mt-3">
                            <Channel
                                disabled
                                channel={{ class: 'skip', name: 'Skip-Ahead' }}
                                build="19018.1"
                                date="5 Nov 2019"
                            />
                            <Channel
                                disabled
                                channel={{ class: 'dev', name: 'Fast' }}
                                build="19041.1"
                                date="10 Dec 2019"
                            />
                            <Channel
                                disabled
                                channel={{ class: 'beta', name: 'Slow' }}
                                build="19041.330"
                                date="16 Jun 2020"
                            />
                            <Channel
                                disabled
                                channel={{ class: 'release', name: 'Release Preview' }}
                                build="19041.450"
                                date="11 Aug 2020"
                            />
                            <Channel
                                channel={{ class: 'public', name: 'Semi-Annual' }}
                                build="19041.844"
                                date="24 Feb 2021"
                            />
                        </div>
                    </div>

                    <div className="col-12">
                        <h2 className="h5 my-4 fw-bold">Life-cycle</h2>
                        <div className="d-flex progress-group">
                            <Progress width={5.82} title="Development" startDescription="16 Dec 2015">
                                <ProgressBar progress={100} />
                            </Progress>
                            <Progress width={15.58} title="Support" startDescription="2 Aug 2016">
                                <ProgressBar progress={100} color="success" />
                            </Progress>
                            <Progress width={9.21} title="Extended" startDescription="10 Apr 2018">
                                <ProgressBar progress={100} color="warning" />
                            </Progress>
                            <Progress width={69.39} title="LTSC" startDescription="9 Apr 2019" endDescription="13 Oct 2026">
                                <ProgressBar progress={30} color="danger" />
                            </Progress>
                        </div>
                    </div>

                    <div className="col-12">
                        <nav className="mt-4">
                            <div className="nav nav-lined" id="nav-tab" role="tablist">
                                <button className="nav-link active" id="nav-releases-tab" data-bs-toggle="tab" data-bs-target="#nav-releases" type="button" role="tab" aria-controls="nav-releases" aria-selected="true"><FontAwesomeIcon icon={faNotes} fixedWidth /> Release notes</button>
                                <button className="nav-link" id="nav-timeline-tab" data-bs-toggle="tab" data-bs-target="#nav-timeline" type="button" role="tab" aria-controls="nav-timeline" aria-selected="false"><FontAwesomeIcon icon={faListTimeline} fixedWidth /> Timeline</button>
                            </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-releases" role="tabpanel" aria-labelledby="nav-releases-tab">
                                <div className="row">
                                    <div className="col-12 mt-4">
                                        <h2 className="h5 mb-3 fw-bold">Release notes</h2>

                                        
<div className="changelog-content">
<h2 className="h5">Start</h2>
<ul>
<li><em>Nothing to share yet</em></li>
</ul>
<h2 className="h5">Cortana</h2>
<ul>
<li>Cortana has been redesigned with a conversation-based UI and support for light mode</li>
<li>The Cortana window can now be moved across the desktop</li>
</ul>
<h2 className="h5">Search</h2>
<ul>
<li>Windows no longer indexes developer forlders like .git, .svn, .Nuget, .hg and more</li>
<li>Search can now better identify high usage and only index when enough resources are available.</li>
</ul>
<h2 className="h5">Taskbar + Action center</h2>
<ul>
<li>Searching in Timeline when you didn't opt-in no longer requires you to tab past the opt-in text before you get to the search results</li>
<li>Action center will now show a direct link to Notification settings</li>
<li>You can now rename virtual desktops</li>
</ul>
<h2 className="h5">User Interface</h2>
<ul>
<li><em>Nothing to share yet</em></li>
</ul>
<h2 className="h5">File Explorer</h2>
<ul>
<li>Search is now powered by Microsoft Search</li>
<li>The Search bar in the File Explorer is now slightly longer by default</li>
<li>The context menu for .HEIC-files will now include options to Print or Set as Desktop Background</li>
</ul>
<h2 className="h5">Settings</h2>
<h3 className="h6">System</h3>
<ul>
<li>The App Volume and Device Preferences page has been redesigned</li>
<li>Storage Sense's group policies have been updated with better explanations for their functionality</li>
<li>You can now disable sounds for all notifications at once</li>
<li>You can now sort notifications senders</li>
<li>Under Notifications &amp; actions, a setting has been added to disable the post-upgrade setup page</li>
</ul>
<h3 className="h6">Devices</h3>
<ul>
<li>You can now manage the mouse cursor speed</li>
<li>When pairing with Swift Pair, the entire flow now happens within the notification with no need to open Settings</li>
<li>One less notification has to be shown for the full pairing experience over Bluetooth</li>
<li>You can now dismiss Swift Pair from the notification with the Dismiss-button</li>
<li>The device name and category are now shown in a Swift Pair notification</li>
</ul>
<h3 className="h6">Network &amp; Internet</h3>
<ul>
<li>The network Status page has been redesigned, showing the network usage for all active connections and integrating Data Usage</li>
</ul>
<h3 className="h6">Personalization</h3>
<ul>
<li><em>Nothing to share yet</em></li>
</ul>
<h3 className="h6">Apps</h3>
<ul>
<li>You can now select multiple features to be installed on your device</li>
<li>Features can now be searched through as well as sort them by Name, Size or Install date</li>
<li>Features will now shown when they were installed and any other dependencies they have</li>
<li>Latest actions has been added to Optional features and shows which installs, uninstalls and cancels you've performed</li>
</ul>
<h3 className="h6">Accounts</h3>
<ul>
<li>"Make your device passwordless" has been added as a new option under Sign-in options</li>
<li>Your account picture will now sync faster through any Microsoft services</li>
<li>Ease of Access settings can no longer be set to sync between devices</li>
<li>The option "Automatically save my restartable apps when I sign out and restart them after I sign in." has been added on the Sign-in options page</li>
</ul>
<h3 className="h6">Time &amp; language</h3>
<ul>
<li>Language will now show an overview of various aspects of the system and to which language they are set, including Windows display, Apps &amp; websites, Regional format, Keyboard and Speech, providing quick access to the various settings</li>
<li>The link to add a local experience pack has been removed</li>
<li>Opening a language's options will now show an updated language features overview
<ul>
<li>Required features are now listed below other features without a disabled checkmark</li>
<li>Features and settings that depend on other features and settings are now shown as a subitem of their parents</li>
<li>The various language feature will now show an icon on the right that will give the user a tooltip</li>
</ul></li>
</ul>
<h3 className="h6">Gaming</h3>
<ul>
<li><em>Nothing to share yet</em></li>
</ul>
<h3 className="h6">Ease of Access</h3>
<ul>
<li>There is now a tooltip when hovering over the various color options for your cursor</li>
</ul>
<h3 className="h6">Cortana</h3>
<ul>
<li><em>Nothing to share yet</em></li>
</ul>
<h3 className="h6">Search</h3>
<ul>
<li><em>Nothing to share yet</em></li>
</ul>
<h3 className="h6">Privacy</h3>
<ul>
<li><em>Nothing to share yet</em></li>
</ul>
<h3 className="h6">Update &amp; Security</h3>
<ul>
<li>You can now limit the bandwith usage by Delivery Optimization for both foreground and background</li>
<li>"Cloud download" has been added as a new recovery option</li>
<li>Windows Update will now list optional updates under "View optional updates"</li>
<li>All driver updates are now listed under "View optional updates", removing the need to check for drivers in the Device Manager</li>
</ul>
<h3 className="h6">Mixed Reality</h3>
<ul>
<li><em>Nothing to share yet</em></li>
</ul>
<h3 className="h6">General</h3>
<ul>
<li>Improvements to the launch time when the Settings header is visible</li>
</ul>
<h2 className="h5">Ink Workspace</h2>
<ul>
<li>The Ink Workspace flyout has been replaced with a small flyout menu</li>
<li>Sticky Notes are no longer accessible from the Ink Workspace</li>
<li>Sketchboard has been replaced with the Microsoft Whiteboard app</li>
</ul>
<h2 className="h5">Gaming</h2>
<ul>
<li><em>Nothing to share yet</em></li>
</ul>
<h2 className="h5">System</h2>
<ul>
<li><em>Nothing to share yet</em></li>
</ul>
<h2 className="h5">Accessibility</h2>
<ul>
<li>Magnifier with larger pointers will now pan smoothly when as the pointer changes shape</li>
<li>"Change how capitalized text is read" has been removed from Narrator</li>
<li>Narrator now announced the toggle state of checkboxes in a Listview</li>
<li>Scan mode will now turn off to allow typing in the edit field of a spinner control</li>
<li>Narrator now has improved support for "invalid" and "required" properties on more controls</li>
<li>Narrator Braille can now reliably activate links by routing key</li>
<li>Narrator reliability has been improved from Chrome</li>
<li>Narrator now reads tables more efficiently by only reading the deltas when navigating.</li>
<li>Narrator + S now gives a webpage summary.</li>
<li>You can now keep the text cursor in the center of the screen when typing with Magnifier</li>
<li>Narrator can now say the title and url of a link</li>
<li>Narrator will now read the header first, followed by the cell data, followed by the row/column - position of a cell</li>
<li>When headers in data tables change, Narrator will now read them</li>
<li>Eye Control now supports drag-and-drop</li>
<li>Pausing Eye Control will now completely hide the launchpad</li>
<li>Buttons can now be clicked with switches on joysticks or device that emulate joysticks</li>
<li>Eye Control has been updated to provide more settings</li>
<li>Narrator now automatically starts reading web pages and emails</li>
<li>The Magnifier UI has been revamped with updated icon and moves the magnification in between the zoom buttons, it is no longer to change the view from the Magnifier window</li>
<li>Narrator will now turn on Scan Mode when reading Outlook or Windows Mail mails automatically</li>
<li>Each email will now be read with the status mentioned first in the list view</li>
<li>The text cursor can now be changed to any given color</li>
<li>Narrator will now start reading webpages from the top rather than from the main landmark on it</li>
<li>Narrator now supports the <code>arria-haspopup</code> property</li>
<li>You can now turn of Narrator input learning of by hitting Narrator + 1</li>
<li>Improved Magnifier performance when moving the mouse around the screen</li>
<li>Magnifier reading now support reading in more locations</li>
<li>Narrator's volume for link and scroll sounds has been bumped up</li>
<li>In Outlook, the "importance"-header is now always spoken by Narrator before the importance level</li>
<li>Magnifier can no longer be set to an UI that is visible in the viewport as a magnifying glass</li>
</ul>
<h2 className="h5">Language and input</h2>
<ul>
<li>The on-screen keyboard now uses SwiftKey's Typing Intelligence on 39 new languages: Afrikaans (South Africa), Albanian (Albania), Arabic (Saudi Arabia), Armenian (Armenia), Azerbaijani (Azerbaijan), Basque (Spain), Bulgarian (Bulgaria), Catalan (Spain), Croatian (Croatia), Czech (Czech Republic), Danish (Denmark), Dutch (Netherlands), Estonian (Estonia), Finnish (Finland), Galician (Spain), Georgian (Georgia), Greek (Greece), Hausa (Nigeria), Hebrew (Israel), Hindi (India), Hungarian (Hungary), Indonesian (Indonesia), Kazakh (Kazakhstan), Latvian (Latvia), Lithuanian (Lithuania), Macedonian (Macedonia), Malay (Malaysia), Norwegian (Bokmal, Norway), Persian (Iran), Polish (Poland), Romanian (Romania), Serbian (Serbia), Serbian (Serbia), Slovak (Slovakia), Slovenian (Slovenia), Swedish (Sweden), Turkish (Turkey), Ukrainian (Ukraine), Uzbek (Uzbek)</li>
<li>Dictation support for English (Canada), English (UK), English (Australia), English (India), French (France), French (Canada), German (Germany), Italian (Italy), Spanish (Spain), Spanish (Mexico), Portuguese (Brazil), and Chinese (Simplified, China) has been added</li>
<li>A number of kaomoji have been added the to emoji picker</li>
<li>A number of kaomoji have been added the to emoji picker.</li>
</ul>
<h3 className="h6">Input Method Editor</h3>
<ul>
<li>The development version of the Japanese IME from build 18277 has been restored</li>
<li>Improved security and reliability in the revamped Chinese Simplified and Chinese Traditional IMEs, as well as a cleaner settings interface</li>
<li>The Chinese Pinyin IME now refers to "Default mode" instead of "Input mode"</li>
<li>A tip has been added to the Bopomofo IME settings that Ctrl + Space will toggle the conversation mode</li>
<li>The Japanese IME now has as default assinged value of Ctrl + Space to be "None"</li>
<li>Key assignment settings are now more discoverable in the Japanese IME</li>
<li>Improved performance for the Bopomofo, ChangJie, and Quick IMEs</li>
<li>You can now disable the Shift + Space keyboard shortcut in the Bopomofo IME as well as changing the candidate font size</li>
<li>You can now hide the IME toolbar from the toolbar menu</li>
</ul>
<h2 className="h5">Apps</h2>
<h3 className="h6">Connect</h3>
<ul>
<li>Connect is now an optional feature downloadable in Settings</li>
</ul>
<h3 className="h6">Notepad</h3>
<ul>
<li>Notepad can now restore unsaved content when Windows restarts for updates</li>
</ul>
<h3 className="h6">Task Manager</h3>
<ul>
<li>The disk type will now be shown in Task Manager</li>
<li>Right clicking a process will now show "Provide Feedback" after "End task" and "End process tree" instead of between</li>
<li>The GPU temperature is now shown under Performance &gt; GPU</li>
</ul>
<h3 className="h6">Windows Sandbox</h3>
<ul>
<li>Support for capturing hotkeys in full screen has been added</li>
<li>A configuration file can now be set for Windows Sandboxes</li>
<li>Error dialogs will now show an error code and a link to Feedback Hub</li>
<li>You can now use a microphone in Windows Sandbox</li>
<li>The audio input device can now be set in the Sandbox config file</li>
<li>Shift + Alt + PrtScn now opens the ease of access dialog for high contrast mode</li>
<li>Ctrl + Alt + Break now toggles fullscreen mode</li>
<li>Windows Sandbox no longer requires the use of Admin privileges</li>
</ul>
<h3 className="h6">Windows Subsystem for Linux</h3>
<ul>
<li>The file system of a Linux distro can now be accessed from File Explorer</li>
<li>Windows Subsystem for Linux version 2 has been added to Windows, including a full Linux kernel</li>
<li>Connections can now be made using localhost</li>
<li>Improved performance for directory listings in \wsI$</li>
</ul>
<h2 className="h5">Other features</h2>
<ul>
<li>Tamper Protection will be set on by default again</li>
<li>You can now sign in with your Windows Hello PIN when in Safe Mode</li>
</ul>
<h2 className="h5">And further</h2>
<ul>
<li>The "Windows Light" theme is now called "Windows (light)"</li>
<li>All Emoji 12.0 emojis now have keywords in the emoji picker</li>
<li>The OOBE will now show a lock icon with networks that are private</li>
<li>Windows Defender ATP is being renamed to Microsoft Defender</li>
<li>Windows will now periodically remind you to make backups if you do not have a backup solution installed</li>
<li>You're prefered defragmentation settings are now preserved after upgrading Windows</li>
<li>Support for Microsoft Bluetooth Mouse and Keyboard has been added to Swift Pair</li>
<li>Update the Windows version name to version 2004</li>
</ul>
</div>


                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="nav-timeline" role="tabpanel" aria-labelledby="nav-timeline-tab">
                                <div className="row">
                                    <div className="col-12 mt-4">
                                        <h2 className="h5 mb-3 fw-bold">Timeline</h2>
                                        <div className="row g-4">
                                            <Timeline date="3 March 2021">
                                                <Flight
                                                    platform="pc"
                                                    build="21627.1000"
                                                    channels={[
                                                        { class: 'dev', name: 'Dev' }
                                                    ]}
                                                />
                                            </Timeline>
                                            <Timeline date="23 February 2021">
                                                <Flight
                                                    platform="pc"
                                                    build="120.2212.3030.0"
                                                    channels={[
                                                        { class: 'beta', name: 'Beta' }
                                                    ]}
                                                    component="Windows Feature Experience Pack"
                                                />
                                            </Timeline>
                                            <Timeline date="26 January 2021">
                                                <Flight
                                                    platform="pc"
                                                    build="120.2212.2020.0"
                                                    channels={[
                                                        { class: 'beta', name: 'Beta' }
                                                    ]}
                                                    component="Windows Feature Experience Pack"
                                                />
                                            </Timeline>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </App>
    )
}