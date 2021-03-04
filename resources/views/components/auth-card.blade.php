<div class="row justify-content-center align-items-center vw-100 vh-100">
    <div class="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3">
        <div class="h2 mb-3 text-center">
            <a href="/">
                <x-application-logo /> Horizon
            </a>
        </div>

        <div class="card shadow">
            <div class="card-body">
                {{ $slot }}
            </div>
        </div>
    </div>
</div>
