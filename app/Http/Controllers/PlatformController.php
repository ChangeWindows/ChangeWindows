<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Redirect;
use App\Models\Platform;
use App\Models\Timeline;
use Illuminate\Database\Eloquent\Builder;

class PlatformController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $platform = Platform::first();
        Redirect::route('front.platforms.show', ['platform' => $platform]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show(Platform $platform)
    {
        return Inertia::render('Platforms/Show', [
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
            'platform' => $platform->only('name', 'description', 'icon', 'color', 'slug'),
            'channels' => $platform->activeChannels->map(function ($channel) {
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
                                'release' => [
                                    'slug' => $_channel->release->slug
                                ]
                            ];
                        }
                    })->where('version', '<>', null)->values()->all()
                ];
            })->sortBy('order')->values()->all(),
            'releases' => $platform->releases->sortByDesc('canonical_version')->map(function ($release) use ($platform) {
                return [
                    'name' => $release->name,
                    'slug' => $release->slug,
                    'version' => $release->version,
                    'codename' => $release->codename,
                    'dates' => [
                        'start_preview' => $release->start_preview,
                        'start_public' => $release->start_public,
                        'start_extended' => $release->start_extended,
                        'start_lts' => $release->start_lts,
                        'end_lts' => $release->end_lts,
                        'ongoing' => $release->ongoing
                    ],
                    'platform' => [
                        'icon' => $platform->icon,
                        'name' => $platform->name,
                        'color' => $platform->color,
                        'tool' => $platform->tool
                    ],
                    'latest_flight' => $release->latest->flight,
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
            'packages' => $platform->packages->sortBy('name')->map(function ($release) use ($platform) {
                return [
                    'name' => $release->name,
                    'slug' => $release->slug,
                    'platform' => [
                        'icon' => $platform->icon,
                        'name' => $platform->name,
                        'color' => $platform->color,
                        'tool' => $platform->tool
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
            })->values()->all()
        ]);
    }
}
