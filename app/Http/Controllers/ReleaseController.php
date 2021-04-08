<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Redirect;
use App\Models\Platform;
use App\Models\Release;

class ReleaseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Releases/Index', [
            'releases' => Release::orderBy('canonical_version', 'desc')->orderBy('platform_id', 'asc')->get()->map(function ($release) {
                return [
                    'name' => $release->name,
                    'version' => $release->version,
                    'codename' => $release->codename,
                    'start_public' => $release->start_public,
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
        ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show(Release $release)
    {
        return Inertia::render('Releases/Show', [
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
            'release' => $release,
            'platform' => $release->platform,
            'channels' => $release->releaseChannels->map(function ($release_channel) {
                return [
                    'name' => $release_channel->short_name,
                    'order' => $release_channel->channel->order,
                    'color' => $release_channel->channel->color,
                    'disabled' => $release_channel->supported ? false : true,
                    'flight' => $release_channel->latest ? [
                        'version' => $release_channel->latest->flight,
                        'date' => $release_channel->latest->timeline->date
                    ] : []
                ];
            })->sortBy('order')->values()->all(),
            'timeline' => $release->timeline->sortByDesc('date')->groupBy('date')->map(function ($items, $date) {
                return [
                    'date' => $items[0]->date,
                    'flights' => $items->map(function ($flight) {
                        return [
                            'id' => $flight->entry->id,
                            'flight' => $flight->entry->flight,
                            'date' => $flight->entry->timeline->date,
                            'version' => $flight->entry->releaseChannel->release->version,
                            'release_channel' => [
                                'name' => $flight->entry->releaseChannel->short_name,
                                'color' => $flight->entry->releaseChannel->channel->color
                            ],
                            'platform' => [
                                'icon' => $flight->entry->platform->icon,
                                'name' => $flight->entry->platform->name,
                                'color' => $flight->entry->platform->color
                            ],
                            'edit_url' => $flight->entry->edit_url
                        ];
                    })
                ];
            })
        ]);
    }
}
