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
        return Inertia::render('Air/Timeline/Index', [
            'platform' => $platform->id ? $platform : null,
            'platforms' => Platform::orderBy('position')->where('legacy', 0)->where('tool', 0)->orWhere('slug', $platform->slug)->get()->map(function ($platform) {
                return [
                    'id' => $platform->id,
                    'slug' => $platform->slug,
                    'name' => $platform->name,
                    'color' => $platform->color,
                    'icon' => $platform->icon
                ];
            }),
            'legacyPlatforms' => Platform::orderBy('position')->where('legacy', 1)->orWhere('tool', 1)->get()->map(function ($platform) {
                return [
                    'id' => $platform->id,
                    'slug' => $platform->slug,
                    'name' => $platform->name,
                    'color' => $platform->color,
                    'icon' => $platform->icon
                ];
            })
        ]);
    }
}
