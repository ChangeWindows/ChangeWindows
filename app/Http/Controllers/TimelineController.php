<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Platform;
use App\Models\Flight;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\MorphTo;


class TimelineController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $channel_platforms = Platform::with('activeChannels', 'activeChannels.activeReleaseChannels', 'activeChannels.activeReleaseChannels.latestFlight')->orderBy('tool')->orderBy('position')->where('active', '=', '1')->get();
        $timeline = Flight::with('releaseChannel', 'releaseChannel.channel', 'releaseChannel.release', 'releaseChannel.release.platform')->orderBy('date', 'desc');
        $paginator = $timeline->paginate(75)->onEachSide(2);

        $patrons = collect();

        // The Patreon SDK can return a JSON string or an array depending on version/state.
        // Keep the timeline page resilient when Patreon is unavailable or data shape changes.
        try {
            if (env('PATREON_API_KEY')) {
                $patreon_api = new \Patreon\API(env('PATREON_API_KEY'));
                $campaign_id = 1028298;

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

                if (is_string($pledges_response)) {
                    $decoded = json_decode($pledges_response, true);
                    $pledges_response = is_array($decoded) ? $decoded : [];
                }

                $pledges_data = is_array($pledges_response) ? ($pledges_response['data'] ?? []) : [];

                if (is_array($pledges_data)) {
                    foreach ($pledges_data as $pledge_data) {
                        if (!is_array($pledge_data)) {
                            continue;
                        }

                        $patron_status = data_get($pledge_data, 'attributes.patron_status');
                        $full_name = data_get($pledge_data, 'attributes.full_name');
                        $user_id = data_get($pledge_data, 'relationships.user.data.id');

                        if ($patron_status === 'active_patron' && $full_name && $user_id) {
                            $patrons->push([
                                'name' => $full_name,
                                'avatar' => "https://c8.patreon.com/2/200/{$user_id}"
                            ]);
                        }
                    }
                }
            }
        } catch (\Throwable $e) {
            report($e);
        }

        return Inertia::render('Timeline/Index', [
            'platforms' => Platform::orderBy('position')->get()->map(function ($platform) {
                return [
                    'slug' => $platform->slug,
                    'name' => $platform->name,
                    'color' => $platform->color,
                    'icon' => $platform->icon,
                    'legacy' => $platform->legacy,
                    'tool' => $platform->tool,
                ];
            }),
            'channel_platforms' => $channel_platforms->map(function ($platform) {
                return [
                    'name' => $platform->name,
                    'slug' => $platform->slug,
                    'color' => $platform->color,
                    'icon' => $platform->icon,
                    'channels' => $platform->activeChannels->map(function ($channel) {
                        $release_channel = $channel->activeReleaseChannels
                            ->sortByDesc(function ($release_channel) {
                                return $release_channel->release->canonical_version;
                            })->values()->first();

                        return [
                            'name' => $release_channel->short_name,
                            'order' => $channel->order,
                            'color' => $channel->color,
                            'flight' => [
                                'version' => $release_channel->latestFlight->flight,
                                'date' => $release_channel->latestFlight->date
                            ],
                            'release' => [
                                'id' => $release_channel->release->id,
                                'slug' => $release_channel->release->slug,
                            ]
                        ];
                    })->sortBy('order')->values()->all(),
                ];
            }),
            'timeline' => $timeline->paginate(75)->groupBy('date')->map(function ($items, $date) {
                return [
                    'date' => $items[0]->date,
                    'flights' => $items->groupBy(function ($item) {
                        return $item->platform->position . '-' . $item->flight;
                    })->map(function ($flights) {
                        $_cur = $flights->first();
                        return [
                            'id' => $_cur->id,
                            'flight' => $_cur->flight,
                            'date' => $_cur->date,
                            'release' => [
                                'slug' => $_cur->releaseChannel->release->slug,
                                'version' => $_cur->releaseChannel->release->version,
                                'cversion' => $_cur->releaseChannel->release->canonical_version
                            ],
                            'release_channel' => $flights->map(function ($channels) {
                                return [
                                    'order' => $channels->releaseChannel->channel->order,
                                    'name' => $channels->releaseChannel->short_name,
                                    'color' => $channels->releaseChannel->channel->color
                                ];
                            })->sortBy('order')->values()->all(),
                            'platform' => [
                                'id' => $_cur->releaseChannel->release->platform->id,
                                'slug' => $_cur->releaseChannel->release->platform->slug,
                                'position' => $_cur->releaseChannel->release->platform->position,
                                'icon' => $_cur->releaseChannel->release->platform->icon,
                                'name' => $_cur->releaseChannel->release->platform->name,
                                'tool' => $_cur->releaseChannel->release->platform->tool,
                                'color' => $_cur->releaseChannel->release->platform->color
                            ]
                        ];
                    })->groupBy(function ($item) {
                        return $item['platform']['id'];
                    })->sortBy(function ($item) {
                        return $item[0]['platform']['position'];
                    })->map(function ($platform) {
                        return $platform->sortByDesc(function ($item) {
                            return $item['platform']['position'] . '.' . $item['flight'];
                        })->values()->all();
                    })->values()->all()
                ];
            }),
            'pagination' => $paginator,
            'patron' => $patrons->isNotEmpty() ? $patrons->random() : null,
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
        $channel_platforms = Platform::with('activeChannels', 'activeChannels.activeReleaseChannels', 'activeChannels.activeReleaseChannels.latestFlight')->orderBy('tool')->orderBy('position')->where('active', '=', '1')->get();
        $timeline = Flight::with('releaseChannel', 'releaseChannel.channel', 'releaseChannel.release', 'releaseChannel.release.platform')->orderBy('date', 'desc')
            ->join('release_channels as frs', function ($join) {
                $join->on('frs.id', '=', 'flights.release_channel_id')

                    ->join('channels as fc', function ($join) {
                        $join->on('fc.id', '=', 'frs.channel_id');
                    });
            })
            ->where('fc.platform_id', '=', $platform->id);
        $paginator = $timeline->paginate(75)->onEachSide(2);

        return Inertia::render('Timeline/Show', [
            'platforms' => Platform::orderBy('position')->get()->map(function ($_platform) {
                return [
                    'id' => $_platform->id,
                    'slug' => $_platform->slug,
                    'name' => $_platform->name,
                    'color' => $_platform->color,
                    'icon' => $_platform->icon,
                    'legacy' => $_platform->legacy,
                    'tool' => $_platform->tool
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
                    'slug' => $platform->slug,
                    'color' => $platform->color,
                    'icon' => $platform->icon,
                    'channels' => $platform->activeChannels->map(function ($channel) {
                        $release_channel = $channel->activeReleaseChannels
                            ->sortByDesc(function ($release_channel) {
                                return $release_channel->release->canonical_version;
                            })->values()->first();

                        return [
                            'name' => $release_channel->short_name,
                            'order' => $channel->order,
                            'color' => $channel->color,
                            'flight' => [
                                'version' => $release_channel->latestFlight->flight,
                                'date' => $release_channel->latestFlight->date
                            ],
                            'release' => [
                                'id' => $release_channel->release->id,
                                'slug' => $release_channel->release->slug,
                            ]
                        ];
                    })->sortBy('order')->values()->all(),
                ];
            }),
            'timeline' => $timeline->paginate(75)->groupBy('date')->map(function ($items, $date) {
                return [
                    'date' => $items[0]->date,
                    'flights' => $items->groupBy(function ($item, $key) {
                        return $item->platform->position . '-' . $item->flight;
                    })->map(function ($flights) {
                        $_cur = $flights->first();
                        return [
                            'id' => $_cur->id,
                            'flight' => $_cur->flight,
                            'date' => $_cur->date,
                            'release' => [
                                'slug' => $_cur->releaseChannel->release->slug,
                                'version' => $_cur->releaseChannel->release->version,
                                'cversion' => $_cur->releaseChannel->release->canonical_version
                            ],
                            'release_channel' => $flights->map(function ($channels) {
                                return [
                                    'order' => $channels->releaseChannel->channel->order,
                                    'name' => $channels->releaseChannel->short_name,
                                    'color' => $channels->releaseChannel->channel->color
                                ];
                            })->sortBy('order')->values()->all(),
                            'platform' => [
                                'id' => $_cur->platform->id,
                                'slug' => $_cur->platform->slug,
                                'position' => $_cur->platform->position,
                                'icon' => $_cur->platform->icon,
                                'name' => $_cur->platform->name,
                                'tool' => $_cur->platform->tool,
                                'color' => $_cur->platform->color
                            ]
                        ];
                    })->groupBy(function ($item, $key) {
                        return $item['platform']['id'];
                    })->sortBy(function ($item, $key) {
                        return $item[0]['platform']['position'];
                    })->map(function ($platform) {
                        return $platform->sortByDesc(function ($item, $key) {
                            return $item['platform']['position'] . '.' . $item['flight'];
                        })->values()->all();
                    })->values()->all()
                ];
            }),
            'pagination' => $paginator,
            'status' => session('status')
        ]);
    }
}
