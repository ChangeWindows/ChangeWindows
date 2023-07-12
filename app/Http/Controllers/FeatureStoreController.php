<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Feature;
use Auth;

class FeatureStoreController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $features = Feature::orderBy('f_name')->with('latestStatus');
        $paginator = $features->paginate(150)->onEachSide(2)->through(function () {
            return [];
        });

        return Inertia::render('Features/Index', [
            'can' => [
                'features' => [
                    'create' => Auth::user()->can('flags.create'),
                    'edit' => Auth::user()->can('flags.edit')
                ]
            ],
            'features' => $features->paginate(150)->map(function ($feature) {
                return [
                    'featureName' => $feature->f_name,
                    'id' => $feature->id,
                    'slug' => $feature->slug,
                    'latest' => [
                        'featureId' => $feature->latestStatus->f_id,
                        'status' => $feature->latestStatus->status,
                        'build' => $feature->latestStatus->build
                    ]
                ];
            }),
            'pagination' => $paginator,
            'status' => session('status')
        ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function about()
    {
        return Inertia::render('Features/About');
    }
}
