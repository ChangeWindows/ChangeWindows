<?php

namespace App\Http\Controllers\Admin;

use App\Models\Channel;
use App\Models\Release;
use App\Models\ReleaseChannel;
use App\Models\Platform;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Auth;
use Redirect;
use Illuminate\Support\Collection;

class ReleaseChannelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $this->authorize('releases.create');

        $platform = Platform::find($request->platform);
        $channel = Channel::find($request->channel);
        $release = Release::find($request->release);

        return Inertia::render('Admin/ReleaseChannels/Create', [
            'params' => [
                'platform' => $request->platform,
                'release' => $request->release,
                'channel' => $request->channel
            ],
            'release' => $release,
            'releases' => $platform->releases,
            'channel' => $channel,
            'channels' => $platform->channels
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

        $releaseChannel = ReleaseChannel::create([
            'name' => request('name'),
            'short_name' => request('short_name'),
            'release_id' => request('release_id'),
            'channel_id' => request('channel_id'),
            'supported' => request('supported') ? 1 : 0
        ]);

        return Redirect::route('admin.releases.edit', $releaseChannel->release)->with('status', [
            'message' => 'Succesfully created this release channel.',
            'type' => 'success'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ReleaseChannel  $releaseChannel
     * @return \Illuminate\Http\Response
     */
    public function show(ReleaseChannel $releaseChannel)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ReleaseChannel  $releaseChannel
     * @return \Illuminate\Http\Response
     */
    public function edit(ReleaseChannel $releaseChannel)
    {
        $this->authorize('releases.show');

        return Inertia::render('Admin/ReleaseChannels/Edit', [
            'can' => [
                'releases' => [
                    'edit' => Auth::user()->can('releases.edit'),
                    'delete' => Auth::user()->can('releases.delete')
                ],
            ],
            'releaseChannel' => $releaseChannel,
            'releases' => $releaseChannel->release->platform->releases,
            'channels' => $releaseChannel->release->platform->channels,
            'status' => session('status')
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ReleaseChannel  $releaseChannel
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ReleaseChannel $releaseChannel)
    {
        $this->authorize('releases.edit');

        $releaseChannel->update([
            'name' => request('name'),
            'channel_id' => request('channel_id'),
            'short_name' => request('short_name'),
            'supported' => request('supported') ? 1 : 0
        ]);

        return Redirect::route('admin.releases.edit', $releaseChannel->release)->with('status', [
            'message' => 'Succesfully updated this release channel.',
            'type' => 'success'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ReleaseChannel  $releaseChannel
     * @return \Illuminate\Http\Response
     */
    public function destroy(ReleaseChannel $releaseChannel)
    {
        $this->authorize('releases.delete');

        $releaseChannel->delete();

        return Redirect::route('admin.releases.edit', $releaseChannel->release)->with('status', [
            'message' => 'Succesfully deleted release channel.',
            'type' => 'success'
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ReleaseChannel  $releaseChannel
     * @return \Illuminate\Http\Response
     */
    public function toggleSupported(ReleaseChannel $releaseChannel)
    {
        $this->authorize('releases.show');

        $releaseChannel->update([
            'supported' => $releaseChannel->supported ? 0 : 1
        ]);

        return Redirect::route('admin.releases.edit', $releaseChannel->release)->with('status', [
            'message' => 'Succesfully toggled this release channel support state.',
            'type' => 'success'
        ]);
    }
}
