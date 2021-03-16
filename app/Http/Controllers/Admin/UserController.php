<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use URL;
use Redirect;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Collection;

class UserController extends Controller
{
    public function index() {
        // $this->authorize('show_users');

        return Inertia::render('Admin/Users/Show', [
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
        // $this->authorize('show_users');

        return Inertia::render('Admin/Users/Edit', [
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
        // $this->authorize('show_users');

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
