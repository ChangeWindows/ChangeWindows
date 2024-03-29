<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Release;
use App\Models\Flag;
use Illuminate\Http\Request;
use Spatie\Searchable\Search;
use Spatie\Searchable\ModelSearchAspect;

class SearchController extends Controller
{
    public function index()
    {
        return Inertia::render('Search/Index');
    }

    public function results(Request $request)
    {
        if (!$request->input('search')) {
            return redirect()->route('front.search');
        }

        $search_results = (new Search())
            ->registerModel(Release::class, function (ModelSearchAspect $modelSearchAspect) {
                $modelSearchAspect
                    ->addSearchableAttribute('name')
                    ->addSearchableAttribute('codename')
                    ->addSearchableAttribute('description')
                    ->addSearchableAttribute('changelog')
                    ->addExactSearchableAttribute('version')
                    ->addExactSearchableAttribute('canonical_version');
            })
            ->perform($request->input('search'));

        return Inertia::render('Search/Results', [
            'query' => $request->input('search'),
            'results' => $search_results->map(function ($result) {
                return [
                    'title' => $result->title,
                    'type' => $result->type,
                    'searchable' => [
                        'slug' => $result->searchable->slug,
                        'name' => $result->searchable->name,
                        'version' => $result->searchable->version,
                        'codename' => $result->searchable->codename,
                        'platform' => [
                            'slug' => $result->searchable->platform->slug,
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

    public function flagResults(Request $request)
    {
        if (!$request->input('search')) {
            return redirect()->route('front.search');
        }

        $term = mb_strtolower($request->input('search'));

        $search_results = (new Search())
            ->registerModel(
                Flag::class,
                function (ModelSearchAspect $modelSearchAspect) use ($term) {
                    $modelSearchAspect
                        ->addSearchableAttribute('feature_name')
                        ->orWhereHas('latestContents', function ($query) use ($term) {
                            $query->whereRaw('LOWER(name) LIKE ?', ["%{$term}%"])
                                ->orWhereRaw('LOWER(description) LIKE ?', ["%{$term}%"]);
                        })
                        ->orWhereHas('latestStatus', function ($query) use ($term) {
                            $query->whereRaw('LOWER(feature_id) LIKE ?', ["%{$term}%"]);
                        })
                        ->with('latestContents', 'latestStatus');
                }
            )
            ->perform($request->input('search'));

        return Inertia::render('Search/FlagResults', [
            'query' => $request->input('search'),
            'results' => $search_results->map(function ($result) {
                return [
                    'title' => $result->title,
                    'type' => $result->type,
                    'searchable' => [
                        'slug' => $result->searchable->slug,
                        'description' => $result->searchable->latestContents?->description,
                        'status' => $result->searchable->latestStatus
                    ]
                ];
            })
        ]);
    }
}
