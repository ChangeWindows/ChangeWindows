import React from 'react'

import App from '../../Layouts/App'
import Channel from '../../Components/Cards/Channel'
import Flight from '../../Components/Timeline/Flight'
import Timeline from '../../Components/Timeline/Timeline'
import Progress from '../../Components/Progress/Progress'
import ProgressBar from '../../Components/Progress/ProgressBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaptop, faListTimeline, faNotes } from '@fortawesome/pro-regular-svg-icons'
import PlatformIcon from '../../Components/Platforms/PlatformIcon'
import { format, parseISO } from 'date-fns'

export default function Show({ release, platform, channels, timeline }) {
    console.log(channels);
    return (
        <App>
            <nav className="navbar navbar-expand-xl navbar-light sticky-top">
                <div className="container">
                    <span className="navbar-brand">Releases</span>
                </div>
            </nav>
        
            <div className="container my-3">
                <div className="row g-3">
                    <div className="col-12">
                        <div className="d-flex">
                            <div className="me-2">
                                <h1 className="h2 text-pc"><PlatformIcon platform={platform} /></h1>
                            </div>
                            <div>
                                <h1 className="h2 mb-0 fw-bold" style={{ color: platform.color }}>{release.name}</h1>
                                <h2 className="h5 text-muted">Version {release.version}, {release.codename}</h2>
                            </div>
                        </div>

                        <div className="row g-2 mt-3">
                            {channels.map((channel, key) => (
                                <Channel
                                    key={key}
                                    channel={{ color: channel.color, class: '', name: channel.name }}
                                    build={channel.flight.version ?? 'None'}
                                    date={channel.flight?.date ? format(parseISO(channel.flight.date), 'd MMMM yyyy') : 'No flight'}
                                    disabled={channel.disabled}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="col-12">
                        <h2 className="h5 my-4 fw-bold">Life-cycle</h2>
                        <div className="d-flex progress-group">
                            <Progress
                                width={5.82}
                                title="Development"
                                startDescription={format(parseISO(release.start_preview), 'd MMM yyyy')}
                            >
                                <ProgressBar progress={100} />
                            </Progress>
                            <Progress
                                width={15.58}
                                title="Support"
                                startDescription={format(parseISO(release.start_public), 'd MMM yyyy')}
                            >
                                <ProgressBar progress={100} color="success" />
                            </Progress>
                            <Progress
                                width={9.21}
                                title="Extended"
                                startDescription={format(parseISO(release.start_extended), 'd MMM yyyy')}
                            >
                                <ProgressBar progress={100} color="warning" />
                            </Progress>
                            <Progress
                                width={69.39}
                                title="LTSC"
                                startDescription={format(parseISO(release.start_lts), 'd MMM yyyy')}
                                endDescription={format(parseISO(release.end_lts), 'd MMM yyyy')}
                            >
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
                                            {release.changelog}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="nav-timeline" role="tabpanel" aria-labelledby="nav-timeline-tab">
                                <div className="row">
                                    <div className="col-12 mt-4">
                                        <h2 className="h5 mb-3 fw-bold">Timeline</h2>
                                        <div className="row g-4">
                                            {Object.keys(timeline).map((date, key) => (
                                                <Timeline date={format(parseISO(timeline[date].date), 'd MMMM yyyy')} key={key}>
                                                    {timeline[date].flights.map((flight, key) => (
                                                        <Flight
                                                            key={key}
                                                            platform={flight.platform}
                                                            build={flight.flight}
                                                            channels={[flight.release_channel]}
                                                            version={flight.version}
                                                        />
                                                    ))}
                                                </Timeline>
                                            ))}
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