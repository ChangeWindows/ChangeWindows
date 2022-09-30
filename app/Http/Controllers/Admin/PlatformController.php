<?php

namespace App\Http\Controllers\Admin;

use App\Models\Platform;
use App\Models\TweetStream;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Auth;
use Redirect;

class PlatformController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('platforms.show');

        return Inertia::render('Admin/Platforms/Show', [
            'can' => [
                'create_platforms' => Auth::user()->can('platforms.create'),
                'edit_platforms' => Auth::user()->can('platforms.edit')
            ],
            'platforms' => Platform::orderBy('position')->get(),
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
        $this->authorize('platforms.create');

        return Inertia::render('Admin/Platforms/Create', [
            'tweet_streams' => TweetStream::all()
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
        $this->authorize('platforms.create');

        $platform = Platform::create([
            'name' => request('name'),
            'description' => request('description'),
            'position' => request('position'),
            'color' => request('color'),
            'icon' => request('icon'),
            'tweet_template' => request('tweet_template'),
            'tweet_template_package' => request('tweet_template_package'),
            'tweet_stream_id' => request('tweet_stream_id'),
            'retweet_stream_id' => request('retweet_stream_id'),
            'legacy' => request('legacy') ? 1 : 0,
            'active' => request('active') ? 1 : 0
        ]);

        return Redirect::route('admin.platforms.edit', $platform)->with('status', 'Succesfully created this platform.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Platform  $platform
     * @return \Illuminate\Http\Response
     */
    public function show(Platform $platform)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Platform  $platform
     * @return \Illuminate\Http\Response
     */
    public function edit(Platform $platform)
    {
        $this->authorize('platforms.show');

        return Inertia::render('Admin/Platforms/Edit', [
            'can' => [
                'edit_platforms' => Auth::user()->can('platforms.edit'),
                'delete_platforms' => Auth::user()->can('platforms.delete'),
                'create_channels' => Auth::user()->can('channels.create'),
                'edit_channels' => Auth::user()->can('channels.edit')
            ],
            'platform' => $platform,
            'tweet_streams' => TweetStream::all(),
            'channels' => $platform->channels->sortBy('order')->values()->all(),
            'status' => session('status')
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Platform  $platform
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Platform $platform)
    {
        $this->authorize('platforms.edit');

        $platform->update([
            'name' => request('name'),
            'description' => request('description'),
            'position' => request('position'),
            'color' => request('color'),
            'icon' => request('icon'),
            'tweet_template' => request('tweet_template'),
            'tweet_template_package' => request('tweet_template_package'),
            'tweet_stream_id' => request('tweet_stream_id'),
            'retweet_stream_id' => request('retweet_stream_id'),
            'legacy' => request('legacy') ? 1 : 0,
            'active' => request('active') ? 1 : 0
        ]);

        return Redirect::route('admin.platforms.edit', $platform)->with('status', 'Succesfully updated the platform.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Platform  $platform
     * @return \Illuminate\Http\Response
     */
    public function destroy(Platform $platform)
    {
        $this->authorize('platforms.delete');

        $platform->delete();

        return Redirect::route('admin.platforms')->with('status', 'Succesfully deleted platform.');
    }
}
