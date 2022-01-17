<?php

namespace App\Http\Controllers\Admin;

use App\Models\Release;
use App\Models\Platform;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Auth;
use Redirect;
use Illuminate\Support\Collection;
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

        return Inertia::render('Admin/Packages/Show', [
            'can' => [
                'create_packages' => Auth::user()->can('releases.create'),
                'edit_packages' => Auth::user()->can('releases.edit')
            ],
            'packages' => $packages->map(function ($release) {
                return [
                    'name' => $release->name,
                    'edit_url' => $release->edit_url,
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
            'createUrl' => route('admin.packages.create', [], false),
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
            'urls' => [
                'store_package' => route('admin.packages.store', [], false),
            ],
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

        return Redirect::route('admin.packages.edit', $package)->with('status', 'Succesfully created this package.');
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
                'edit_packages' => Auth::user()->can('releases.edit'),
                'delete_packages' => Auth::user()->can('releases.delete')
            ],
            'urls' => [
                'update_package' => route('admin.packages.update', $package, false),
                'destroy_package' => route('admin.packages.destroy', $package, false),
                'create_package_channel' => route('admin.releasechannels.create', ['release' => $package->id, 'platform' => $package->platform->id, 'package' => true], false)
            ],
            'pack' => $package,
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
                    'channel_id' => $channel->channel_id,
                    'edit_url' => $channel->edit_url
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

        return Redirect::route('admin.packages.edit', $package)->with('status', 'Succesfully updated this package.');
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
                'edit_packages' => Auth::user()->can('releases.edit'),
                'delete_packages' => Auth::user()->can('releases.delete')
            ],
            'urls' => [
                'update_package' => route('admin.packages.changelog.update', $package, false)
            ],
            'package' => $package,
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
    public function updateChangelog(PackageRequest $request, Release $package)
    {
        $this->authorize('releases.edit');

        $package->update($request->validated());

        return Redirect::route('admin.packages.changelog.edit', $package)->with('status', 'Succesfully updated this package.');
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

        return Redirect::route('admin.packages')->with('status', 'Succesfully deleted package.');
    }
}
