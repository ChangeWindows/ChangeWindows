<nav class="navbar navbar-expand-xs navbar-light sticky-top">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">
            <div class="app-icon"><i class="far fa-fw fa-sun-haze"></i></div>
            <span class="brand-label fw-bold">ChangeWindows</span>
        </a>
    </div>
</nav>

<div class="sidebar">
    <a href="{{ route('timeline') }}" class="sidebar-item {{ request()->routeIs('timeline') ? 'active' : '' }}">
        <i class="far fa-fw fa-list-timeline"></i> <span class="sidebar-label">Timeline</span>
    </a>

    <a href="{{ route('platforms') }}" class="sidebar-item {{ request()->routeIs('platforms') ? 'active' : '' }}">
        <i class="far fa-fw fa-laptop-mobile"></i> <span class="sidebar-label">Platforms</span>
    </a>

    <a href="{{ route('releases') }}" class="sidebar-item {{ request()->routeIs('releases') ? 'active' : '' }}">
        <i class="far fa-fw fa-flag"></i> <span class="sidebar-label">Releases</span>
    </a>

    <a href="{{ route('timeline') }}" class="sidebar-item">
        <i class="far fa-fw fa-code-branch"></i> <span class="sidebar-label">Channels</span>
    </a>

    <hr />

    <a href="{{ route('about') }}" class="sidebar-item">
        <i class="far fa-fw fa-circle-info"></i> <span class="sidebar-label">About</span>
    </a>

    <div class="flex-grow-1 d-none d-sm-block"></div>

    <form method="POST" action="{{ route('logout') }}" class="d-none d-sm-block">
        @csrf

        <button type="submit" onclick="event.preventDefault(); this.closest('form').submit();" class="sidebar-item">
            <i class="far fa-fw fa-arrow-right-from-bracket"></i> <span class="sidebar-label">Log out</span>
        </button>
    </form>
</div>