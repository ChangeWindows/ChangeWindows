<?php

namespace App\Http\Controllers\Admin;

use App\Models\Timeline;
use App\Models\Release;
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
            'pagination' => [
                'prev_page_url' => $timeline->previousPageUrl(),
                'next_page_url' => $timeline->nextPageUrl()
            ],
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
        $this->authorize('flights.create');

        $releases = Release::orderBy('platform_id')->orderBy('canonical_version')->get();

        return Inertia::render('Admin/Promotions/Create', [
            'urls' => [
                'store_promotion' => route('admin.promotions.store', [], false),
            ],
            'releases' => $releases->map(function ($release) {
                return [
                    'id' => $release->id,
                    'name' => $release->name,
                    'start_build' => $release->start_build,
                    'start_delta' => $release->start_delta,
                    'end_build' => $release->end_build,
                    'end_delta' => $release->end_delta,
                    'platform' => [
                        'icon' => $release->platform->icon,
                        'name' => $release->platform->name,
                        'color' => $release->platform->color
                    ],
                    'channels' => $release->releaseChannels->whereNull('promotion')->map(function ($channel) {
                        return [
                            'id' => $channel->id,
                            'name' => $channel->name,
                            'supported' => $channel->supported,
                            'color' => $channel->channel->color,
                            'order' => $channel->channel->order
                        ];
                    })->values()
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

        $promotion = Promotion::create([
            'release_channel_id' => request('channel')
        ]);

        Timeline::create([
            'date' => (new Carbon(request('date'))),
            'item_type' => Promotion::class,
            'item_id' => $promotion->id
        ]);

        return Redirect::route('admin.promotions')->with('status', 'Succesfully created this promotion.');
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
            'promotion' => [
                'date' => $promotion->timeline->date
            ],
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
