<!DOCTYPE html>
<html lang="en" class="theme-default">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

        @viteReactRefresh
        @vite('resources/js/app.jsx')
        @inertiaHead

        @routes

        <meta name="color-scheme" content="light">

        <meta name="theme-color" content="#f3f3f3">

        <link rel="shortcut icon" href="{{ env('APP_PREVIEW') === 'preview' ? asset('images/logo-preview.svg') : (env('APP_PREVIEW') === 'canary' ? asset('images/logo-canary.svg') : asset('images/logo.svg')) }}">
        <link rel="manifest" href="{{ env('APP_PREVIEW') === 'preview' ? asset('manifest-preview.json') : (env('APP_PREVIEW') === 'canary' ? asset('manifest-canary.json') : asset('manifest.json')) }}">
        <link rel="apple-touch-icon" href="{{ env('APP_PREVIEW') === 'preview' ? asset('images/logo-preview-mask-192.png') : (env('APP_PREVIEW') === 'canary' ? asset('images/logo-canary-mask-192.png') : asset('images/logo-mask-192.png')) }}">

        <script src="https://cdn.jsdelivr.net/npm/masonry-layout@4.2.2/dist/masonry.pkgd.min.js" integrity="sha384-GNFwBvfVxBkLMJpYMOABq3c+d3KnQxudP/mGPkzpZSTYykLBNsZEnG2D9G/X/+7D" crossorigin="anonymous" async></script>

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="https://changewindows.org" />
        <meta name="twitter:title" content="ChangeWindows" />
        <meta name="twitter:description" content="Follow the latest flight on all Windows platforms." />
        <meta name="twitter:image" content="{{ asset('images/logo-mask-512.png') }}" />
    </head>
    <body>
        @inertia
    </body>
</html>
