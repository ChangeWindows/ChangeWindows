<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Redirect;
use App\Models\Platform;

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
                    'name' => $_platform->name,
                    'color' => $_platform->color,
                    'icon' => $_platform->icon,
                    'legacy' => $_platform->legacy,
                    'url' => route('front.platforms.show', $_platform, false)
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
                    'platform' => [
                        'icon' => $release->platform->icon,
                        'name' => $release->platform->name,
                        'color' => $release->platform->color
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
            'status' => session('status')
        ]);
    }
}
