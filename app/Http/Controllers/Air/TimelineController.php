<?php

namespace App\Http\Controllers\Air;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Platform;

class TimelineController extends Controller
{
    public function index(Platform $platform)
    {
        $platforms = Platform::orderBy('position')->get();
        return Inertia::render('Air/Timeline/Index', [
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
