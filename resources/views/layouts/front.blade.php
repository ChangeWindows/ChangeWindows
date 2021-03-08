<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Horizon') }}</title>

        <!-- Styles -->
        <link rel="stylesheet" href="{{ asset('css/style.css') }}">

        <!-- Scripts -->
        <script src="{{ asset('js/app.js') }}" defer></script>
        <script src="{{ asset('js/bootstrap.bundle.min.js') }}" defer></script>
        <script src="{{ asset('js/fonts/brands.min.js') }}" defer></script>
        <script src="{{ asset('js/fonts/regular.min.js') }}" defer></script>
        <script src="{{ asset('js/fonts/fontawesome.min.js') }}" defer></script>
    </head>
    <body class="bg-light">
        <div class="grid">
            <header class="grid-sidebar">
                @include('layouts.sidebar')
            </header>

            <!-- Page Content -->
            <main class="grid-content">
                {{ $slot }}
            </main>
        </div>
    </body>
</html>
