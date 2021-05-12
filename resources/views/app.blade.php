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
        <meta name="theme-color" content="#0066ff">
        <link rel="apple-touch-icon" href="{{ asset('images/logo-mask-192.png') }}">
    </head>
    <body>
        @inertia
        <script>
        // Check that service workers are supported
        if ('serviceWorker' in navigator) {
            // Use the window load event to keep the page load performant
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/service-worker.js');
            });
        }
        </script>
    </body>
</html>