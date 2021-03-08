<nav class="navbar navbar-expand-lg navbar-light bg-white">
    <!-- Primary Navigation Menu -->
    <div class="container">
        <a class="navbar-brand" href="#">
            <x-application-logo width="30" height="24" />
            Horizon
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto">
                <x-nav-link :href="route('dashboard')" :active="request()->routeIs('dashboard')">
                    <i class="far fa-fw fa-flag"></i> Releases
                </x-nav-link>
                <x-nav-link :href="route('dashboard')" :active="request()->routeIs('dashboard')">
                    <i class="far fa-fw fa-circle-info"></i> About
                </x-nav-link>
            </ul>
            <ul class="navbar-nav">
                <x-dropdown align="right">
                    <x-slot name="trigger">
                        {{ Auth::user()->name }}
                    </x-slot>

                    <x-slot name="content">
                        <!-- Authentication -->
                        <form method="POST" action="{{ route('logout') }}">
                            @csrf

                            <li><button type="submit" onclick="event.preventDefault(); this.closest('form').submit();" class="dropdown-item">{{ __('Log out') }}</button></li>
                        </form>
                    </x-slot>
                </x-dropdown>
            </ul>
        </div>
    </div>
</nav>