<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Platform;

class ChannelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $channel_platforms = Platform::with('activeChannels', 'activeChannels.activeReleaseChannels', 'activeChannels.activeReleaseChannels.latestFlight')->orderBy('tool')->orderBy('position')->where('active', '=', '1')->get();

        return Inertia::render('Channels/Index', [
            'platforms' => Platform::where('tool', 0)->orderBy('position')->get()->map(function ($_platform) {
                return [
                    'id' => $_platform->id,
                    'slug' => $_platform->slug,
                    'name' => $_platform->name,
                    'color' => $_platform->color,
                    'icon' => $_platform->icon,
                    'legacy' => $_platform->legacy,
                ];
            }),
            'channel_platforms' => $channel_platforms->map(function ($platform) {
                return [
                    'slug' => $platform->slug,
                    'name' => $platform->name,
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
        $platform->load('releases', 'releases.releaseChannels', 'releases.releaseChannels.channel', 'releases.releaseChannels.latestFlight');

        return Inertia::render('Channels/Show', [
            'platforms' => Platform::where('tool', 0)->orderBy('position')->get()->map(function ($_platform) {
                return [
                    'id' => $_platform->id,
                    'slug' => $_platform->slug,
                    'name' => $_platform->name,
                    'color' => $_platform->color,
                    'icon' => $_platform->icon,
                    'legacy' => $_platform->legacy,
                ];
            }),
            'platform' => [
                'slug' => $platform->slug,
                'name' => $platform->name,
                'icon' => $platform->icon,
                'color' => $platform->color
            ],
            'channel_order' => $platform->channels->sortBy('order')->map(function ($channel) {
                return [
                    'id' => $channel->id,
                    'active' => $channel->active
                ];
            })->values()->all(),
            'releases' => $platform->releases->sortByDesc('canonical_version')->map(function ($release) use ($platform) {
                return [
                    'name' => $release->name,
                    'slug' => $release->slug,
                    'version' => $release->version,
                    'codename' => $release->codename,
                    'platform' => [
                        'icon' => $platform->icon,
                        'name' => $platform->name,
                        'color' => $platform->color,
                        'tool' => $platform->tool
                    ],
                    'channels' => $release->releaseChannels->map(function ($channel) {
                        return [
                            'id' => $channel->id,
                            'name' => $channel->short_name,
                            'supported' => $channel->supported,
                            'color' => $channel->channel->color,
                            'order' => $channel->channel->order,
                            'channel_id' => $channel->channel->id,
                            'flight' => $channel->latestFlight ? [
                                'version' => $channel->latestFlight->flight,
                                'date' => $channel->latestFlight->date
                            ] : null
                        ];
                    })->values()->all()
                ];
            })->values()->all(),
        ]);
    }
}
