<?php

namespace App\Http\Controllers\Air;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Platform;
use App\Models\Flight;

class TimelineController extends Controller
{
    public function index(Platform $platform)
    {
        $platforms = Platform::orderBy('position')->get();
        $timeline = Flight::orderBy('date', 'desc')->with('releaseChannel', 'releaseChannel.release.platform', 'releaseChannel.release', 'releaseChannel.channel');
        $paginator = $timeline->paginate(75)->onEachSide(2);


        return Inertia::render('Air/Timeline/Index', [
            'flights' => $paginator->groupBy('date')->map(function ($items, $date) {
                return [
                    'date' => $items[0]->date,
                    'flights' => $items->groupBy(function ($item) {
                        return $item->releaseChannel->release->platform->position . '-' . $item->flight;
                    })->map(function ($flights) {
                        $_cur = $flights->first();

                        return [
                            'id' => $_cur->id,
                            'flight' => $_cur->flight,
                            'date' => $_cur->date,
                            'release' => $_cur->releaseChannel->release->only('slug', 'version', 'canonical_version'),
                            'release_channel' => $flights->map(function ($channels) {
                                return [
                                    'order' => $channels->releaseChannel->channel->order,
                                    'name' => $channels->releaseChannel->short_name,
                                    'color' => $channels->releaseChannel->channel->color
                                ];
                            })->sortBy('order')->values()->all(),
                            'platform' => $_cur->releaseChannel->release->platform->only('id', 'slug', 'position', 'icon', 'name', 'tool', 'color')
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
            'platform' => $platform->id ? $platform : null,
            'platforms' => $platforms->filter(function ($value) use ($platform) {
                return $value->legacy === 0 && $value->tool === 0 || $value->slug === $platform->slug;
            })->map(function ($platform) {
                return [
                    'id' => $platform->id,
                    'slug' => $platform->slug,
                    'name' => $platform->name,
                    'color' => $platform->color,
                    'icon' => $platform->icon
                ];
            })->values(),
            'legacyPlatforms' => $platforms->filter(function ($value) {
                return $value->legacy === 1 || $value->tool === 1;
            })->map(function ($platform) {
                return [
                    'id' => $platform->id,
                    'slug' => $platform->slug,
                    'name' => $platform->name,
                    'color' => $platform->color,
                    'icon' => $platform->icon
                ];
            })->values()
        ]);
    }
}
