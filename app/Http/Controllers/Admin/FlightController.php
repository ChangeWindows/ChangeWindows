<?php

namespace App\Http\Controllers\Admin;

use App\Models\Release;
use App\Models\Flight;
use App\Models\Timeline;
use App\Models\Promotion;
use App\Models\Launch;
use App\Models\ReleaseChannel;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Auth;
use Redirect;
use Carbon\Carbon;
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

        $timeline = Timeline::where('item_type', Flight::class)->orderBy('date', 'desc');
        $paginator = $timeline->paginate(100)->onEachSide(2)->through(function () {
            return [];
        });

        return Inertia::render('Admin/Flights/Index', [
            'can' => [
                'flights' => [
                    'create' => Auth::user()->can('flights.create'),
                    'edit' => Auth::user()->can('flights.edit')
                ]
            ],
            'timeline' => $timeline->paginate(100)->groupBy('date')->map(function ($items, $date) {
                return [
                    'date' => $items[0]->date,
                    'flights' => $items->map(function ($flight) {
                        return [
                            'id' => $flight->item->id,
                            'version' => $flight->item->flight,
                            'date' => $flight->item->timeline->date,
                            'release_channel' => [
                                'name' => $flight->item->releaseChannel->short_name,
                                'color' => $flight->item->releaseChannel->channel->color
                            ],
                            'platform' => [
                                'id' => $flight->item->platform->id,
                                'icon' => $flight->item->platform->icon,
                                'name' => $flight->item->platform->name,
                                'position' => $flight->item->platform->position,
                                'color' => $flight->item->platform->color
                            ]
                        ];
                    })->groupBy(function($item, $key) {
                        return $item['platform']['id'];
                    })->sortBy(function($item, $key) {
                        return $item[0]['platform']['position'];
                    })->values()->all()
                ];
            }),
            'pagination' => $paginator,
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

        $releases = Release::where('package', '=', 0)->orderBy('canonical_version')->orderBy('platform_id')->get();

        return Inertia::render('Admin/Flights/Create', [
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
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function createPackage()
    {
        $this->authorize('flights.create');

        $packages = Release::where('package', '=', 1)->orderBy('platform_id')->orderBy('name')->get();

        return Inertia::render('Admin/Flights/CreatePackage', [
            'packages' => $packages->map(function ($package) {
                return [
                    'id' => $package->id,
                    'name' => $package->name,
                    'platform' => [
                        'icon' => $package->platform->icon,
                        'name' => $package->platform->name,
                        'color' => $package->platform->color
                    ],
                    'channels' => $package->releaseChannels->map(function ($channel) {
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

        foreach ($request->releaseChannels as $releaseChannel) {
            $release_channel = ReleaseChannel::find($releaseChannel);

            if ($release_channel->release->flights->count() === 0) {
                $launch = Launch::create([
                    'release_id' => $release_channel->release->id
                ]);

                Timeline::create([
                    'date' => (new Carbon(request('date'))),
                    'item_type' => Launch::class,
                    'item_id' => $launch->id
                ]);
            }

            if ($release_channel->flights->count() === 0) {
                $promotion = Promotion::create([
                    'release_channel_id' => $release_channel->id
                ]);

                Timeline::create([
                    'date' => (new Carbon(request('date'))),
                    'item_type' => Promotion::class,
                    'item_id' => $promotion->id
                ]);
            }

            $flight = Flight::create([
                'major' => request('major'),
                'minor' => request('minor'),
                'build' => request('build'),
                'delta' => request('delta'),
                'release_channel_id' => $releaseChannel
            ]);

            Timeline::create([
                'date' => (new Carbon(request('date'))),
                'item_type' => Flight::class,
                'item_id' => $flight->id
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
                                'https://changewindows.org' . route('front.platforms.releases', ['release' => $release_channel->release, 'platform' => $release_channel->release->platform], false)
                            ),
                            $release_channel->channel->platform->tweet_template
                        )
                    ]);

                    if ($posted_tweet && $release_channel->channel->platform->retweetStream) {
                        $retweet_stream = $release_channel->channel->platform->retweetStream;

                        $twitter_re_stream = Twitter::usingCredentials($retweet_stream->access_token, $retweet_stream->access_token_secret, $retweet_stream->consumer_key, $retweet_stream->consumer_secret);

                        $twitter_re_stream->postRt($posted_tweet->id);
                    }
                }
            }
        }

        return Redirect::route('admin.flights')->with('status', [
            'message' => 'Succesfully created these flights.',
            'type' => 'success'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function storePackage(Request $request)
    {
        $this->authorize('flights.create');

        foreach ($request->packageChannels as $packageChannel) {
            $release_channel = ReleaseChannel::find($packageChannel);

            $flight = Flight::create([
                'major' => request('major'),
                'minor' => request('minor'),
                'build' => request('build'),
                'delta' => request('delta'),
                'release_channel_id' => $packageChannel
            ]);

            Timeline::create([
                'date' => (new Carbon(request('date'))),
                'item_type' => Flight::class,
                'item_id' => $flight->id
            ]);

            if ($request->tweet) {
                if ($release_channel->channel->platform->tweetStream) {
                    $tweet_stream = $release_channel->channel->platform->tweetStream;

                    $twitter_stream = Twitter::usingCredentials($tweet_stream->access_token, $tweet_stream->access_token_secret, $tweet_stream->consumer_key, $tweet_stream->consumer_secret);

                    $posted_tweet = $twitter_stream->postTweet([
                        'status' => str_replace(
                            array('%RELEASE%', '%FLIGHT%', '%CHANNELS%', '%URL%'),
                            array(
                                $release_channel->release->name,
                                $flight->version,
                                $release_channel->name,
                                'https://changewindows.org' . route('front.platforms.packages', ['release' => $release_channel->release, 'platform' => $release_channel->release->platform], false)
                            ),
                            $release_channel->channel->platform->tweet_template_package
                        )
                    ]);

                    if ($posted_tweet && $release_channel->channel->platform->retweetStream) {
                        $retweet_stream = $release_channel->channel->platform->retweetStream;

                        $twitter_re_stream = Twitter::usingCredentials($retweet_stream->access_token, $retweet_stream->access_token_secret, $retweet_stream->consumer_key, $retweet_stream->consumer_secret);

                        $twitter_re_stream->postRt($posted_tweet->id);
                    }
                }
            }
        }

        return Redirect::route('admin.flights')->with('status', [
            'message' => 'Succesfully created these package flights.',
            'type' => 'success'
        ]);
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
                'flights' => [
                    'delete' => Auth::user()->can('flights.delete'),
                    'edit' => Auth::user()->can('flights.edit')
                ]
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

        return Redirect::route('admin.flights.edit', $flight)->with('status', [
            'message' => 'Succesfully updated the flight.',
            'type' => 'success'
        ]);
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

        return Redirect::route('admin.flights')->with('status', [
            'message' => 'Succesfully deleted flight.',
            'type' => 'success'
        ]);
    }
}
