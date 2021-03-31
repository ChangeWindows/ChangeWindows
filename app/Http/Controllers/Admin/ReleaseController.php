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

        return Inertia::render('Admin/Releases/Show', [
            'can' => [
                'create_releases' => Auth::user()->can('releases.create'),
                'edit_releases' => Auth::user()->can('releases.edit')
            ],
            'releases' => Release::paginate(50),
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->authorize('releases.create');

        $release = Release::create([
            'name' => request('name'),
            'version' => request('version'),
            'canonical_version' => request('canonical_version'),
            'codename' => request('codename'),
            'description' => request('description'),
            'changelog' => request('changelog'),
            'platform_id' => request('platform_id'),
            'start_preview' => request('start_preview'),
            'start_public' => request('start_public'),
            'start_extended' => request('start_extended'),
            'start_lts' => request('start_lts'),
            'end_lts' => request('end_lts'),
            'start_build' => request('start_build'),
            'start_delta' => request('start_delta'),
            'end_build' => request('end_build'),
            'end_delta' => request('end_delta')
        ]);

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
                'create_release_channel' => route('admin.releasechannels.create', ['release' => $release->id, 'platform' => $release->platform->id], false)
            ],
            'release' => $release,
            'platforms' => Platform::orderBy('position')->get(),
            'channels' => $release->platform->channels,
            'release_channels' => $release->releaseChannels,
            'status' => session('status')
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Release  $release
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Release $release)
    {
        $this->authorize('releases.edit');

        $release->update([
            'name' => request('name'),
            'version' => request('version'),
            'canonical_version' => request('canonical_version'),
            'codename' => request('codename'),
            'description' => request('description'),
            'changelog' => request('changelog'),
            'start_preview' => request('start_preview'),
            'start_public' => request('start_public'),
            'start_extended' => request('start_extended'),
            'start_lts' => request('start_lts'),
            'end_lts' => request('end_lts'),
            'start_build' => request('start_build'),
            'start_delta' => request('start_delta'),
            'end_build' => request('end_build'),
            'end_delta' => request('end_delta')
        ]);

        return Redirect::route('admin.release.edit', $release)->with('status', 'Succesfully updated this release.');
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
