<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReleaseRequest;
use App\Models\Platform;
use App\Models\Release;
use Auth;
use Illuminate\Http\Response;
use Inertia\Inertia;
use Redirect;

class ReleaseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $this->authorize('releases.show');

        $releases = Release::orderBy('platform_id')->with('platform', 'releaseChannels', 'releaseChannels.channel')->orderBy('canonical_version')->get();

        return Inertia::render('Admin/Releases/Index', [
            'can' => [
                'releases' => [
                    'edit' => Auth::user()->can('releases.edit'),
                    'create' => Auth::user()->can('releases.create'),
                ],
            ],
            'releases' => $releases->groupBy(function ($item) {
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
                            'ongoing' => $release->ongoing,
                            'start_preview' => $release->start_preview,
                            'start_public' => $release->start_public,
                            'start_extended' => $release->start_extended,
                            'start_lts' => $release->start_lts,
                            'end_lts' => $release->end_lts,
                            'platform' => [
                                'icon' => $release->platform->icon,
                                'name' => $release->platform->name,
                                'color' => $release->platform->color,
                            ],
                            'channels' => $release->releaseChannels->where('supported', '=', 1)->values()->map(function ($channel) {
                                return [
                                    'id' => $channel->id,
                                    'short_name' => $channel->short_name,
                                    'color' => $channel->channel->color,
                                    'order' => $channel->channel->order,
                                ];
                            }),
                        ];
                    })),
                ];
            }),
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        $this->authorize('releases.create');

        return Inertia::render('Admin/Releases/Create', [
            'platforms' => Platform::orderBy('position')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\ReleaseRequest  $request
     * @return Response
     */
    public function store(ReleaseRequest $request)
    {
        $this->authorize('releases.create');

        $release = Release::create($request->validated());

        return Redirect::route('admin.releases.edit', $release)->with('status', [
            'message' => 'Succesfully created this release.',
            'type' => 'success',
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @return Response
     */
    public function show(Release $release)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @return Response
     */
    public function edit(Release $release)
    {
        $this->authorize('releases.show');

        $release->load('releaseChannels', 'releaseChannels.channel', 'platform');

        return Inertia::render('Admin/Releases/Edit', [
            'can' => [
                'releases' => [
                    'edit' => Auth::user()->can('releases.edit'),
                    'delete' => Auth::user()->can('releases.delete'),
                ],
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
                ];
            }),
            'status' => session('status'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\ReleaseRequest  $request
     * @return Response
     */
    public function update(ReleaseRequest $request, Release $release)
    {
        $this->authorize('releases.edit');

        $release->update($request->validated());

        return Redirect::route('admin.releases.edit', $release)->with('status', [
            'message' => 'Succesfully updated this release.',
            'type' => 'success',
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @return Response
     */
    public function editChangelog(Release $release)
    {
        $this->authorize('releases.show');

        return Inertia::render('Admin/Releases/Changelog', [
            'can' => [
                'releases' => [
                    'edit' => Auth::user()->can('releases.edit'),
                ],
            ],
            'release' => [
                'name' => $release->name,
                'slug' => $release->slug,
                'changelog' => $release->changelog,
            ],
            'status' => session('status'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\ReleaseRequest  $request
     * @return Response
     */
    public function updateChangelog(Release $release)
    {
        $this->authorize('releases.edit');

        $release->update([
            'changelog' => request('changelog'),
        ]);

        return Redirect::route('admin.releases.changelog.edit', $release)->with('status', [
            'message' => 'Succesfully updated this release.',
            'type' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return Response
     */
    public function destroy(Release $release)
    {
        $this->authorize('releases.delete');

        $release->delete();

        return Redirect::route('admin.releases')->with('status', [
            'message' => 'Succesfully deleted this release.',
            'type' => 'success',
        ]);
    }
}
