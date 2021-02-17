<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
                <a class="navbar-brand fw-bold" :href="route('home')"><i class="far fa-fw fa-sun-haze"></i> Horizon</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul v-if="$page.props.user" class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item" v-if="$can('dashboard')">
                            <inertia-link :href="route('dashboard')" class="nav-link">
                                Dashboard
                            </inertia-link>
                        </li>
                    </ul>
                    <template v-else>
                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <inertia-link :href="route('login')" class="nav-link">
                                    Login
                                </inertia-link>
                            </li>
                            <li class="nav-item">
                                <inertia-link v-if="canRegister" :href="route('register')" class="nav-link">
                                    Register
                                </inertia-link>
                            </li>
                        </ul>
                    </template>
                </div>
            </div>
        </nav>

        <div class="container py-5">
            <div class="row justify-content-around">
                <div class="col-12 col-sm-10 col-md-8 col-lg-6 text-center">
                    <h1 class="display-3 text-primary"><i class="far fa-fw fa-sun-haze"></i> <span class="fw-bold ms-3">Horizon</span></h1>
                    <p class="lead fw-normal mt-2 mb-0">The time has come to rethink ChangeWindows from the ground up. Welcome to Horizon, in the coming weeks and months, you'll see us built a brand new way to keep track of Windows.</p>
                </div>
            </div>

            <div class="mt-5 shadow rounded border">
                <div class="row g-0">
                    <div class="col-12 col-md-6 p-4">
                        <div class="d-flex align-items-center h4">
                            <i class="text-primary far fa-fw fa-plane"></i>
                            <div class="ms-2">Release-centered</div>
                        </div>

                        <div class="mt-3">
                            No more clear-defined milestones. We're going to put more focus on releases, by platform.
                        </div>
                    </div>

                    <div class="col-12 col-md-6 p-4">
                        <div class="d-flex align-items-center h4">
                            <i class="text-primary fab fa-fw fa-xbox"></i>
                            <div class="ms-2">First-class citizen</div>
                        </div>

                        <div class="mt-3">
                            We've always grouped Xbox under the matching Windows-builds, despite Xbox having montly feature updates. Horizon will provide proper support for this.
                        </div>
                    </div>

                    <div class="col-12 col-md-6 p-4">
                        <div class="d-flex align-items-center h4">
                            <i class="text-primary fab fa-fw fa-twitter"></i>
                            <div class="ms-2">Better tweets</div>
                        </div>

                        <div class="mt-3">
                            Come the second Tuesday of the month, and we'll spam your timeline with tweets that aren't simple to "scan" through. We'll improve that.
                        </div>
                    </div>

                    <div class="col-12 col-md-6 p-4">
                        <div class="d-flex align-items-center h4">
                            <i class="text-primary fab fa-fw fa-laravel"></i>
                            <div class="ms-2">Built on modern technology</div>
                        </div>

                        <div class="mt-3">
                            Horizon will be built with the latest versions of Laravel 8, Vue 2, Inertia.js, Bootstrap 5, Font Awesome 6, Sanctum and Jetstream.
                        </div>
                    </div>
                </div>
            </div>

            <div class="d-flex justify-content-between align-items-center mt-5">
                <div class="text-center">
                    <div class="flex items-center">
                        <a href="https://www.patreon.com/changewindows" class="btn btn-primary btn-sm"><i class="fab fa-fw fa-patreon me-1"></i> Sponsor</a>
                        <a href="https://www.twitter.com/changewindows" class="btn btn-primary btn-sm"><i class="fab fa-fw fa-twitter me-1"></i> Tweet</a>
                    </div>
                </div>
                <div class="text-center">
                    Horizon v{{ horizonVersion }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            canLogin: Boolean,
            canRegister: Boolean,
            horizonVersion: String,
        }
    }
</script>
