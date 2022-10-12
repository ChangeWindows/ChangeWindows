<?php

namespace App\Http\Controllers\Admin;

use App\Models\Channel;
use App\Models\Platform;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Auth;
use Redirect;
use Illuminate\Support\Collection;

class ChannelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $this->authorize('channels.create');

        $platform = Platform::find($request->platform);

        return Inertia::render('Admin/Channels/Create', [
            'params' => [
                'platform' => [
                    'slug' => $platform->slug,
                    'id' => $platform->id,
                ]
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
        $this->authorize('channels.create');

        $channel = Channel::create([
            'name' => request('name'),
            'order' => request('order'),
            'color' => request('color'),
            'platform_id' => request('platform_id'),
            'active' => request('active') ? 1 : 0
        ]);

        return Redirect::route('admin.channels.edit', $channel)->with('status', [
            'message' => 'Succesfully created this channel.',
            'type' => 'success'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Channel  $channel
     * @return \Illuminate\Http\Response
     */
    public function show(Channel $channel)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Channel  $channel
     * @return \Illuminate\Http\Response
     */
    public function edit(Channel $channel)
    {
        $this->authorize('channels.show');

        return Inertia::render('Admin/Channels/Edit', [
            'can' => [
                'edit_channels' => Auth::user()->can('channels.edit'),
                'delete_channels' => Auth::user()->can('channels.delete')
            ],
            'channel' => [
                'slug' => $channel->slug,
                'name' => $channel->name,
                'order' => $channel->order,
                'color' => $channel->color,
                'active' => $channel->active,
                'platform' => $channel->platform,
                'platform_id' => $channel->platform_id
            ],
            'platforms' => Platform::orderBy('position')->get(),
            'status' => session('status')
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Channel  $channel
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Channel $channel)
    {
        $this->authorize('channels.edit');

        $channel->update([
            'name' => request('name'),
            'order' => request('order'),
            'color' => request('color'),
            'platform_id' => request('platform_id'),
            'active' => request('active') ? 1 : 0
        ]);

        return Redirect::route('admin.channels.edit', $channel)->with('status', [
            'message' => 'Succesfully updated the channel.',
            'type' => 'success'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Channel  $channel
     * @return \Illuminate\Http\Response
     */
    public function destroy(Channel $channel)
    {
        $this->authorize('channels.delete');

        $platform = $channel->platform;
        $channel->delete();

        return Redirect::route('admin.platforms.edit', $platform)->with('status', [
            'message' => 'Succesfully deleted channel.',
            'type' => 'success'
        ]);
    }
}
