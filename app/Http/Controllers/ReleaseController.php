<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Platform;
use App\Models\Release;
use App\Models\Flight;

class ReleaseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show(Platform $platform, Release $release)
    {
        $release->load('releaseChannels', 'releaseChannels.channel', 'releaseChannels.latestFlight');
        $timeline = Flight::with('releaseChannel.release')->orderBy('date', 'desc')
            ->join('release_channels as frs', function ($join) {
                $join->on('frs.id', '=', 'flights.release_channel_id')

                ->join('channels as fc', function ($join) {
                    $join->on('fc.id', '=', 'frs.channel_id');
                });
            })
            ->where('frs.release_id', '=', $release->id);
        $paginator = $timeline->paginate(75)->onEachSide(2);

        $prev = Release::where('platform_id', $release->platform->id)->where('canonical_version', '<', $release->canonical_version)->orderBy('canonical_version', 'desc')->first();
        $next = Release::where('platform_id', $release->platform->id)->where('canonical_version', '>', $release->canonical_version)->orderBy('canonical_version', 'asc')->first();

        return Inertia::render('Platforms/Release', [
            'platforms' => Platform::where('tool', 0)->orderBy('position')->get()->map(function ($_platform) {
                return [
                    'id' => $_platform->id,
                    'slug' => $_platform->slug,
                    'name' => $_platform->name,
                    'color' => $_platform->color,
                    'icon' => $_platform->icon,
                    'legacy' => $_platform->legacy
                ];
            }),
            'release' => $release->only('name', 'changelog', 'version', 'codename', 'start_preview', 'start_public', 'start_extended', 'start_lts', 'end_lts', 'ongoing'),
            'quickNav' => [
                'prev' => $prev ? [
                    'slug' => $prev->slug,
                    'version' => $prev->version
                ] : null,
                'next' => $next ? [
                    'slug' => $next->slug,
                    'version' => $next->version
                ] : null
            ],
            'platform' => $release->platform->only('color', 'icon', 'slug'),
            'channels' => $release->releaseChannels->map(function ($release_channel) {
                return [
                    'name' => $release_channel->short_name,
                    'order' => $release_channel->channel->order,
                    'color' => $release_channel->channel->color,
                    'disabled' => $release_channel->supported ? false : true,
                    'flight' => $release_channel->latestFlight ? [
                        'version' => $release_channel->latestFlight->flight,
                        'date' => $release_channel->latestFlight->date
                    ] : []
                ];
            })->sortBy('order')->values()->all(),
            'timeline' => $timeline->paginate(75)->sortByDesc('date')->groupBy('date')->map(function ($items, $date) use ($platform, $release) {
                return [
                    'date' => $date,
                    'flights' => $items->groupBy(function($item) {
                        return $item->flight.'-'.$item->platform->position;
                    })->map(function ($flights) use ($platform, $release) {
                        $_cur = $flights->first();
                        return [
                            'type' => 'flight',
                            'event_priority' => 3,
                            'id' => $_cur->id,
                            'flight' => $_cur->flight,
                            'date' => $_cur->date,
                            'version' => $release->version,
                            'cversion' => $release->canonical_version,
                            'release_channel' => $flights->map(function ($channels) {
                                return [
                                    'order' => $channels->releaseChannel->channel->order,
                                    'name' => $channels->releaseChannel->short_name,
                                    'color' => $channels->releaseChannel->channel->color
                                ];
                            })->sortBy('order')->values()->all(),
                            'platform' => [
                                'order' => $platform->order,
                                'icon' => $platform->icon,
                                'name' => $platform->name,
                                'tool' => $platform->tool,
                                'color' => $platform->color
                            ]
                        ];
                    })->sortByDesc(function ($item, $key) {
                        if ($item['type'] === 'flight') {
                            return $item['event_priority'].'.'.$item['flight'].'.'.$item['platform']['order'];
                        }

                        return $item['event_priority'].'.'.$item['platform']['order'];
                    })->values()->all()
                ];
            }),
            'pagination' => $paginator
        ]);
    }
}
