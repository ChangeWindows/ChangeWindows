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
        $timeline = Timeline::orderBy('date', 'desc')->paginate(75);

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
            'timeline' => $timeline->groupBy('date')->map(function ($items, $date) {
                return [
                    'date' => $items[0]->date,
                    'flights' => $items->groupBy(function($item, $key) {
                        if ($item->entry_type === \App\Models\Flight::class) {
                            return $item->entry->flight.'-'.$item->entry->platform->position;
                        } else if ($item->entry_type === \App\Models\Promotion::class) {
                            return $item->entry->platform->position.$item->entry->releaseChannel->channel->order;
                        } else if ($item->entry_type === \App\Models\Launch::class) {
                            return $item->entry->platform->position;
                        }
                    })->map(function ($flights) {
                        if ($flights->first()->entry_type === \App\Models\Flight::class) {
                            $_cur_flight = $flights->first();
                            return [
                                'type' => 'flight',
                                'sorted' => 'a',
                                'id' => $_cur_flight->entry->id,
                                'flight' => $_cur_flight->entry->flight,
                                'date' => $_cur_flight->entry->timeline->date,
                                'version' => $_cur_flight->entry->releaseChannel->release->version,
                                'cversion' => $_cur_flight->entry->releaseChannel->release->canonical_version,
                                'release_channel' => $flights->map(function ($channels) {
                                    return [
                                        'name' => $channels->entry->releaseChannel->short_name,
                                        'color' => $channels->entry->releaseChannel->channel->color
                                    ];
                                }),
                                'platform' => [
                                    'order' => $_cur_flight->entry->platform->order,
                                    'icon' => $_cur_flight->entry->platform->icon,
                                    'name' => $_cur_flight->entry->platform->name,
                                    'color' => $_cur_flight->entry->platform->color
                                ],
                                'url' => $_cur_flight->entry->url
                            ];
                        }
                        
                        if ($flights->first()->entry_type === \App\Models\Promotion::class) {
                            $_cur_promotion = $flights->first();
                            return [
                                'type' => 'promotion',
                                'sorted' => 'b',
                                'id' => $_cur_promotion->entry->id,
                                'date' => $_cur_promotion->entry->timeline->date,
                                'version' => $_cur_promotion->entry->releaseChannel->release->version,
                                'cversion' => $_cur_promotion->entry->releaseChannel->release->canonical_version,
                                'release_channel' => [
                                    'name' => $_cur_promotion->entry->releaseChannel->short_name,
                                    'color' => $_cur_promotion->entry->releaseChannel->channel->color
                                ],
                                'platform' => [
                                    'order' => $_cur_promotion->entry->platform->order,
                                    'icon' => $_cur_promotion->entry->platform->icon,
                                    'name' => $_cur_promotion->entry->platform->name,
                                    'color' => $_cur_promotion->entry->platform->color
                                ],
                                'url' => $_cur_promotion->entry->url
                            ]; 
                        }
                        
                        if ($flights->first()->entry_type === \App\Models\Launch::class) {
                            $_cur_launch = $flights->first();
                            return [
                                'type' => 'launch',
                                'sorted' => 'c',
                                'id' => $_cur_launch->entry->id,
                                'date' => $_cur_launch->entry->timeline->date,
                                'version' => $_cur_launch->entry->release->version,
                                'cversion' => $_cur_launch->entry->release->canonical_version,
                                'platform' => [
                                    'order' => $_cur_launch->entry->platform->order,
                                    'icon' => $_cur_launch->entry->platform->icon,
                                    'name' => $_cur_launch->entry->platform->name,
                                    'color' => $_cur_launch->entry->platform->color
                                ],
                                'url' => $_cur_launch->entry->url
                            ];
                        }
                    })->sortByDesc(function ($item, $key) {
                        if ($item['type'] === 'flight') {
                            return $item['sorted'].'.'.$item['cversion'].'.'.$item['flight'].'.'.$item['platform']['order'];
                        }
                        
                        return $item['sorted'].'.'.$item['cversion'].'.'.$item['platform']['order'];
                    })->values()->all()
                ];
            }),
            'pagination' => $timeline,
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
        $timeline = Timeline::orderBy('date', 'desc')
            ->join('flights', function ($join) {
                $join->on('flights.id', '=', 'timeline.entry_id')
                    ->where('timeline.entry_type', '=', 'App\Models\Flight')
                    ->join('release_channels', function ($join) {
                        $join->on('release_channels.id', '=', 'flights.release_channel_id')
                    
                        ->join('channels', function ($join) {
                            $join->on('channels.id', '=', 'release_channels.channel_id');
                        });
                    });
            })
            ->where('channels.platform_id', '=', $platform->id)
            ->paginate(75);

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
            'timeline' => $timeline->sortByDesc('date')->groupBy('date')->map(function ($items, $date) {
                return [
                    'date' => $items[0]->date,
                    'flights' => $items->groupBy(function($item, $key) {
                        return $item->entry->flight.'-'.$item->entry->platform->position;
                    })->map(function ($flights) {
                        if ($flights->first()->entry_type === \App\Models\Flight::class) {
                            $_cur_flight = $flights->first();
                            return [
                                'type' => 'flight',
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
                        }
                        
                        if ($flights->first()->entry_type === \App\Models\Promotion::class) {
                            $_cur_promotion = $flights->first();
                            return [
                                'type' => 'promotion',
                                'id' => $_cur_promotion->entry->id,
                                'date' => $_cur_promotion->entry->timeline->date,
                                'version' => $_cur_promotion->entry->releaseChannel->release->version,
                                'release_channel' => [
                                    'name' => $_cur_promotion->entry->releaseChannel->short_name,
                                    'color' => $_cur_promotion->entry->releaseChannel->channel->color
                                ],
                                'platform' => [
                                    'icon' => $_cur_promotion->entry->platform->icon,
                                    'name' => $_cur_promotion->entry->platform->name,
                                    'color' => $_cur_promotion->entry->platform->color
                                ],
                                'url' => $_cur_promotion->entry->url
                            ]; 
                        }
                        
                        if ($flights->first()->entry_type === \App\Models\Launch::class) {
                            $_cur_launch = $flights->first();
                            return [
                                'type' => 'launch',
                                'id' => $_cur_launch->entry->id,
                                'date' => $_cur_launch->entry->timeline->date,
                                'version' => $_cur_launch->entry->release->version,
                                'platform' => [
                                    'icon' => $_cur_launch->entry->platform->icon,
                                    'name' => $_cur_launch->entry->platform->name,
                                    'color' => $_cur_launch->entry->platform->color
                                ],
                                'url' => $_cur_launch->entry->url
                            ];
                        }
                    })->values()->all()
                ];
            }),
            'pagination' => $timeline,
            'status' => session('status')
        ]);
    }
}
