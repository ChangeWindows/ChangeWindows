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
                    'account' => $tweet_stream->account,
                    'editUrl' => route('admin.tweet_streams.edit', $tweet_stream, false)
                ];
            }),
            'createUrl' => route('admin.tweet_streams.create', [], false),
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
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
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
            'urls' => [
                'update_tweet_stream' => route('admin.tweet_streams.update', $tweetStream, false),
                'destroy_tweet_stream' => route('admin.tweet_streams.destroy', $tweetStream, false)
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TweetStream  $tweetStream
     * @return \Illuminate\Http\Response
     */
    public function destroy(TweetStream $tweetStream)
    {
        //
    }
}
