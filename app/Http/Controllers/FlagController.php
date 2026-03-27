<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Flag;
use App\Models\FlagStatus;
use App\Models\FlagContent;
use Auth;
use Redirect;
use File;
use Illuminate\Support\Str;
use App\Http\Requests\FlagContentRequest;

class FlagController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $flag_status = FlagStatus::orderBy('build', 'desc')->with('flag', 'flag.latestStatusChange', 'flag.flagStatus');
        $paginator = $flag_status->paginate(100)->onEachSide(1)->through(function () {
            return [];
        });

        return Inertia::render('Flags/Index', [
            'flagStatus' => $flag_status->paginate(100)->groupBy('build')->map(function ($flag_status) {

                return [
                    'build' => $flag_status[0]->build,
                    'changes' => $flag_status->map(function ($status, $key) {
                        return [
                            'flag_id' => $status->flag_id,
                            'feature_id' => $status->feature_id,
                            'build' => $status->build,
                            'status' => $status->status,
                            'flag' => $status->flag,
                            'previousStatus' => $status->flag->flagStatus->where('build', '<', $status->build)->sortByDesc('build')->first()
                        ];
                    })
                ];
            })->values(),
            'pagination' => $paginator
        ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function active()
    {
        $flags = Flag::orderBy('feature_name', 'asc')->where('removed', null)->with('latestStatus');
        $paginator = $flags->paginate(100)->onEachSide(1)->through(function () {
            return [];
        });

        return Inertia::render('Flags/Active', [
            'flags' => $flags->paginate(100),
            'pagination' => $paginator
        ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function removed()
    {
        $flags = Flag::orderBy('feature_name', 'asc')->where('removed', '<>', null)->with('latestStatus');
        $paginator = $flags->paginate(100)->onEachSide(1)->through(function () {
            return [];
        });

        return Inertia::render('Flags/Removed', [
            'flags' => $flags->paginate(100),
            'pagination' => $paginator
        ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show(Flag $flag)
    {
        $user = Auth::user();

        $flag_content_query = FlagContent::where('flag_id', $flag->id)
            ->where('status', 1);

        if ($user) {
            $flag_content_query->where('user_id', $user->id);
        } else {
            $flag_content_query->whereNull('user_id');
        }

        return Inertia::render('Flags/Show', [
            'flag' => Flag::where('feature_name', $flag->feature_name)->with('flagStatus', 'latestContents')->first(),
            'flagContent' => $flag_content_query->first(),
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
        return Inertia::render('Flags/About');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function suggestion(Flag $flag, FlagContentRequest $request)
    {
        $flag->flagContents()->create(
            array_merge(
                $request->validated(),
                [
                    'status' => 1,
                    'user_id' => Auth::user() ? Auth::user()->id : null
                ]
            )
        );

        return Redirect::route('front.flags.show', $flag)->with('status', [
            'message' => 'Your suggestion has been saved.',
            'type' => 'success'
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function suggestionPatch(Flag $flag, FlagContent $flag_content, FlagContentRequest $flag_content_request)
    {
        if ($flag_content->status !== 1) {
            $flag->flagContents()->create(
                array_merge(
                    $flag_content_request->validated(),
                    [
                        'status' => 1,
                        'user_id' => Auth::user() ? Auth::user()->id : null
                    ]
                )
            );

            return Redirect::route('front.flags.show', $flag)->with('status', [
                'message' => 'The suggestion your are trying to edit was already moderated. We created a new suggestion instead.',
                'type' => 'success'
            ]);
        }

        $flag_content->update($flag_content_request->validated());

        return Redirect::route('front.flags.show', $flag)->with('status', [
            'message' => 'Your suggestion has been saved.',
            'type' => 'success'
        ]);
    }
}
