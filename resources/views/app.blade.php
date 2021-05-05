<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

        <title>{{ config('app.name', 'ChangeWindows') }}</title>
        
        <link rel="stylesheet" href="{{ asset('css/style.css') }}">
        <script src="{{ asset('js/app.js') }}" defer></script>
        <script src="{{ asset('js/bootstrap.bundle.min.js') }}" defer></script>
        
        <link rel="shortcut icon" href="{{ asset('images/logo.svg') }}">
        <link rel="manifest" href="{{ asset('manifest.json') }}">
    </head>
    <body>
        @inertia
    </body>
</html>