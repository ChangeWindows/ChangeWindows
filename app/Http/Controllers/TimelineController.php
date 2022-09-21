<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Platform;
use App\Models\Timeline;
use Illuminate\Database\Eloquent\Builder;

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
        $timeline = Timeline::orderBy('date', 'desc');
        $paginator = $timeline->paginate(75)->onEachSide(2)->through(function () {
            return [];
        });

        $patreon_api = new \Patreon\API(env('PATREON_API_KEY'));
        $campaign_id = 1028298;
        $tier_id = '1965775';

        $fields = [
            "page" => [
                "size" => 100
            ],
            "include" => implode(",", [
                "user",
                "currently_entitled_tiers"
            ]),
            "fields" => [
                "member" => implode(",", [
                    "full_name",
                    "patron_status"
                ])
            ]
        ];
        $query = http_build_query($fields);

        $pledges_response = $patreon_api->get_data("campaigns/{$campaign_id}/members?{$query}");
        $patrons = collect();

        foreach (array_keys($pledges_response['data']) as $pledge_data_key) {
            $pledge_data = $pledges_response['data'][$pledge_data_key];

            if ($pledge_data['attributes']['patron_status'] === 'active_patron' && $pledge_data['relationships']['currently_entitled_tiers']['data'] && $pledge_data['relationships']['currently_entitled_tiers']['data'][0]['id'] === $tier_id) {
                $patrons->push([
                    'name' => $pledge_data['attributes']['full_name'],
                    'avatar' => "https://c8.patreon.com/2/200/{$pledge_data['relationships']['user']['data']['id']}",
                    'tier' => $pledge_data['relationships']['currently_entitled_tiers']['data'][0]['id']
                ]);
            }
        }

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
                    'channels' => $platform->channels->where('active')->where('package', '=', 0)->map(function ($channel) {
                        $release_channel = $channel->activeReleaseChannels
                            ->sortByDesc(function ($release_channel, $key) {
                                return $release_channel->release->canonical_version;
                            })->values()->first();

                        return [
                            'name' => $release_channel->short_name,
                            'order' => $channel->order,
                            'color' => $channel->color,
                            'flight' => [
                                'version' => $release_channel->latest->flight,
                                'date' => $release_channel->latest->timeline->date,
                                'url' => $release_channel->latest->url
                            ]
                        ];
                    })->sortBy('order')->values()->all(),
                ];
            }),
            'timeline' => $timeline->paginate(75)->groupBy('date')->map(function ($items, $date) {
                return [
                    'date' => $items[0]->date,
                    'flights' => $items->groupBy(function($item, $key) {
                        if ($item->item_type === \App\Models\Flight::class) {
                            return $item->item->platform->position.'-'.$item->item->flight;
                        } else if ($item->item_type === \App\Models\Promotion::class) {
                            return $item->item->platform->position.'.'.$item->item->releaseChannel->release->version.'.'.$item->item->releaseChannel->channel->order;
                        } else if ($item->item_type === \App\Models\Launch::class) {
                            return $item->item->platform->position.'.'.$item->item->release->version;
                        }
                    })->map(function ($flights) {
                        if ($flights->first()->item_type === \App\Models\Flight::class) {
                            $_cur_flight = $flights->first();
                            return [
                                'type' => 'flight',
                                'event_priority' => 3,
                                'id' => $_cur_flight->item->id,
                                'flight' => $_cur_flight->item->releaseChannel->release->package ? $_cur_flight->item->version : $_cur_flight->item->flight,
                                'date' => $_cur_flight->item->timeline->date,
                                'version' => $_cur_flight->item->releaseChannel->release->version,
                                'cversion' => $_cur_flight->item->releaseChannel->release->canonical_version,
                                'package' => $_cur_flight->item->releaseChannel->release->package ? $_cur_flight->item->releaseChannel->release->name : false,
                                'release_channel' => $flights->map(function ($channels) {
                                    return [
                                        'order' => $channels->item->releaseChannel->channel->order,
                                        'name' => $channels->item->releaseChannel->short_name,
                                        'color' => $channels->item->releaseChannel->channel->color
                                    ];
                                })->sortBy('order')->values()->all(),
                                'platform' => [
                                    'id' => $_cur_flight->item->platform->id,
                                    'position' => $_cur_flight->item->platform->position,
                                    'icon' => $_cur_flight->item->platform->icon,
                                    'name' => $_cur_flight->item->platform->name,
                                    'tool' => $_cur_flight->item->platform->tool,
                                    'color' => $_cur_flight->item->platform->color
                                ],
                                'url' => $_cur_flight->item->url
                            ];
                        }

                        if ($flights->first()->item_type === \App\Models\Promotion::class) {
                            $_cur_promotion = $flights->first();
                            return [
                                'type' => 'promotion',
                                'event_priority' => 2,
                                'id' => $_cur_promotion->item->id,
                                'date' => $_cur_promotion->item->timeline->date,
                                'version' => $_cur_promotion->item->releaseChannel->release->version,
                                'cversion' => $_cur_promotion->item->releaseChannel->release->canonical_version,
                                'release_channel' => [
                                    'name' => $_cur_promotion->item->releaseChannel->short_name,
                                    'color' => $_cur_promotion->item->releaseChannel->channel->color
                                ],
                                'platform' => [
                                    'id' => $_cur_promotion->item->platform->id,
                                    'position' => $_cur_promotion->item->platform->position,
                                    'icon' => $_cur_promotion->item->platform->icon,
                                    'name' => $_cur_promotion->item->platform->name,
                                    'color' => $_cur_promotion->item->platform->color
                                ],
                                'url' => $_cur_promotion->item->url
                            ];
                        }

                        if ($flights->first()->item_type === \App\Models\Launch::class) {
                            $_cur_launch = $flights->first();
                            return [
                                'type' => 'launch',
                                'event_priority' => 1,
                                'id' => $_cur_launch->item->id,
                                'date' => $_cur_launch->item->timeline->date,
                                'version' => $_cur_launch->item->release->version,
                                'cversion' => $_cur_launch->item->release->canonical_version,
                                'platform' => [
                                    'id' => $_cur_launch->item->platform->id,
                                    'position' => $_cur_launch->item->platform->position,
                                    'icon' => $_cur_launch->item->platform->icon,
                                    'name' => $_cur_launch->item->platform->name,
                                    'color' => $_cur_launch->item->platform->color
                                ],
                                'url' => $_cur_launch->item->url
                            ];
                        }
                    })->groupBy(function($item, $key) {
                        return $item['platform']['id'];
                    })->sortBy(function($item, $key) {
                        return $item[0]['platform']['position'];
                    })->map(function($platform) {
                        return $platform->sortByDesc(function ($item, $key) {
                            if ($item['type'] === 'flight') {
                                return $item['event_priority'].'.'.$item['platform']['position'].'.'.$item['flight'];
                            }

                            return $item['event_priority'].'.'.$item['platform']['position'];
                        })->values()->all();
                    })->values()->all()
                ];
            }),
            'pagination' => $paginator,
            'patron' => $patrons->random(),
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
            ->whereHas('flight', function (Builder $query) use ($platform) {
                $query->join('release_channels as frs', function ($join) {
                    $join->on('frs.id', '=', 'flights.release_channel_id')

                    ->join('channels as fc', function ($join) {
                        $join->on('fc.id', '=', 'frs.channel_id');
                    });
                })
                ->where('fc.platform_id', '=', $platform->id);
            })
            ->orWhereHas('promotion', function (Builder $query) use ($platform) {
                $query->join('release_channels as prs', function ($join) {
                    $join->on('prs.id', '=', 'promotions.release_channel_id')

                    ->join('channels as pc', function ($join) {
                        $join->on('pc.id', '=', 'prs.channel_id');
                    });
                })
                ->where('pc.platform_id', '=', $platform->id);
            })
            ->orWhereHas('launch', function (Builder $query) use ($platform) {
                $query->join('releases as lr', function ($join) {
                    $join->on('lr.id', '=', 'launches.release_id');
                })
                ->where('lr.platform_id', '=', $platform->id);
            });
        $paginator = $timeline->paginate(75)->onEachSide(2)->through(function () {
            return [];
        });

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
            'platform' => [
                'name' => $platform->name,
                'icon' => $platform->icon,
                'color' => $platform->color
            ],
            'channel_platforms' => $channel_platforms->map(function ($platform) {
                return [
                    'name' => $platform->name,
                    'color' => $platform->color,
                    'icon' => $platform->icon,
                    'channels' => $platform->channels->where('active')->where('package', '=', 0)->map(function ($channel) {
                        $release_channel = $channel->activeReleaseChannels
                            ->sortByDesc(function ($release_channel, $key) {
                                return $release_channel->release->canonical_version;
                            })->values()->first();

                        return [
                            'name' => $release_channel->short_name,
                            'order' => $channel->order,
                            'color' => $channel->color,
                            'flight' => [
                                'version' => $release_channel->latest->flight,
                                'date' => $release_channel->latest->timeline->date,
                                'url' => $release_channel->latest->url
                            ]
                        ];
                    })->sortBy('order')->values()->all(),
                ];
            }),
            'timeline' => $timeline->paginate(75)->groupBy('date')->map(function ($items, $date) {
                return [
                    'date' => $items[0]->date,
                    'flights' => $items->groupBy(function($item, $key) {
                        if ($item->item_type === \App\Models\Flight::class) {
                            return $item->item->platform->position.'-'.$item->item->flight;
                        } else if ($item->item_type === \App\Models\Promotion::class) {
                            return $item->item->platform->position.'.'.$item->item->releaseChannel->release->version.'.'.$item->item->releaseChannel->channel->order;
                        } else if ($item->item_type === \App\Models\Launch::class) {
                            return $item->item->platform->position.'.'.$item->item->release->version;
                        }
                    })->map(function ($flights) {
                        if ($flights->first()->item_type === \App\Models\Flight::class) {
                            $_cur_flight = $flights->first();
                            return [
                                'type' => 'flight',
                                'event_priority' => 3,
                                'id' => $_cur_flight->item->id,
                                'flight' => $_cur_flight->item->releaseChannel->release->package ? $_cur_flight->item->version : $_cur_flight->item->flight,
                                'date' => $_cur_flight->item->timeline->date,
                                'version' => $_cur_flight->item->releaseChannel->release->version,
                                'cversion' => $_cur_flight->item->releaseChannel->release->canonical_version,
                                'package' => $_cur_flight->item->releaseChannel->release->package ? $_cur_flight->item->releaseChannel->release->name : false,
                                'release_channel' => $flights->map(function ($channels) {
                                    return [
                                        'order' => $channels->item->releaseChannel->channel->order,
                                        'name' => $channels->item->releaseChannel->short_name,
                                        'color' => $channels->item->releaseChannel->channel->color
                                    ];
                                })->sortBy('order')->values()->all(),
                                'platform' => [
                                    'id' => $_cur_flight->item->platform->id,
                                    'position' => $_cur_flight->item->platform->position,
                                    'icon' => $_cur_flight->item->platform->icon,
                                    'name' => $_cur_flight->item->platform->name,
                                    'tool' => $_cur_flight->item->platform->tool,
                                    'color' => $_cur_flight->item->platform->color
                                ],
                                'url' => $_cur_flight->item->url
                            ];
                        }

                        if ($flights->first()->item_type === \App\Models\Promotion::class) {
                            $_cur_promotion = $flights->first();
                            return [
                                'type' => 'promotion',
                                'event_priority' => 2,
                                'id' => $_cur_promotion->item->id,
                                'date' => $_cur_promotion->item->timeline->date,
                                'version' => $_cur_promotion->item->releaseChannel->release->version,
                                'cversion' => $_cur_promotion->item->releaseChannel->release->canonical_version,
                                'release_channel' => [
                                    'name' => $_cur_promotion->item->releaseChannel->short_name,
                                    'color' => $_cur_promotion->item->releaseChannel->channel->color
                                ],
                                'platform' => [
                                    'id' => $_cur_promotion->item->platform->id,
                                    'position' => $_cur_promotion->item->platform->position,
                                    'icon' => $_cur_promotion->item->platform->icon,
                                    'name' => $_cur_promotion->item->platform->name,
                                    'color' => $_cur_promotion->item->platform->color
                                ],
                                'url' => $_cur_promotion->item->url
                            ];
                        }

                        if ($flights->first()->item_type === \App\Models\Launch::class) {
                            $_cur_launch = $flights->first();
                            return [
                                'type' => 'launch',
                                'event_priority' => 1,
                                'id' => $_cur_launch->item->id,
                                'date' => $_cur_launch->item->timeline->date,
                                'version' => $_cur_launch->item->release->version,
                                'cversion' => $_cur_launch->item->release->canonical_version,
                                'platform' => [
                                    'id' => $_cur_launch->item->platform->id,
                                    'position' => $_cur_launch->item->platform->position,
                                    'icon' => $_cur_launch->item->platform->icon,
                                    'name' => $_cur_launch->item->platform->name,
                                    'color' => $_cur_launch->item->platform->color
                                ],
                                'url' => $_cur_launch->item->url
                            ];
                        }
                    })->groupBy(function($item, $key) {
                        return $item['platform']['id'];
                    })->sortBy(function($item, $key) {
                        return $item[0]['platform']['position'];
                    })->map(function($platform) {
                        return $platform->sortByDesc(function ($item, $key) {
                            if ($item['type'] === 'flight') {
                                return $item['event_priority'].'.'.$item['platform']['position'].'.'.$item['flight'];
                            }

                            return $item['event_priority'].'.'.$item['platform']['position'];
                        })->values()->all();
                    })->values()->all()
                ];
            }),
            'pagination' => $paginator,
            'status' => session('status')
        ]);
    }
}
