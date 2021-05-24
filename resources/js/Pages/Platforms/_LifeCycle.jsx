import React, { useMemo } from 'react';

import Progress from '../../Components/Progress/Progress';
import ProgressBar from '../../Components/Progress/ProgressBar';


import { differenceInDays } from 'date-fns/esm';
import { format, isBefore, parseISO } from 'date-fns';

export default function LifeCycle({ release }) {
    function max(input) {
        if (toString.call(input) !== "[object Array]") {
            return false;
        }

        return Math.max.apply(null, input);
    }

    const [total_duration, preview_duration, public_duration, extended_duration, lts_duration, preview_progress, public_progress, extended_progress, lts_progress, highest_duration] = useMemo(() => {
        const today = new Date();
        const start_preview = release.start_preview ? parseISO(release.start_preview) : null;
        const start_public = release.start_public ? parseISO(release.start_public) : null;
        const start_extended = release.start_extended ? parseISO(release.start_extended) : null;
        const start_lts = release.start_lts ? parseISO(release.start_lts) : null;
        const end_lts = release.end_lts ? parseISO(release.end_lts) : null;

        let preview_duration = 0;
        let public_duration = 0;
        let extended_duration = 0;
        let lts_duration = 0;
        let preview_progress = 0;
        let public_progress = 0;
        let extended_progress = 0;
        let lts_progress = 0;

        if (start_preview && start_public) {
            preview_duration = differenceInDays(start_public, start_preview);

            if (isBefore(today, start_public)) {
                preview_progress = differenceInDays(today, start_preview) / preview_duration * 100;
            } else {
                preview_progress = 100;
            }
        }

        if (start_public && start_extended) {
            public_duration = differenceInDays(start_extended, start_public);

            if (isBefore(today, start_extended)) {
                public_progress = differenceInDays(today, start_public) / public_duration * 100;
            } else {
                public_progress = 100;
            }
        }

        if (start_extended && start_lts) {
            extended_duration = differenceInDays(start_lts, start_extended);

            if (isBefore(today, start_lts)) {
                extended_progress = differenceInDays(today, start_extended) / extended_duration * 100;
            } else {
                extended_progress = 100;
            }
        }

        if (start_lts && end_lts) {
            lts_duration = differenceInDays(end_lts, start_lts);

            if (isBefore(today, end_lts)) {
                lts_progress = differenceInDays(today, start_lts) / lts_duration * 100;
            } else {
                lts_progress = 100;
            }
        }

        const total_duration = preview_duration + public_duration + extended_duration + lts_duration;
        const highest_duration = max([preview_duration, public_duration, extended_duration, lts_duration]);

        return [total_duration, preview_duration, public_duration, extended_duration, lts_duration, preview_progress, public_progress, extended_progress, lts_progress, highest_duration];
    }, [release.start_preview, release.start_public, release.start_extended, release.start_lts, release.end_lts]);

    return (
        <div className="col-12 mt-3">
            {(!!preview_duration || !!public_duration || !!extended_duration || !!lts_duration) &&
                <>
                    <div className="d-flex progress-group flex-row">
                        {!!preview_duration &&
                            <Progress
                                duration={preview_duration}
                                totalDuration={total_duration}
                                highestDuration={highest_duration}
                                title="Development"
                                startDescription={format(parseISO(release.start_preview), "d MMM yyyy")}
                                endDescription={format(parseISO(release.start_public), "d MMM yyyy")}
                            >
                                <ProgressBar progress={preview_progress} />
                            </Progress>
                        }
                        {!!public_duration &&
                            <Progress
                                duration={public_duration}
                                totalDuration={total_duration}
                                highestDuration={highest_duration}
                                title="Support"
                                startDescription={format(parseISO(release.start_public), "d MMM yyyy")}
                                endDescription={format(parseISO(release.start_extended), "d MMM yyyy")}
                            >
                                <ProgressBar progress={public_progress} color="success" />
                            </Progress>
                        }
                        {!!extended_duration &&
                            <Progress
                                duration={extended_duration}
                                totalDuration={total_duration}
                                highestDuration={highest_duration}
                                title="Extended"
                                startDescription={format(parseISO(release.start_extended), "d MMM yyyy")}
                                endDescription={format(parseISO(release.start_lts), "d MMM yyyy")}
                            >
                                <ProgressBar progress={extended_progress} color="warning" />
                            </Progress>
                        }
                        {!!lts_duration &&
                            <Progress
                                duration={lts_duration}
                                totalDuration={total_duration}
                                highestDuration={highest_duration}
                                title="LTSC"
                                startDescription={format(parseISO(release.start_lts), "d MMM yyyy")}
                                endDescription={format(parseISO(release.end_lts), "d MMM yyyy")}
                            >
                                <ProgressBar progress={lts_progress} color="danger" />
                            </Progress>
                        }
                    </div>
                    <div className="d-flex d-lg-none flex-row justify-content-center mt-2">
                        <div className="d-flex flex-column justify-content-center mt-n1">
                            {!!preview_duration && <p className="legend-stage">Development</p>}
                            {!!public_duration && <p className="legend-stage">Support</p>}
                            {!!extended_duration && <p className="legend-stage">Extended</p>}
                            {!!lts_duration && <p className="legend-stage">LTSC</p>}
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                            {!!preview_duration &&<div className="legend-bar legend-bar-primary" />}
                            {!!public_duration &&<div className="legend-bar legend-bar-success" />}
                            {!!extended_duration &&<div className="legend-bar legend-bar-warning" />}
                            {!!lts_duration &&<div className="legend-bar legend-bar-danger" />}
                        </div>
                        <div className="d-flex flex-column justify-content-center mt-n1">
                            {!!release.start_preview && <p className="legend-dates">{format(parseISO(release.start_preview), "d MMM yyyy")}</p>}
                            {!!release.start_public && <p className="legend-dates">{format(parseISO(release.start_public), "d MMM yyyy")}</p>}
                            {!!release.start_extended && <p className="legend-dates">{format(parseISO(release.start_extended), "d MMM yyyy")}</p>}
                            {!!release.start_lts && <p className="legend-dates">{format(parseISO(release.start_lts), "d MMM yyyy")}</p>}
                            {!!release.end_lts && <p className="legend-dates">{format(parseISO(release.end_lts), "d MMM yyyy")}</p>}
                        </div>
                    </div>
                </>
            }
        </div>
    )
}
