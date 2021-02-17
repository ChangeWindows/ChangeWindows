<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Horizon') }}</title>

        <link rel="stylesheet" href="{{ mix('css/app.css') }}">

        @routes
        <script src="{{ mix('js/app.js') }}" defer></script>
        <script src="https://unpkg.com/@popperjs/core@2"></script>
        <script>
            @auth
                window.Permissions = {!! json_encode(Auth::user()->allPermissions, true) !!};
            @else
                window.Permissions = [];
            @endauth
        </script>
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
