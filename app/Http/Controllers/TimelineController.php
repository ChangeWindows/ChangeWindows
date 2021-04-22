<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Platform;
use App\Models\Timeline;

class TimelineController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $channel_platforms = Platform::orderBy('tool')->orderBy('position')->where('active', '=', '1')->get();

        return Inertia::render('Timeline/Index', [
            'platforms' => Platform::orderBy('position')->get()->map(function ($platform) {
                return [
                    'name' => $platform->name,
                    'color' => $platform->color,
                    'icon' => $platform->icon,
                    'legacy' => $platform->legacy,
                    'tool' => $platform->tool,
                    'url' => route('front.timeline.show', $platform, false)
                ];
            }),
            'channel_platforms' => $channel_platforms->map(function ($platform) {
                return [
                    'name' => $platform->name,
                    'color' => $platform->color,
                    'icon' => $platform->icon,
                    'channels' => $platform->channels->where('active')->map(function ($channel) {
                        $release_channels = $channel->releaseChannels
                            ->sortByDesc(function ($release_channel, $key) {
                                return $release_channel->release->canonical_version;
                            })->values()->all();
        
                        return [
                            'name' => $release_channels[0]->short_name,
                            'order' => $channel->order,
                            'color' => $channel->color,
                            'flights' => collect($release_channels)->map(function ($_channel) {
                                if ($_channel->latest) {
                                    return [
                                        'version' => $_channel->latest->flight,
                                        'date' => $_channel->latest->timeline->date,
                                        'url' => $_channel->latest->url
                                    ];
                                }
                            })->where('version', '<>', null)->values()->all()
                        ];
                    })->sortBy('order')->values()->all(),
                ];
            }),
            'timeline' => Timeline::orderBy('date', 'desc')->get()->groupBy('date')->map(function ($items, $date) {
                return [
                    'date' => $items[0]->date,
                    'flights' => $items->groupBy(function($item, $key) {
                        return $item->entry->flight.'-'.$item->entry->platform->position;
                    })->map(function ($flights) {
                        $_cur_flight = $flights->first();

                        return [
                            'id' => $_cur_flight->entry->id,
                            'flight' => $_cur_flight->entry->flight,
                            'date' => $_cur_flight->entry->timeline->date,
                            'version' => $_cur_flight->entry->releaseChannel->release->version,
                            'release_channel' => $flights->map(function ($channels) {
                                return [
                                    'name' => $channels->entry->releaseChannel->short_name,
                                    'color' => $channels->entry->releaseChannel->channel->color
                                ];
                            }),
                            'platform' => [
                                'icon' => $_cur_flight->entry->platform->icon,
                                'name' => $_cur_flight->entry->platform->name,
                                'color' => $_cur_flight->entry->platform->color
                            ],
                            'url' => $_cur_flight->entry->url
                        ];
                    })->values()->all()
                ];
            }),
            'status' => session('status')
        ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show(Platform $platform)
    {
        $channel_platforms = Platform::orderBy('tool')->orderBy('position')->where('active', '=', '1')->get();

        return Inertia::render('Timeline/Show', [
            'platforms' => Platform::orderBy('position')->get()->map(function ($_platform) {
                return [
                    'id' => $_platform->id,
                    'name' => $_platform->name,
                    'color' => $_platform->color,
                    'icon' => $_platform->icon,
                    'legacy' => $_platform->legacy,
                    'tool' => $_platform->tool,
                    'url' => route('front.timeline.show', $_platform, false)
                ];
            }),
            'channel_platforms' => $channel_platforms->map(function ($platform) {
                return [
                    'name' => $platform->name,
                    'color' => $platform->color,
                    'icon' => $platform->icon,
                    'channels' => $platform->channels->where('active')->map(function ($channel) {
                        $release_channels = $channel->releaseChannels
                            ->sortByDesc(function ($release_channel, $key) {
                                return $release_channel->release->canonical_version;
                            })->values()->all();
        
                        return [
                            'name' => $release_channels[0]->short_name,
                            'order' => $channel->order,
                            'color' => $channel->color,
                            'flights' => collect($release_channels)->map(function ($_channel) {
                                if ($_channel->latest) {
                                    return [
                                        'version' => $_channel->latest->flight,
                                        'date' => $_channel->latest->timeline->date,
                                        'url' => $_channel->latest->url
                                    ];
                                }
                            })->where('version', '<>', null)->values()->all()
                        ];
                    })->sortBy('order')->values()->all(),
                ];
            }),
            'timeline' => $platform->timeline->sortByDesc('date')->groupBy('date')->map(function ($items, $date) {
                return [
                    'date' => $items[0]->date,
                    'flights' => $items->groupBy(function($item, $key) {
                        return $item->entry->flight.'-'.$item->entry->platform->position;
                    })->map(function ($flights) {
                        $_cur_flight = $flights->first();

                        return [
                            'id' => $_cur_flight->entry->id,
                            'flight' => $_cur_flight->entry->flight,
                            'date' => $_cur_flight->entry->timeline->date,
                            'version' => $_cur_flight->entry->releaseChannel->release->version,
                            'release_channel' => $flights->map(function ($channels) {
                                return [
                                    'name' => $channels->entry->releaseChannel->short_name,
                                    'color' => $channels->entry->releaseChannel->channel->color
                                ];
                            }),
                            'platform' => [
                                'icon' => $_cur_flight->entry->platform->icon,
                                'name' => $_cur_flight->entry->platform->name,
                                'color' => $_cur_flight->entry->platform->color
                            ],
                            'url' => $_cur_flight->entry->url
                        ];
                    })->values()->all()
                ];
            }),
            'status' => session('status')
        ]);
    }
}
