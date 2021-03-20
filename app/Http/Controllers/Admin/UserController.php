<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use URL;
use Redirect;
use Auth;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Collection;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        $this->authorize('users.show');

        return Inertia::render('Admin/Users/Show', [
            'can' => [
                'create_users' => Auth::user()->can('users.create'),
                'edit_users' => Auth::user()->can('users.edit')
            ],
            'users' => User::orderBy('name')->paginate(50)->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'editUrl' => URL::route('admin.users.edit', $user)
                ];
            })
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
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user) {
        $this->authorize('users.show');

        return Inertia::render('Admin/Users/Edit', [
            'can' => [
                'edit_users' => Auth::user()->can('users.edit'),
                'delete_users' => Auth::user()->can('users.delete')
            ],
            'urls' => [
                'update_user' => URL::route('admin.users.update', $user),
                'destroy_user' => URL::route('admin.users.destroy', $user)
            ],
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->getRoleNames()
            ],
            'roles' => Role::get()
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user) {
        $this->authorize('users.edit');

        $user->update([
            'name' => request('name'),
            'email' => request('email')
        ]);

        $user_roles = new Collection(request('roles'));

        foreach(Role::get() as $role) {
            if ($user_roles->contains($role->name)) {
                $user->assignRole($role->name);
            } else {
                $user->removeRole($role->name);
            }
        }

        return Redirect::route('admin.users.edit', $user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $this->authorize('users.delete');

        $user->delete();

        return Redirect::route('admin.users')->with('status', 'Succesfully deleted user.');
    }
}
