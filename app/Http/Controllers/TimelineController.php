<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Platform;

class TimelineController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $channel_platforms = Platform::orderBy('position')->where('active', '=', '1')->get();

        return Inertia::render('Timeline/Show', [
            'platforms' => Platform::orderBy('position')->get()->map(function ($platform) {
                return [
                    'name' => $platform->name,
                    'color' => $platform->color,
                    'icon' => $platform->icon,
                    'legacy' => $platform->legacy,
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
}
