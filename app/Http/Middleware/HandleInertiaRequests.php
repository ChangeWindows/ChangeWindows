<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Auth;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request)
    {
        return parent::version($request);
    }

    /**
     * Defines the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request)
    {
        return array_merge(parent::share($request), [
            'auth' => Auth::user() ? Auth::user()->only('id', 'name', 'email') : null,
            'app' => [
                'name' => config('app.name'),
                'version' => config('app.version'),
                'preview' => env('APP_PREVIEW')
            ],
            'navCan' => [
                'dashboard' => Auth::check() ? Auth::user()->can('dashboard') : false,
                'flights' => ['show' => Auth::check() ? Auth::user()->can('flights.show') : false],
                'flags' => ['show' => Auth::check() ? Auth::user()->can('flags.show') : false],
                'releases' => ['show' => Auth::check() ? Auth::user()->can('releases.show') : false],
                'platforms' => ['show' => Auth::check() ? Auth::user()->can('platforms.show') : false],
                'users' => ['show' => Auth::check() ? Auth::user()->can('users.show') : false],
                'roles' => ['show' => Auth::check() ? Auth::user()->can('roles.show') : false],
                'permissions' => ['show' => Auth::check() ? Auth::user()->can('permissions.show') : false]
            ]
        ]);
    }
}
