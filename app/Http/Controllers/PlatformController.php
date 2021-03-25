<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Platform;

class PlatformController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show(Platform $platform)
    {
        return Inertia::render('Platforms/Show', [
            'platforms' => Platform::where('tool', 0)->orderBy('position')->paginate(50)->map(function ($platform) {
                return [
                    'id' => $platform->id,
                    'name' => $platform->name,
                    'color' => $platform->color,
                    'icon' => $platform->icon,
                    'legacy' => $platform->legacy,
                    'url' => route('front.platforms.show', $platform, false)
                ];
            }),
            'platform' => $platform,
            'status' => session('status')
        ]);
    }
}
