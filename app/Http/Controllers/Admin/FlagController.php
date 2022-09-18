<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Flag;
use App\Models\FlagStatus;
use Auth;
use Redirect;
use File;
use Illuminate\Support\Str;

class FlagController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('flights.show');

        $flag_status = FlagStatus::orderBy('build', 'desc')->with('flag', 'flag.latestStatusChange', 'flag.flagStatus');
        $paginator = $flag_status->paginate(150)->onEachSide(2)->through(function () {
            return [];
        });

        return Inertia::render('Admin/Flags/Show', [
            'can' => [
                'create_flights' => Auth::user()->can('flights.create'),
                'edit_flights' => Auth::user()->can('flights.edit')
            ],
            'flagStatus' => $flag_status->paginate(150)->map(function ($flag_status) {
                $flag_status->flag->setRelation('latestStatusChange', $flag_status->flag->latestStatusChange->take(2));
                return $flag_status;
            }),
            'pagination' => $paginator,
            'createUrl' => route('admin.flags.create', [], false),
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
        $this->authorize('flights.edit');

        $this->validate(request(), [
            'build' => ['required']
        ], [
            'build.required' => 'A build is required.'
        ]);

        $flag_status_type = 'unknown';

        $active_flags = collect(Flag::select('id')->where('removed', null)->pluck('id')->toArray());

        foreach (explode("\n", File::get($request->file[0])) as $key => $line) {
            if ($line === '') {
                continue;
            }

            if (Str::contains($line, '##')) {
                $flag_status_type = Str::slug(preg_replace('/[^a-zA-Z ]/', '', $line));
            } else if (Str::contains($line, ': ')) {
                $flag_id_pair = explode(': ', trim($line));

                // XAMLAppResolver appears twice in Mach2 logs
                if ($flag_id_pair[0] === 'XAMLAppResolver' && intval($flag_id_pair[1]) === 0) {
                    continue;
                }

                $flag = Flag::where('feature_name', $flag_id_pair[0])->first();

                $flag = Flag::firstOrCreate([
                    'feature_name' => $flag_id_pair[0]
                ], [
                    'name' => $flag_id_pair[0],
                    'description' => '',
                    'added' => request('build'),
                    'removed' => null
                ]);

                $active_flags = $active_flags->filter(function ($value, $key) use($flag) {
                    return $value !== $flag->id;
                });

                if (!$flag->latestStatus || $flag->latestStatus && ($flag->latestStatus->status !== $flag_status_type || $flag->latestStatus->feature_id !== intval($flag_id_pair[1]))) {
                    $flag->flagStatus()->create([
                        'build' => request('build'),
                        'feature_id' => intval($flag_id_pair[1]),
                        'status' => $flag_status_type
                    ]);

                    // We just added a new status, if the flag was previously removed, we should reset removed
                    if ($flag->removed) {
                        $flag->update([
                            'removed' => null
                        ]);
                    }
                }
            }
        }

        foreach($active_flags as $key => $flag_id) {
            $flag = Flag::find($flag_id);

            $flag->update([
                'removed' => request('build')
            ]);

            $flag->flagStatus()->create([
                'build' => request('build'),
                'feature_id' => null,
                'status' => 'removed'
            ]);
        }

        return Redirect::route('admin.flags')->with('status', 'Succesfully created flags.');
    }
}
