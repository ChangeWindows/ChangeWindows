<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Redirect;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $this->authorize('users.show');

        return Inertia::render('Admin/Users/Index', [
            'can' => [
                'users' => [
                    'create' => Auth::user()->can('users.create'),
                    'edit' => Auth::user()->can('users.edit'),
                ],
            ],
            'users' => User::orderBy('name')->get()->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ];
            }),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @return Response
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @return Response
     */
    public function edit(User $user)
    {
        $this->authorize('users.show');

        return Inertia::render('Admin/Users/Edit', [
            'can' => [
                'users' => [
                    'delete' => Auth::user()->can('users.delete'),
                    'edit' => Auth::user()->can('users.edit'),
                ],
            ],
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->getRoleNames(),
            ],
            'roles' => Role::get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @return Response
     */
    public function update(Request $request, User $user)
    {
        $this->authorize('users.edit');

        $user->update([
            'name' => request('name'),
            'email' => request('email'),
        ]);

        $user_roles = new Collection(request('roles'));

        foreach (Role::get() as $role) {
            if ($user_roles->contains($role->name)) {
                $user->assignRole($role->name);
            } else {
                if ($user->hasRole($role->name)) {
                    $user->removeRole($role->name);
                }
            }
        }

        return Redirect::route('admin.users.edit', $user)->with('status', [
            'message' => 'Succesfully updated this user.',
            'type' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return Response
     */
    public function destroy(User $user)
    {
        $this->authorize('users.delete');

        $user->delete();

        return Redirect::route('admin.users')->with('status', [
            'message' => 'Succesfully deleted user.',
            'type' => 'success',
        ]);
    }
}
