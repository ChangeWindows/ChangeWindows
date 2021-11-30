<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Release;
use Illuminate\Http\Request;
use Spatie\Searchable\Search;

class SearchController extends Controller
{
    public function index() {
        return Inertia::render('Search/Index');
    }

    public function results(Request $request) {
        if (!$request->input('search')) {
            return redirect()->route('front.search');
        }

        $search_results = (new Search())
            ->registerModel(Release::class, 'name', 'version', 'canonical_version', 'codename')
            ->perform($request->input('search'));

        return Inertia::render('Search/Results', [
            'query' => $request->input('search'),
            'results' => $search_results->map(function ($result) {
                return [
                    'title' => $result->title,
                    'url' => $result->url,
                    'type' => $result->type,
                    'searchable' => [
                        'name' => $result->searchable->name,
                        'version' => $result->searchable->version,
                        'codename' => $result->searchable->codename,
                        'url' => $result->searchable->url,
                        'platform' => [
                            'icon' => $result->searchable->platform->icon,
                            'name' => $result->searchable->platform->name,
                            'color' => $result->searchable->platform->color,
                            'tool' => $result->searchable->platform->tool
                        ],
                        'channels' => $result->searchable->releaseChannels->where('supported')->map(function ($channel) {
                            return [
                                'id' => $channel->id,
                                'short_name' => $channel->short_name,
                                'supported' => $channel->supported,
                                'color' => $channel->channel->color,
                                'order' => $channel->channel->order
                            ];
                        })->values()->all()
                    ]
                ];
            })
        ]);
    }
}
