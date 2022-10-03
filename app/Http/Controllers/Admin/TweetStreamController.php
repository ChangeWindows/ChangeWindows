<?php

namespace App\Http\Controllers\Admin;

use App\Models\TweetStream;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Auth;
use Redirect;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Collection;

class TweetStreamController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('tweet_streams.show');

        return Inertia::render('Admin/TweetStreams/Show', [
            'can' => [
                'create_tweet_streams' => Auth::user()->can('tweet_streams.create'),
                'edit_tweet_streams' => Auth::user()->can('tweet_streams.edit')
            ],
            'tweet_streams' => TweetStream::orderBy('created_at')->get()->map(function ($tweet_stream) {
                return [
                    'id' => $tweet_stream->id,
                    'name' => $tweet_stream->name,
                    'account' => $tweet_stream->account
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
        $this->authorize('tweet_streams.create');

        return Inertia::render('Admin/TweetStreams/Create');
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

        $tweet_stream = TweetStream::create([
            'name' => request('name'),
            'account' => request('account'),
            'consumer_key' => request('consumer_key'),
            'consumer_secret' => request('consumer_secret'),
            'access_token' => request('access_token'),
            'access_token_secret' => request('access_token_secret')
        ]);

        return Redirect::route('admin.tweet_streams.edit', $tweet_stream)->with('status', [
            'message' => 'Succesfully created this tweet stream.',
            'type' => 'success'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TweetStream  $tweetStream
     * @return \Illuminate\Http\Response
     */
    public function show(TweetStream $tweetStream)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\TweetStream  $tweetStream
     * @return \Illuminate\Http\Response
     */
    public function edit(TweetStream $tweetStream)
    {
        $this->authorize('tweet_streams.show');

        return Inertia::render('Admin/TweetStreams/Edit', [
            'can' => [
                'edit_tweet_streams' => Auth::user()->can('tweet_streams.edit'),
                'delete_tweet_streams' => Auth::user()->can('tweet_streams.delete')
            ],
            'tweet_stream' => $tweetStream,
            'status' => session('status')
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TweetStream  $tweetStream
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TweetStream $tweetStream)
    {
        $this->authorize('tweet_streams.edit');

        $tweetStream->update([
            'name' => request('name'),
            'account' => request('account'),
            'consumer_key' => request('consumer_key'),
            'consumer_secret' => request('consumer_secret'),
            'access_token' => request('access_token'),
            'access_token_secret' => request('access_token_secret')
        ]);

        return Redirect::route('admin.tweet_streams.edit', $tweetStream)->with('status', [
            'message' => 'Succesfully updated the tweet stream.',
            'type' => 'success'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TweetStream  $tweetStream
     * @return \Illuminate\Http\Response
     */
    public function destroy(TweetStream $tweetStream)
    {
        $this->authorize('tweet_streams.delete');

        $tweetStream->delete();

        return Redirect::route('admin.tweet_streams')->with('status', [
            'message' => 'Succesfully deleted tweet stream.',
            'type' => 'success'
        ]);
    }
}
