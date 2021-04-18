<?php

namespace App\Http\Controllers\Admin;

use App\Models\Release;
use App\Models\Flight;
use App\Models\Timeline;
use App\Models\ReleaseChannel;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Auth;
use Redirect;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Twitter;

class FlightController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('flights.show');

        $timeline = Timeline::where('entry_type', Flight::class)->orderBy('date', 'desc')->get()->groupBy('date');

        return Inertia::render('Admin/Flights/Show', [
            'can' => [
                'create_flights' => Auth::user()->can('flights.create'),
                'edit_flights' => Auth::user()->can('flights.edit')
            ],
            'timeline' => $timeline->map(function ($items, $date) {
                return [
                    'date' => $items[0]->date,
                    'flights' => $items->map(function ($flight) {
                        return [
                            'id' => $flight->entry->id,
                            'version' => $flight->entry->version,
                            'date' => $flight->entry->timeline->date,
                            'release_channel' => [
                                'name' => $flight->entry->releaseChannel->short_name,
                                'color' => $flight->entry->releaseChannel->channel->color
                            ],
                            'platform' => [
                                'icon' => $flight->entry->platform->icon,
                                'name' => $flight->entry->platform->name,
                                'color' => $flight->entry->platform->color
                            ],
                            'edit_url' => $flight->entry->edit_url
                        ];
                    })
                ];
            }),
            'createUrl' => route('admin.flights.create', [], false),
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
        $this->authorize('flights.create');

        $releases = Release::orderBy('canonical_version')->orderBy('platform_id')->get();

        return Inertia::render('Admin/Flights/Create', [
            'urls' => [
                'store_flight' => route('admin.flights.store', [], false),
            ],
            'releases' => $releases->map(function ($release) {
                return [
                    'id' => $release->id,
                    'name' => $release->name,
                    'start_build' => $release->start_build,
                    'start_delta' => $release->start_delta,
                    'end_build' => $release->end_build,
                    'end_delta' => $release->end_delta,
                    'platform' => [
                        'icon' => $release->platform->icon,
                        'name' => $release->platform->name,
                        'color' => $release->platform->color
                    ],
                    'channels' => $release->releaseChannels->map(function ($channel) {
                        return [
                            'id' => $channel->id,
                            'name' => $channel->name,
                            'supported' => $channel->supported,
                            'color' => $channel->channel->color,
                            'order' => $channel->channel->order
                        ];
                    })
                ];
            })
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
        $this->authorize('flights.create');

        foreach($request->releaseChannels as $releaseChannel) {
            $release_channel = ReleaseChannel::find($releaseChannel);
            $flight = Flight::create([
                'major' => request('major'),
                'minor' => request('minor'),
                'build' => request('build'),
                'delta' => request('delta'),
                'release_channel_id' => $releaseChannel
            ]);

            Timeline::create([
                'date' => (new Carbon(request('date'))),
                'entry_type' => Flight::class,
                'entry_id' => $flight->id
            ]);

            if ($request->tweet) {
                if ($release_channel->channel->platform->tweetStream) {
                    $tweet_stream = $release_channel->channel->platform->tweetStream;

                    $twitter_stream = Twitter::usingCredentials($tweet_stream->access_token, $tweet_stream->access_token_secret, $tweet_stream->consumer_key, $tweet_stream->consumer_secret);

                    $posted_tweet = $twitter_stream->postTweet([
                        'status' => str_replace(
                            array('%RELEASE%', '%VERSION%', '%CODENAME%', '%FLIGHT%', '%CHANNELS%', '%URL%'),
                            array(
                                $release_channel->release->name,
                                $release_channel->release->version,
                                $release_channel->release->codename,
                                $flight->version,
                                $release_channel->name,
                                'changewindows.org/releases/'.$release_channel->release->slug
                            ),
                            $release_channel->channel->platform->tweet_template
                        )
                    ]);

                    if ($posted_tweet && $release_channel->channel->platform->retweetStream) {
                        $retweet_stream = $release_channel->channel->platform->retweetStream;
                        
                        $twitter_re_stream = Twitter::usingCredentials($retweet_stream->access_token, $retweet_stream->access_token_secret, $retweet_stream->consumer_key, $retweet_stream->consumer_secret);

                        $posted_retweet = $twitter_re_stream->postRt($posted_tweet->id);
                    }
                }
            }
        }

        return Redirect::route('admin.flights')->with('status', 'Succesfully created these flights.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Flight  $flight
     * @return \Illuminate\Http\Response
     */
    public function show(Flight $flight)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Flight  $flight
     * @return \Illuminate\Http\Response
     */
    public function edit(Flight $flight)
    {
        $this->authorize('flights.show');

        return Inertia::render('Admin/Flights/Edit', [
            'can' => [
                'edit_flights' => Auth::user()->can('flights.edit'),
                'delete_flights' => Auth::user()->can('flights.delete')
            ],
            'urls' => [
                'update_flight' => route('admin.flights.update', $flight, false),
                'destroy_flight' => route('admin.flights.destroy', $flight, false)
            ],
            'flight' => $flight,
            'platform' => [
                'icon' => $flight->releaseChannel->channel->platform->icon,
                'name' => $flight->releaseChannel->channel->platform->name,
                'color' => $flight->releaseChannel->channel->platform->color
            ],
            'release_channel' => [
                'name' => $flight->releaseChannel->short_name,
                'color' => $flight->releaseChannel->channel->color
            ],
            'date' => $flight->timeline,
            'status' => session('status')
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Flight  $flight
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Flight $flight)
    {
        $this->authorize('flights.edit');

        $flight->update([
            'major' => request('major'),
            'minor' => request('minor'),
            'build' => request('build'),
            'delta' => request('delta')
        ]);

        $flight->timeline->update([
            'date' => (new Carbon(request('date')))
        ]);

        return Redirect::route('admin.flights.edit', $flight)->with('status', 'Succesfully updated the flight.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Flight  $flight
     * @return \Illuminate\Http\Response
     */
    public function destroy(Flight $flight)
    {
        $this->authorize('flights.delete');

        $flight->timeline->delete();
        $flight->delete();

        return Redirect::route('admin.flights')->with('status', 'Succesfully deleted flight.');
    }
}
