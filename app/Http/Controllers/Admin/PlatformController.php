<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Platform;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;
use Redirect;

class PlatformController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $this->authorize('platforms.show');

        return Inertia::render('Admin/Platforms/Index', [
            'can' => [
                'platforms' => [
                    'create' => Auth::user()->can('platforms.create'),
                ],
            ],
            'platforms' => Platform::orderBy('position')->get(),
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        $this->authorize('platforms.create');

        return Inertia::render('Admin/Platforms/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request)
    {
        $this->authorize('platforms.create');

        $platform = Platform::create([
            'name' => request('name'),
            'description' => request('description'),
            'position' => request('position'),
            'color' => request('color'),
            'icon' => request('icon'),
            'legacy' => request('legacy') ? 1 : 0,
            'active' => request('active') ? 1 : 0,
            'tool' => request('tool') ? 1 : 0,
        ]);

        return Redirect::route('admin.platforms.edit', $platform)->with('status', [
            'message' => 'Succesfully created this platform.',
            'type' => 'success',
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @return Response
     */
    public function show(Platform $platform)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @return Response
     */
    public function edit(Platform $platform)
    {
        $this->authorize('platforms.show');

        $platform->load('channels');

        return Inertia::render('Admin/Platforms/Edit', [
            'can' => [
                'platforms' => [
                    'edit' => Auth::user()->can('platforms.edit'),
                    'delete' => Auth::user()->can('platforms.delete'),
                ],
                'channels' => [
                    'create' => Auth::user()->can('channels.create'),
                    'edit' => Auth::user()->can('channels.edit'),
                ],
            ],
            'platform' => $platform,
            'channels' => $platform->channels->sortBy('order')->values()->all(),
            'status' => session('status'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @return Response
     */
    public function update(Request $request, Platform $platform)
    {
        $this->authorize('platforms.edit');

        $platform->update([
            'name' => request('name'),
            'description' => request('description'),
            'position' => request('position'),
            'color' => request('color'),
            'icon' => request('icon'),
            'legacy' => request('legacy') ? 1 : 0,
            'active' => request('active') ? 1 : 0,
            'tool' => request('tool') ? 1 : 0,
        ]);

        return Redirect::route('admin.platforms.edit', $platform)->with('status', [
            'message' => 'Succesfully updated the platform.',
            'type' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return Response
     */
    public function destroy(Platform $platform)
    {
        $this->authorize('platforms.delete');

        $platform->delete();

        return Redirect::route('admin.platforms')->with('status', [
            'message' => 'Succesfully deleted platform.',
            'type' => 'success',
        ]);
    }
}
