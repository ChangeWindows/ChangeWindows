<?php

namespace App\Http\Controllers\Admin;

use App\Models\Release;
use App\Models\Flight;
use App\Models\ReleaseChannel;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Auth;
use Redirect;
use Carbon\Carbon;

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

        $timeline = Flight::orderBy('date', 'desc')->with('releaseChannel', 'releaseChannel.channel', 'releaseChannel.channel.platform');
        $paginator = $timeline->paginate(100)->onEachSide(2);

        return Inertia::render('Admin/Flights/Index', [
            'can' => [
                'flights' => [
                    'create' => Auth::user()->can('flights.create'),
                    'edit' => Auth::user()->can('flights.edit')
                ]
            ],
            'timeline' => $timeline->paginate(100)->groupBy('date')->map(function ($items, $date) {
                return [
                    'date' => $date,
                    'flights' => $items->map(function ($flight) {
                        return [
                            'id' => $flight->id,
                            'version' => $flight->flight,
                            'date' => $flight->date,
                            'release_channel' => [
                                'name' => $flight->releaseChannel->short_name,
                                'color' => $flight->releaseChannel->channel->color
                            ],
                            'platform' => [
                                'id' => $flight->releaseChannel->channel->platform->id,
                                'icon' => $flight->releaseChannel->channel->platform->icon,
                                'name' => $flight->releaseChannel->channel->platform->name,
                                'position' => $flight->releaseChannel->channel->platform->position,
                                'color' => $flight->releaseChannel->channel->platform->color
                            ]
                        ];
                    })->sortByDesc(function ($item) {
                        return $item['version'];
                    })->groupBy(function($item) {
                        return $item['platform']['id'];
                    })->sortBy(function($item) {
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

        $releases = Release::with('platform', 'releaseChannels', 'releaseChannels.channel')->orderBy('canonical_version')->orderBy('platform_id')->get();

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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->authorize('flights.create');

        foreach ($request->releaseChannels as $releaseChannel) {
            Flight::create([
                'major' => request('major'),
                'minor' => request('minor'),
                'build' => request('build'),
                'delta' => request('delta'),
                'date' => (new Carbon(request('date'))),
                'release_channel_id' => $releaseChannel
            ]);
        }

        return Redirect::route('admin.flights')->with('status', [
            'message' => 'Succesfully created these flights.',
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

        $flight->load('releaseChannel', 'releaseChannel.channel', 'releaseChannel.channel.platform');

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
            'delta' => request('delta'),
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

        $flight->delete();

        return Redirect::route('admin.flights')->with('status', [
            'message' => 'Succesfully deleted flight.',
            'type' => 'success'
        ]);
    }
}
