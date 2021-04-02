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
            'status' => session('status')
        ]);
    }
}
