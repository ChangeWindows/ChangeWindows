<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Platform;
use App\Models\Timeline;

class ChannelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $channel_platforms = Platform::orderBy('position')->where('active', '=', '1')->get();

        return Inertia::render('Channels/Index', [
            'platforms' => Platform::where('tool', 0)->orderBy('position')->get()->map(function ($_platform) {
                return [
                    'id' => $_platform->id,
                    'name' => $_platform->name,
                    'color' => $_platform->color,
                    'icon' => $_platform->icon,
                    'legacy' => $_platform->legacy,
                    'url' => route('front.channels.show', $_platform, false)
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
                                if (count($_channel->flights) > 0) {
                                    return [
                                        'version' => $_channel->flights[0]->flight,
                                        'date' => $_channel->flights[0]->timeline->date
                                    ];
                                }
                            })->where('version', '<>', null)->values()->all()
                        ];
                    })->sortBy('order')->values()->all(),
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
        return Inertia::render('Channels/Show', [
            'platforms' => Platform::where('tool', 0)->orderBy('position')->get()->map(function ($_platform) {
                return [
                    'id' => $_platform->id,
                    'name' => $_platform->name,
                    'color' => $_platform->color,
                    'icon' => $_platform->icon,
                    'legacy' => $_platform->legacy,
                    'url' => route('front.channels.show', $_platform, false)
                ];
            }),
            'platform' => $platform,
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
                        if (count($_channel->flights) > 0) {
                            return [
                                'version' => $_channel->flights[0]->flight,
                                'date' => $_channel->flights[0]->timeline->date
                            ];
                        }
                    })->where('version', '<>', null)->values()->all()
                ];
            })->sortBy('order')->values()->all(),
            'releases' => $platform->releases->sortByDesc('canonical_version')->map(function ($release) {
                return [
                    'name' => $release->name,
                    'version' => $release->version,
                    'codename' => $release->codename,
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
                            'edit_url' => $_cur_flight->entry->edit_url
                        ];
                    })->values()->all()
                ];
            })
        ]);
    }
}
