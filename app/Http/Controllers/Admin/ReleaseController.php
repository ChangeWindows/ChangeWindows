<?php

namespace App\Http\Controllers\Admin;

use App\Models\Release;
use App\Models\Platform;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Auth;
use Redirect;
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

        return Inertia::render('Admin/Releases/Index', [
            'can' => [
                'create_releases' => Auth::user()->can('releases.create'),
                'edit_releases' => Auth::user()->can('releases.edit')
            ],
            'releases' => $releases->groupBy(function($item) {
                return $item->platform->slug;
            })->map(function ($platform) {
                return [
                    'platform' => [
                        'icon' => $platform[0]->platform->icon,
                        'name' => $platform[0]->platform->name,
                        'color' => $platform[0]->platform->color,
                        'position' => $platform[0]->platform->position,
                    ],
                    'releases' => $platform->map((function ($release) {
                        return [
                            'name' => $release->name,
                            'slug' => $release->slug,
                            'version' => $release->version,
                            'start_public' => $release->start_public,
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
                    }))
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

        return Inertia::render('Admin/Releases/Create', [
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

        return Redirect::route('admin.releases.edit', $release)->with('status', [
            'message' => 'Succesfully created this release.',
            'type' => 'success'
        ]);
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
                    'channel_id' => $channel->channel_id
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

        return Redirect::route('admin.releases.edit', $release)->with('status', [
            'message' => 'Succesfully updated this release.',
            'type' => 'success'
        ]);
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
                'edit_releases' => Auth::user()->can('releases.edit')
            ],
            'release' => [
                'name' => $release->name,
                'slug' => $release->slug,
                'changelog' => $release->changelog
            ],
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
    public function updateChangelog(Release $release)
    {
        $this->authorize('releases.edit');

        $release->update([
            'changelog' => request('changelog')
        ]);

        return Redirect::route('admin.releases.changelog.edit', $release)->with('status', [
            'message' => 'Succesfully updated this release.',
            'type' => 'success'
        ]);
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

        return Redirect::route('admin.releases')->with('status', [
            'message' => 'Succesfully deleted this release.',
            'type' => 'success'
        ]);
    }
}
