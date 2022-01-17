<!DOCTYPE html>
<html lang="en" class="theme-default">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

        <link rel="stylesheet" href="{{ asset('css/style.css') }}">
        <script src="{{ asset('js/manifest.js') }}" defer></script>
        <script src="{{ asset('js/vendor.js') }}" defer></script>
        <script src="{{ asset('js/app.js') }}" defer></script>
        <script src="{{ asset('js/bootstrap.bundle.min.js') }}" defer></script>
        <meta name="color-scheme" content="light">

        <meta name="theme-color" content="#f3f3f3">
        
        <link rel="shortcut icon" href="{{ env('APP_PREVIEW') === 'preview' ? asset('images/logo-preview.svg') : (env('APP_PREVIEW') === 'canary' ? asset('images/logo-canary.svg') : asset('images/logo.svg')) }}">
        <link rel="manifest" href="{{ env('APP_PREVIEW') === 'preview' ? asset('manifest-preview.json') : (env('APP_PREVIEW') === 'canary' ? asset('manifest-canary.json') : asset('manifest.json')) }}">
        <link rel="apple-touch-icon" href="{{ env('APP_PREVIEW') === 'preview' ? asset('images/logo-preview-mask-192.png') : (env('APP_PREVIEW') === 'canary' ? asset('images/logo-canary-mask-192.png') : asset('images/logo-mask-192.png')) }}">
    </head>
    <body>
        @inertia
    </body>
</html>