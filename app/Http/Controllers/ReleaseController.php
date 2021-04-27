<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Redirect;
use App\Models\Platform;
use App\Models\Release;

class ReleaseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Releases/Index', [
            'releases' => Release::orderBy('platform_id', 'asc')->orderBy('canonical_version', 'desc')->get()->map(function ($release) {
                return [
                    'name' => $release->name,
                    'version' => $release->version,
                    'codename' => $release->codename,
                    'start_public' => $release->start_public,
                    'url' => $release->url,
                    'platform' => [
                        'icon' => $release->platform->icon,
                        'name' => $release->platform->name,
                        'color' => $release->platform->color,
                        'tool' => $release->platform->tool
                    ],
                    'channels' => $release->releaseChannels->where('supported')->map(function ($channel) {
                        return [
                            'id' => $channel->id,
                            'short_name' => $channel->short_name,
                            'supported' => $channel->supported,
                            'color' => $channel->channel->color,
                            'order' => $channel->channel->order
                        ];
                    })->values()->all()
                ];
            })->values()->all(),
        ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show(Release $release)
    {
        return Inertia::render('Releases/Show', [
            'platforms' => Platform::where('tool', 0)->orderBy('position')->get()->map(function ($_platform) {
                return [
                    'id' => $_platform->id,
                    'name' => $_platform->name,
                    'color' => $_platform->color,
                    'icon' => $_platform->icon,
                    'legacy' => $_platform->legacy,
                    'url' => route('front.platforms.show', $_platform, false)
                ];
            }),
            'release' => $release,
            'platform' => $release->platform,
            'channels' => $release->releaseChannels->map(function ($release_channel) {
                return [
                    'name' => $release_channel->short_name,
                    'order' => $release_channel->channel->order,
                    'color' => $release_channel->channel->color,
                    'disabled' => $release_channel->supported ? false : true,
                    'flight' => $release_channel->latest ? [
                        'version' => $release_channel->latest->flight,
                        'date' => $release_channel->latest->timeline->date
                    ] : []
                ];
            })->sortBy('order')->values()->all(),
            'timeline' => $release->timeline->sortByDesc('date')->groupBy('date')->map(function ($items, $date) {
                return [
                    'date' => $items[0]->date,
                    'flights' => $items->groupBy(function($item, $key) {
                        return $item->item->flight.'-'.$item->item->platform->position;
                    })->map(function ($flights) {
                        $_cur_flight = $flights->first();

                        return [
                            'id' => $_cur_flight->item->id,
                            'flight' => $_cur_flight->item->flight,
                            'date' => $_cur_flight->item->timeline->date,
                            'version' => $_cur_flight->item->releaseChannel->release->version,
                            'release_channel' => $flights->map(function ($channels) {
                                return [
                                    'name' => $channels->item->releaseChannel->short_name,
                                    'color' => $channels->item->releaseChannel->channel->color
                                ];
                            }),
                            'platform' => [
                                'icon' => $_cur_flight->item->platform->icon,
                                'name' => $_cur_flight->item->platform->name,
                                'color' => $_cur_flight->item->platform->color
                            ]
                        ];
                    })->values()->all()
                ];
            })
        ]);
    }
}
