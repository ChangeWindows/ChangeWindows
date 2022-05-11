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
use App\Http\Requests\ReleaseRequest;

class ReleaseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('releases.show');

        $releases = Release::where('package', '=', 0)->orderBy('platform_id')->orderBy('canonical_version')->get();

        return Inertia::render('Admin/Releases/Show', [
            'can' => [
                'create_releases' => Auth::user()->can('releases.create'),
                'edit_releases' => Auth::user()->can('releases.edit')
            ],
            'releases' => $releases->map(function ($release) {
                return [
                    'name' => $release->name,
                    'version' => $release->version,
                    'start_public' => $release->start_public,
                    'edit_url' => $release->edit_url,
                    'edit_changelog_url' => $release->edit_changelog_url,
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
            'createUrl' => route('admin.releases.create', [], false),
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

        return Inertia::render('Admin/Releases/Create', [
            'urls' => [
                'store_release' => route('admin.releases.store', [], false),
            ],
            'platforms' => Platform::orderBy('position')->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\ReleaseRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ReleaseRequest $request)
    {
        $this->authorize('releases.create');

        $release = Release::create($request->validated());

        return Redirect::route('admin.releases.edit', $release)->with('status', 'Succesfully created this release.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Release  $release
     * @return \Illuminate\Http\Response
     */
    public function show(Release $release)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Release  $release
     * @return \Illuminate\Http\Response
     */
    public function edit(Release $release)
    {
        $this->authorize('releases.show');

        return Inertia::render('Admin/Releases/Edit', [
            'can' => [
                'edit_releases' => Auth::user()->can('releases.edit'),
                'delete_releases' => Auth::user()->can('releases.delete')
            ],
            'urls' => [
                'update_release' => route('admin.releases.update', $release, false),
                'destroy_release' => route('admin.releases.destroy', $release, false),
                'create_release_channel' => route('admin.releasechannels.create', ['release' => $release->id, 'platform' => $release->platform->id], false),
                'edit_changelog_url' => $release->edit_changelog_url
            ],
            'release' => $release,
            'platforms' => Platform::orderBy('position')->get(),
            'channels' => $release->platform->channels->sortBy('order')->values()->all(),
            'release_channels' => $release->releaseChannels->map(function ($channel) {
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
     * @param  \Illuminate\Http\ReleaseRequest  $request
     * @param  \App\Models\Release  $release
     * @return \Illuminate\Http\Response
     */
    public function update(ReleaseRequest $request, Release $release)
    {
        $this->authorize('releases.edit');

        $release->update($request->validated());

        return Redirect::route('admin.releases.edit', $release)->with('status', 'Succesfully updated this release.');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Release  $release
     * @return \Illuminate\Http\Response
     */
    public function editChangelog(Release $release)
    {
        $this->authorize('releases.show');

        return Inertia::render('Admin/Releases/Changelog', [
            'can' => [
                'edit_releases' => Auth::user()->can('releases.edit'),
                'delete_releases' => Auth::user()->can('releases.delete')
            ],
            'urls' => [
                'update_release' => route('admin.releases.changelog.update', $release, false)
            ],
            'release' => $release,
            'status' => session('status')
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\ReleaseRequest  $request
     * @param  \App\Models\Release  $release
     * @return \Illuminate\Http\Response
     */
    public function updateChangelog(ReleaseRequest $request, Release $release)
    {
        $this->authorize('releases.edit');

        $release->update($request->validated());

        return Redirect::route('admin.releases.changelog.edit', $release)->with('status', 'Succesfully updated this release.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Release  $release
     * @return \Illuminate\Http\Response
     */
    public function destroy(Release $release)
    {
        $this->authorize('releases.delete');

        $release->delete();

        return Redirect::route('admin.releases')->with('status', 'Succesfully deleted release.');
    }
}
