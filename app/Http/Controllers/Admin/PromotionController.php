<?php

namespace App\Http\Controllers\Admin;

use App\Models\Timeline;
use App\Models\Promotion;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Auth;
use Redirect;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use App\Http\Controllers\Controller;

class PromotionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('flights.show');

        $timeline = Timeline::where('item_type', Promotion::class)->orderBy('date', 'desc')->paginate(100);

        return Inertia::render('Admin/Promotions/Show', [
            'can' => [
                'create_promotions' => Auth::user()->can('flights.create'),
                'edit_promotions' => Auth::user()->can('flights.edit')
            ],
            'timeline' => $timeline->groupBy('date')->map(function ($items, $date) {
                return [
                    'date' => $items[0]->date,
                    'promotions' => $items->map(function ($promotion) {
                        return [
                            'id' => $promotion->item->id,
                            'version' => $promotion->item->releaseChannel->release->version,
                            'date' => $promotion->item->timeline->date,
                            'release_channel' => [
                                'name' => $promotion->item->releaseChannel->short_name,
                                'color' => $promotion->item->releaseChannel->channel->color
                            ],
                            'platform' => [
                                'icon' => $promotion->item->platform->icon,
                                'name' => $promotion->item->platform->name,
                                'color' => $promotion->item->platform->color
                            ],
                            'edit_url' => $promotion->item->edit_url
                        ];
                    })
                ];
            }),
            'pagination' => $timeline,
            'createUrl' => route('admin.promotions.create', [], false),
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
     * @param  \App\Models\Promotion  $promotion
     * @return \Illuminate\Http\Response
     */
    public function show(Promotion $promotion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Promotion  $promotion
     * @return \Illuminate\Http\Response
     */
    public function edit(Promotion $promotion)
    {
        $this->authorize('flights.show');

        return Inertia::render('Admin/Promotions/Edit', [
            'can' => [
                'edit_promotions' => Auth::user()->can('flights.edit'),
                'delete_promotions' => Auth::user()->can('flights.delete')
            ],
            'urls' => [
                'update_promotion' => route('admin.promotions.update', $promotion, false),
                'destroy_promotion' => route('admin.promotions.destroy', $promotion, false)
            ],
            'promotion' => $promotion,
            'release' => [
                'version' => $promotion->releaseChannel->release->version
            ],
            'platform' => [
                'icon' => $promotion->releaseChannel->channel->platform->icon,
                'name' => $promotion->releaseChannel->channel->platform->name,
                'color' => $promotion->releaseChannel->channel->platform->color
            ],
            'release_channel' => [
                'name' => $promotion->releaseChannel->short_name,
                'color' => $promotion->releaseChannel->channel->color
            ],
            'date' => $promotion->timeline,
            'status' => session('status')
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Promotion  $promotion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Promotion $promotion)
    {
        $this->authorize('flights.edit');

        $promotion->timeline->update([
            'date' => (new Carbon(request('date')))
        ]);

        return Redirect::route('admin.promotions.edit', $promotion)->with('status', 'Succesfully updated the promotion.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Promotion  $promotion
     * @return \Illuminate\Http\Response
     */
    public function destroy(Promotion $promotion)
    {
        $this->authorize('flights.delete');

        $promotion->timeline->delete();
        $promotion->delete();

        return Redirect::route('admin.promotions')->with('status', 'Succesfully deleted promotion.');
    }
}
