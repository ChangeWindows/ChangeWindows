<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Flag;
use App\Models\FlagStatus;
use App\Models\FlagContent;
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
        $this->authorize('flags.show');

        return Inertia::render('Admin/Flags/Index', [
            'can' => [
                'createFlags' => Auth::user()->can('flags.create'),
                'editFlags' => Auth::user()->can('flags.edit')
            ],
            'suggestion' => FlagContent::where('status', 1)->orderBy('created_at', 'asc')->with('flag', 'flag.latestContents')->first(),
            'status' => session('status')
        ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function history()
    {
        $this->authorize('flags.show');

        $flag_status = FlagStatus::orderBy('build', 'desc')->with('flag', 'flag.latestStatusChange', 'flag.flagStatus');
        $paginator = $flag_status->paginate(150)->onEachSide(2)->through(function () {
            return [];
        });

        return Inertia::render('Admin/Flags/History', [
            'can' => [
                'createFlags' => Auth::user()->can('flags.create'),
                'editFlags' => Auth::user()->can('flags.edit')
            ],
            'flagStatus' => $flag_status->paginate(150)->map(function ($flag_status) {
                $flag_status->flag->setRelation('latestStatusChange', $flag_status->flag->latestStatusChange->take(2));
                return $flag_status;
            }),
            'pagination' => $paginator,
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

                $flag = Flag::firstOrCreate([
                    'feature_name' => $flag_id_pair[0]
                ], [
                    'added' => request('build'),
                    'removed' => null
                ]);

                $active_flags = $active_flags->filter(function ($value, $key) use ($flag) {
                    return $value !== $flag->id;
                });

                if (!$flag->latestStatus || $flag->latestStatus && ($flag->latestStatus->status !== $flag_status_type || intval($flag->latestStatus->feature_id) !== intval($flag_id_pair[1]))) {
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

        foreach ($active_flags as $key => $flag_id) {
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

        return Redirect::route('admin.flags')->with('status', [
            'message' => 'Succesfully created flags for build '.request('build').'.',
            'type' => 'success'
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Permission  $permission
     * @return \Illuminate\Http\Response
     */
    public function moderateApprove(Request $request, FlagContent $flag_content)
    {
        $this->authorize('flags.edit');

        $flag_content->update([
            'status' => 2,
        ]);

        return Redirect::route('admin.flags')->with('status', [
            'message' => 'Succesfully applied content suggestion.',
            'type' => 'success'
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Permission  $permission
     * @return \Illuminate\Http\Response
     */
    public function moderateDiscard(Request $request, FlagContent $flag_content)
    {
        $this->authorize('flags.edit');

        $flag_content->update([
            'status' => 0,
        ]);

        return Redirect::route('admin.flags')->with('status', [
            'message' => 'Succesfully applied content suggestion.',
            'type' => 'success'
        ]);
    }
}
