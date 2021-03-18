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

    public function edit(User $user) {
        $this->authorize('users.show');

        return Inertia::render('Admin/Users/Edit', [
            'can' => [
                'edit_users' => Auth::user()->can('users.edit'),
                'delete_users' => Auth::user()->can('users.delete')
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

    public function update(User $user) {
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
}
