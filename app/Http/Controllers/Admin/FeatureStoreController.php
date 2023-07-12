<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Auth;
use Redirect;
use App\Models\Feature;
use App\Models\FeatureContent;
use File;
use Illuminate\Support\Str;

class FeatureStoreController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('flags.show');

        return Inertia::render('Admin/Features/Index', [
            'can' => [
                'features' => [
                    'create' => Auth::user()->can('flags.create'),
                    'edit' => Auth::user()->can('flags.edit')
                ]
            ],
            'suggestion' => FeatureContent::where('status', 1)->orderBy('created_at', 'asc')->with('feature', 'feature.latestContents')->first(),
            'status' => session('status')
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function batch(Request $request)
    {
        $this->authorize('flags.edit');

        $this->validate(request(), [
            'build' => ['required']
        ], [
            'build.required' => 'A build is required.'
        ]);

        $feature_status_type = 'unknown';

        foreach (explode("\n", File::get($request->file[0])) as $key => $line) {
            if ($line === '') {
                continue;
            }

            if (Str::contains($line, '##')) {
                $feature_status_type = Str::slug(preg_replace('/[^a-zA-Z ]/', '', $line));
            } else if (Str::contains($line, ': ')) {
                $feature_id_pair = explode(': ', trim($line));

                // XAMLAppResolver appears twice in Mach2 logs
                if ($feature_id_pair[0] === 'XAMLAppResolver' && intval($feature_id_pair[1]) === 0) {
                    continue;
                }

                $flag = Feature::firstOrCreate([
                    'f_name' => $feature_id_pair[0]
                ]);

                $flag->featureStatus()->create([
                    'build' => request('build'),
                    'f_id' => intval($feature_id_pair[1]),
                    'status' => $feature_status_type
                ]);
            }
        }

        return Redirect::route('admin.features')->with('status', [
            'message' => 'Succesfully created features for build ' . request('build') . '.',
            'type' => 'success'
        ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function direct()
    {
        $this->authorize('flags.show');

        $features = Feature::orderBy('f_name')->with('latestStatus');
        $paginator = $features->paginate(150)->onEachSide(2)->through(function () {
            return [];
        });

        return Inertia::render('Admin/Features/Directory', [
            'can' => [
                'features' => [
                    'create' => Auth::user()->can('flags.create'),
                    'edit' => Auth::user()->can('flags.edit')
                ]
            ],
            'features' => $features->paginate(150)->map(function ($feature) {
                return [
                    'featureName' => $feature->f_name,
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
    public function edit(Feature $feature)
    {
        $this->authorize('flags.edit');

        return Inertia::render('Admin/Features/Edit', [
            'can' => [
                'features' => [
                    'create' => Auth::user()->can('flags.create'),
                    'edit' => Auth::user()->can('flags.edit')
                ]
            ],
            'feature' => [
                'id' => $feature->id,
                'slug' => $feature->slug,
                'name' => $feature->f_name,
                'featureName' => $feature->latestContents ? $feature->latestContents->name : '',
                'description' => $feature->latestContents ? $feature->latestContents->description : ''
            ],
            'status' => session('status')
        ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Feature $feature)
    {
        $this->authorize('flags.edit');

        $feature->update([
            'name' => $request->name
        ]);

        $feature->featureContents()->create([
            'name' => $request->featureName,
            'description' => $request->description,
            'status' => 2,
            'user_id' => Auth::user()->id
        ]);

        return Redirect::route('admin.features')->with('status', [
            'message' => 'Succesfully updated feature content for ' . request('name') . '.',
            'type' => 'success'
        ]);
    }
}
