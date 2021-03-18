<?php

namespace App\Http\Controllers\Admin;

use App\Models\Platform;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Auth;
use URL;
use Redirect;
use Illuminate\Support\Collection;

class PlatformController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('platforms.show');

        return Inertia::render('Admin/Platforms/Show', [
            'can' => [
                'create_platforms' => Auth::user()->can('platforms.create'),
                'edit_platforms' => Auth::user()->can('platforms.edit')
            ],
            'platforms' => Platform::orderBy('position')->paginate(50)->map(function ($platform) {
                return [
                    'id' => $platform->id,
                    'name' => $platform->name,
                    'color' => $platform->color,
                    'icon' => $platform->icon,
                    'legacy' => $platform->legacy,
                    'active' => $platform->active,
                    'editUrl' => URL::route('admin.platforms.edit', $platform)
                ];
            }),
            'createUrl' => URL::route('admin.platforms.create'),
            'status' => session('status')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Platform  $platform
     * @return \Illuminate\Http\Response
     */
    public function show(Platform $platform)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Platform  $platform
     * @return \Illuminate\Http\Response
     */
    public function edit(Platform $platform)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Platform  $platform
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Platform $platform)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Platform  $platform
     * @return \Illuminate\Http\Response
     */
    public function destroy(Platform $platform)
    {
        //
    }
}
