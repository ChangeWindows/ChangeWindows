<?php

namespace App\Http\Controllers\Admin;

use App\Models\Release;
use App\Models\Platform;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Auth;
use Redirect;
use App\Http\Requests\PackageRequest;

class PackageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('releases.show');

        $packages = Release::where('package', '=', 1)->orderBy('platform_id')->get();

        return Inertia::render('Admin/Packages/Index', [
            'can' => [
                'releases' => [
                    'edit' => Auth::user()->can('releases.edit'),
                    'create' => Auth::user()->can('releases.create')
                ],
            ],
            'packages' => $packages->map(function ($release) {
                return [
                    'name' => $release->name,
                    'slug' => $release->slug,
                    'platform' => [
                        'icon' => $release->platform->icon,
                        'name' => $release->platform->name,
                        'color' => $release->platform->color
                    ],
                    'channels' => $release->releaseChannels->where('supported', '=', 1)->values()->map(function ($channel) {
                        return [
                            'id' => $channel->id,
                            'short_name' => $channel->short_name,
                            'color' => $channel->channel->color,
                            'order' => $channel->channel->order
                        ];
                    })
                ];
            }),
            'status' => session('status')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $this->authorize('releases.create');

        return Inertia::render('Admin/Packages/Create', [
            'platforms' => Platform::orderBy('position')->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\PackageRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PackageRequest $request)
    {
        $this->authorize('releases.create');

        $package = Release::create([
            'name' => request('name'),
            'description' => request('description'),
            'changelog' => request('changelog'),
            'platform_id' => request('platform_id'),
            'package' => 1
        ]);

        return Redirect::route('admin.packages.edit', $package)->with('status', [
            'message' => 'Succesfully created this package.',
            'type' => 'success'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Release  $release
     * @return \Illuminate\Http\Response
     */
    public function show(Release $package)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Release  $release
     * @return \Illuminate\Http\Response
     */
    public function edit(Release $package)
    {
        $this->authorize('releases.show');

        return Inertia::render('Admin/Packages/Edit', [
            'can' => [
                'releases' => [
                    'edit' => Auth::user()->can('releases.edit'),
                    'delete' => Auth::user()->can('releases.delete')
                ],
            ],
            'pack' => [
                'id' => $package->id,
                'name' => $package->name,
                'description' => $package->description,
                'platform_id' => $package->platform_id,
                'slug' => $package->slug,
            ],
            'platforms' => Platform::orderBy('position')->get(),
            'channels' => $package->platform->channels->sortBy('order')->values()->all(),
            'release_channels' => $package->releaseChannels->map(function ($channel) {
                return [
                    'id' => $channel->id,
                    'name' => $channel->name,
                    'short_name' => $channel->short_name,
                    'supported' => $channel->supported,
                    'color' => $channel->channel->color,
                    'order' => $channel->channel->order,
                    'channel_id' => $channel->channel_id
                ];
            }),
            'status' => session('status')
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\PackageRequest  $request
     * @param  \App\Models\Release  $package
     * @return \Illuminate\Http\Response
     */
    public function update(PackageRequest $request, Release $package)
    {
        $this->authorize('releases.edit');

        $package->update($request->validated());

        return Redirect::route('admin.packages.edit', $package)->with('status', [
            'message' => 'Succesfully updated this package.',
            'type' => 'success'
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Release  $release
     * @return \Illuminate\Http\Response
     */
    public function editChangelog(Release $package)
    {
        $this->authorize('releases.show');

        return Inertia::render('Admin/Packages/Changelog', [
            'can' => [
                'releases' => [
                    'edit' => Auth::user()->can('releases.edit'),
                    'delete' => Auth::user()->can('releases.delete')
                ],
            ],
            'release' => [
                'name' => $package->name,
                'slug' => $package->slug,
                'changelog' => $package->changelog
            ],
            'status' => session('status')
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\PackageRequest  $request
     * @param  \App\Models\Release  $release
     * @return \Illuminate\Http\Response
     */
    public function updateChangelog(Release $package)
    {
        $this->authorize('releases.edit');

        $package->update([
            'changelog' => request('changelog')
        ]);

        return Redirect::route('admin.packages.changelog.edit', $package)->with('status', [
            'message' => 'Succesfully updated this package.',
            'type' => 'success'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Release  $release
     * @return \Illuminate\Http\Response
     */
    public function destroy(Release $package)
    {
        $this->authorize('releases.delete');

        $package->delete();

        return Redirect::route('admin.packages')->with('status', [
            'message' => 'Succesfully deleted package.',
            'type' => 'success'
        ]);
    }
}
