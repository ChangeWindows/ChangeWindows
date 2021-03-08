<x-front-layout>
    <nav class="navbar navbar-expand-xl navbar-light sticky-top">
        <div class="container">
            <a class="navbar-brand" href="#">Platforms</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-page" aria-controls="navbar-page" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbar-page">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">
                            <i class="far fa-fw fa-laptop"></i> PC
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <i class="far fa-fw fa-gamepad-modern"></i> Xbox
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <i class="far fa-fw fa-server"></i> Server
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <i class="far fa-fw fa-head-side-goggles"></i> Holographic
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <i class="far fa-fw fa-tablet"></i> 10X
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <i class="far fa-fw fa-tv"></i> Team
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <i class="far fa-fw fa-cloud"></i> Azure
                        </a>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="legacyPlatforms" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Legacy
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="legacyPlatforms">
                            <li><a class="dropdown-item" href="#"><i class="far fa-fw fa-microchip"></i> IoT</a></li>
                            <li><a class="dropdown-item" href="#"><i class="far fa-fw fa-mobile"></i> Mobile</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container my-3">
        <div class="row g-3">
            <div class="col-12">
                <h1 class="h2 text-pc"><i class="far fa-fw fa-laptop"></i> <span class="fw-bold">Windows</span> <span class="fw-light">for desktop</span></h1>
                <p class="lead fw-bold">When you say "Windows", this is probably the platform you're talking about. Windows for desktops is the main and most popular version of Windows.</p>
                
                <div class="row g-2 mt-3">
                    <div class="col">
                        <div class="channel card">
                            <div class="channel-name text-dev">Dev</div>
                            <div class="channel-build">21327.1000</div>
                            <div class="channel-date">3 Mar 2021</div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="channel card">
                            <div class="channel-name text-beta">Beta</div>
                            <div class="channel-build">19043.844</div>
                            <div class="channel-date">17 Feb 2021</div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="channel card">
                            <div class="channel-name text-release">Release Preview</div>
                            <div class="channel-build">19042.844</div>
                            <div class="channel-date">17 Feb 2021</div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="channel card">
                            <div class="channel-name text-public">Semi-Annual</div>
                            <div class="channel-build">19042.844</div>
                            <div class="channel-date">3 Mar 2021</div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="channel card">
                            <div class="channel-name text-broad">Broad</div>
                            <div class="channel-build">17763.1790</div>
                            <div class="channel-date">16 Feb 2021</div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="channel card">
                            <div class="channel-name text-ltsc">LTSC</div>
                            <div class="channel-build">17763.1790</div>
                            <div class="channel-date">16 Feb 2021</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <nav class="mt-4">
                    <div class="nav nav-lined" id="nav-tab" role="tablist">
                        <button class="nav-link active" id="nav-releases-tab" data-bs-toggle="tab" data-bs-target="#nav-releases" type="button" role="tab" aria-controls="nav-releases" aria-selected="true"><i class="far fa-fw fa-flag"></i> Releases</button>
                        <button class="nav-link" id="nav-timeline-tab" data-bs-toggle="tab" data-bs-target="#nav-timeline" type="button" role="tab" aria-controls="nav-timeline" aria-selected="false"><i class="far fa-fw fa-list-timeline"></i> Timeline</button>
                    </div>
                </nav>
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="nav-releases" role="tabpanel" aria-labelledby="nav-releases-tab">
                        <div class="row">
                            <div class="col-12 mt-4">
                                <h2 class="h5 mb-3 fw-bold">Current releases</h2>
                                <div class="row g-2">
                                    <div class="col-12 col-sm-6 col-xl-4 col-xxl-3">
                                        <div class="card release">
                                            <h3 class="h5">Continuous development</h3>
                                            
                                            <div class="flex-grow-1"></div>
                                            <div class="release-channels">
                                                <span class="badge bg-dev">Dev</span>
                                            </div>
                                            <div class="release-actions">
                                                <a href="#" class="btn btn-link btn-sm"><i class="far fa-fw fa-arrow-right"></i> View release</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-6 col-xl-4 col-xxl-3">
                                        <div class="card release">
                                            <h3 class="h5">Windows 10 version 21H1</h3>
                                            <p class="text-muted"><small>March 2021 Update, Vibranium</small></p>
                                            <div class="flex-grow-1"></div>
                                            <div class="release-channels">
                                                <span class="badge bg-release">Release Preview</span>
                                                <span class="badge bg-beta">Beta</span>
                                            </div>
                                            <div class="release-actions">
                                                <a href="#" class="btn btn-link btn-sm"><i class="far fa-fw fa-arrow-right"></i> View release</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-6 col-xl-4 col-xxl-3">
                                        <div class="card release">
                                            <h3 class="h5">Windows 10 version 20H2</h3>
                                            <p class="text-muted"><small>November 2020 Update, Vibranium</small></p>
                                            <div class="flex-grow-1"></div>
                                            <div class="release-channels">
                                                <span class="badge bg-public">Semi-Annual</span>
                                                <span class="badge bg-release">Release Preview</span>
                                                <span class="badge bg-beta">Beta</span>
                                            </div>
                                            <div class="release-actions">
                                                <a href="#" class="btn btn-link btn-sm"><i class="far fa-fw fa-arrow-right"></i> View release</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-6 col-xl-4 col-xxl-3">
                                        <div class="card release">
                                            <h3 class="h5">Windows 10 version 2004</h3>
                                            <p class="text-muted"><small>April 2020 Update, Vibranium</small></p>
                                            <div class="flex-grow-1"></div>
                                            <div class="release-channels">
                                                <span class="badge bg-public">Semi-Annual</span>
                                            </div>
                                            <div class="release-actions">
                                                <a href="#" class="btn btn-link btn-sm"><i class="far fa-fw fa-arrow-right"></i> View release</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-6 col-xl-4 col-xxl-3">
                                        <div class="card release">
                                            <h3 class="h5">Windows 10 version 1909</h3>
                                            <p class="text-muted"><small>October 2019 Update, Titanium</small></p>
                                            <div class="flex-grow-1"></div>
                                            <div class="release-channels">
                                                <span class="badge bg-public">Semi-Annual</span>
                                            </div>
                                            <div class="release-actions">
                                                <a href="#" class="btn btn-link btn-sm"><i class="far fa-fw fa-arrow-right"></i> View release</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-6 col-xl-4 col-xxl-3">
                                        <div class="card release">
                                            <h3 class="h5">Windows 10 version 1809</h3>
                                            <p class="text-muted"><small>November 2018 Update, Redstone 5</small></p>
                                            <div class="flex-grow-1"></div>
                                            <div class="release-channels">
                                                <span class="badge bg-ltsc">LTSC</span>
                                                <span class="badge bg-broad">Broad</span>
                                                <span class="badge bg-public">Semi-Annual</span>
                                            </div>
                                            <div class="release-actions">
                                                <a href="#" class="btn btn-link btn-sm"><i class="far fa-fw fa-arrow-right"></i> View release</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-6 col-xl-4 col-xxl-3">
                                        <div class="card release">
                                            <h3 class="h5">Windows 10 version 1607</h3>
                                            <p class="text-muted"><small>Anniversary Update, Redstone 1</small></p>
                                            <div class="flex-grow-1"></div>
                                            <div class="release-channels">
                                                <span class="badge bg-ltsc">LTSC</span>
                                            </div>
                                            <div class="release-actions">
                                                <a href="#" class="btn btn-link btn-sm"><i class="far fa-fw fa-arrow-right"></i> View release</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-6 col-xl-4 col-xxl-3">
                                        <div class="card release">
                                            <h3 class="h5">Windows 10 version 1507</h3>
                                            <p class="text-muted"><small>Threshold 1</small></p>
                                            <div class="flex-grow-1"></div>
                                            <div class="release-channels">
                                                <span class="badge bg-ltsc">LTSC</span>
                                            </div>
                                            <div class="release-actions">
                                                <a href="#" class="btn btn-link btn-sm"><i class="far fa-fw fa-arrow-right"></i> View release</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mt-4">
                                <h2 class="h5 mb-3 fw-bold">Packages</h2>
                                <div class="row g-2">
                                    <div class="col-12 col-sm-6 col-xl-4 col-xxl-3">
                                        <div class="card release">
                                            <h3 class="h5">Windows Feature Experience Pack</h3>
                                            <div class="flex-grow-1"></div>
                                            <div class="release-actions">
                                                <a href="#" class="btn btn-link btn-sm"><i class="far fa-fw fa-arrow-right"></i> View package</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mt-4">
                                <h2 class="h5 mb-3 fw-bold">Unsupported releases</h2>
                                <div class="row g-2">
                                    <div class="col-12 col-sm-6 col-xl-4 col-xxl-3">
                                        <div class="card release">
                                            <h3 class="h5">Windows 10 version 1903</h3>
                                            <p class="text-muted mb-0"><small>May 2019 Update, Titanium</small></p>

                                            <div class="flex-grow-1"></div>
                                            <div class="release-actions">
                                                <a href="#" class="btn btn-link btn-sm"><i class="far fa-fw fa-arrow-right"></i> View release</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-6 col-xl-4 col-xxl-3">
                                        <div class="card release">
                                            <h3 class="h5">Windows 10 version 1803</h3>
                                            <p class="text-muted mb-0"><small>April 2018 Update, Redstone 4</small></p>

                                            <div class="flex-grow-1"></div>
                                            <div class="release-actions">
                                                <a href="#" class="btn btn-link btn-sm"><i class="far fa-fw fa-arrow-right"></i> View release</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-6 col-xl-4 col-xxl-3">
                                        <div class="card release">
                                            <h3 class="h5">Windows 10 version 1709</h3>
                                            <p class="text-muted mb-0"><small>Fall Creators Update, Redstone 3</small></p>

                                            <div class="flex-grow-1"></div>
                                            <div class="release-actions">
                                                <a href="#" class="btn btn-link btn-sm"><i class="far fa-fw fa-arrow-right"></i> View release</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-6 col-xl-4 col-xxl-3">
                                        <div class="card release">
                                            <h3 class="h5">Windows 10 version 1703</h3>
                                            <p class="text-muted mb-0"><small>Creators Update, Redstone 2</small></p>

                                            <div class="flex-grow-1"></div>
                                            <div class="release-actions">
                                                <a href="#" class="btn btn-link btn-sm"><i class="far fa-fw fa-arrow-right"></i> View release</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-6 col-xl-4 col-xxl-3">
                                        <div class="card release">
                                            <h3 class="h5">Windows 10 version 1511</h3>
                                            <p class="text-muted mb-0"><small>November Update, Threshold 2</small></p>

                                            <div class="flex-grow-1"></div>
                                            <div class="release-actions">
                                                <a href="#" class="btn btn-link btn-sm"><i class="far fa-fw fa-arrow-right"></i> View release</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="nav-timeline" role="tabpanel" aria-labelledby="nav-timeline-tab">
                        <div class="row">
                            <div class="col-8 mt-4">
                                <h2 class="h5 mb-3 fw-bold">Timeline</h2>
                                <div class="row g-4">
                                    <div class="col-12 timeline">
                                        <h3 class="h6 text-primary fw-bold">3 March 2021</h3>
                                        <div class="flight">
                                            <div class="flight-icon text-pc"><i class="far fa-fw fa-laptop"></i></div>
                                            <div class="flight-build">21627.1000</div>
                                            <div class="flight-channels">
                                                <span class="badge bg-dev">Dev</span>
                                            </div>
                                            <div class="flight-version"></div>
                                        </div>
                                    </div>
                                    <div class="col-12 timeline">
                                        <h3 class="h6 text-primary fw-bold">23 February 2021</h3>
                                        <div class="flight">
                                            <div class="flight-icon text-pc"><i class="far fa-fw fa-laptop"></i></div>
                                            <div class="flight-build">120.2212.3030.0</div>
                                            <div class="flight-channels">
                                                <span class="badge bg-beta">Beta</span>
                                            </div>
                                            <div class="flight-version text-muted">Windows Feature Experience Pack</div>
                                        </div>
                                    </div>
                                    <div class="col-12 timeline">
                                        <h3 class="h6 text-primary fw-bold">26 January 2021</h3>
                                        <div class="flight">
                                            <div class="flight-icon text-pc"><i class="far fa-fw fa-laptop"></i></div>
                                            <div class="flight-build">120.2212.2020.0</div>
                                            <div class="flight-channels">
                                                <span class="badge bg-beta">Beta</span>
                                            </div>
                                            <div class="flight-version text-muted">Windows Feature Experience Pack</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="row g-2">
                                    <div class="col-12 mb-n2">
                                        <h3 class="h6 text-pc"><i class="far fa-fw fa-laptop"></i> <span class="fw-bold">PC</span></h3>
                                    </div>
                                    <div class="col">
                                        <div class="channel card">
                                            <div class="channel-name text-dev">Dev</div>
                                            <div class="channel-build">21327.1000</div>
                                            <div class="channel-date">3 Mar 2021</div>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="channel card">
                                            <div class="channel-name text-beta">Beta</div>
                                            <div class="channel-build">19043.844</div>
                                            <div class="channel-date">17 Feb 2021</div>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="channel card">
                                            <div class="channel-name text-release">Release Preview</div>
                                            <div class="channel-build">19042.844</div>
                                            <div class="channel-date">17 Feb 2021</div>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="channel card">
                                            <div class="channel-name text-public">Semi-Annual</div>
                                            <div class="channel-build">19042.844</div>
                                            <div class="channel-date">3 Mar 2021</div>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="channel card">
                                            <div class="channel-name text-broad">Broad</div>
                                            <div class="channel-build">17763.1790</div>
                                            <div class="channel-date">16 Feb 2021</div>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="channel card">
                                            <div class="channel-name text-ltsc">LTSC</div>
                                            <div class="channel-build">17763.1790</div>
                                            <div class="channel-date">16 Feb 2021</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-front-layout>
