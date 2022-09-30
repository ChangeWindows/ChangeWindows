<?php

namespace App\Http\Controllers\Admin;

use App\Models\Timeline;
use App\Models\Release;
use App\Models\Launch;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Auth;
use Redirect;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use App\Http\Controllers\Controller;

class LaunchController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('flights.show');

        $timeline = Timeline::where('item_type', Launch::class)->orderBy('date', 'desc');
        $paginator = $timeline->paginate(100)->onEachSide(2)->through(function () {
            return [];
        });

        return Inertia::render('Admin/Launches/Show', [
            'can' => [
                'create_launches' => Auth::user()->can('flights.create'),
                'edit_launches' => Auth::user()->can('flights.edit')
            ],
            'timeline' => $timeline->paginate(100)->groupBy('date')->map(function ($items, $date) {
                return [
                    'date' => $items[0]->date,
                    'launches' => $items->map(function ($launch) {
                        return [
                            'id' => $launch->item->id,
                            'version' => $launch->item->release->version,
                            'date' => $launch->item->timeline->date,
                            'platform' => [
                                'icon' => $launch->item->release->platform->icon,
                                'name' => $launch->item->release->platform->name,
                                'color' => $launch->item->release->platform->color
                            ]
                        ];
                    })
                ];
            }),
            'pagination' => $paginator,
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
        $this->authorize('flights.create');

        $releases = Release::orderBy('platform_id')->orderBy('canonical_version')->get();

        return Inertia::render('Admin/Launches/Create', [
            'releases' => $releases->whereNull('launch')->values()->map(function ($release) {
                return [
                    'id' => $release->id,
                    'name' => $release->name,
                    'version' => $release->version,
                    'codename' => $release->codename,
                    'start_build' => $release->start_build,
                    'start_delta' => $release->start_delta,
                    'end_build' => $release->end_build,
                    'end_delta' => $release->end_delta,
                    'platform' => [
                        'icon' => $release->platform->icon,
                        'name' => $release->platform->name,
                        'color' => $release->platform->color
                    ]
                ];
            })
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->authorize('flights.create');

        $launch = Launch::create([
            'release_id' => request('release')
        ]);

        Timeline::create([
            'date' => (new Carbon(request('date'))),
            'item_type' => Launch::class,
            'item_id' => $launch->id
        ]);

        return Redirect::route('admin.launches')->with('status', 'Succesfully created this launch.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Launch  $launch
     * @return \Illuminate\Http\Response
     */
    public function show(Launch $launch)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Launch  $launch
     * @return \Illuminate\Http\Response
     */
    public function edit(Launch $launch)
    {
        $this->authorize('flights.show');

        return Inertia::render('Admin/Launches/Edit', [
            'can' => [
                'edit_launches' => Auth::user()->can('flights.edit'),
                'delete_launches' => Auth::user()->can('flights.delete')
            ],
            'launch' => [
                'id' => $launch->id,
                'date' => $launch->timeline->date
            ],
            'release' => [
                'version' => $launch->release->version
            ],
            'platform' => [
                'icon' => $launch->release->platform->icon,
                'name' => $launch->release->platform->name,
                'color' => $launch->release->platform->color
            ],
            'date' => $launch->timeline,
            'status' => session('status')
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Launch  $launch
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Launch $launch)
    {
        $this->authorize('flights.edit');

        $launch->timeline->update([
            'date' => (new Carbon(request('date')))
        ]);

        return Redirect::route('admin.launches.edit', $launch)->with('status', 'Succesfully updated the launch.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Launch  $launch
     * @return \Illuminate\Http\Response
     */
    public function destroy(Launch $launch)
    {
        $this->authorize('flights.delete');

        $launch->timeline->delete();
        $launch->delete();

        return Redirect::route('admin.launches')->with('status', 'Succesfully deleted launch.');
    }
}
