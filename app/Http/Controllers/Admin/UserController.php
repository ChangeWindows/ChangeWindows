<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use URL;
use Redirect;

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
            'user' => $user
        ]);
    }

    public function update(User $user) {
        // $this->authorize('show_users');

        $user->update([
            'name' => request('name'),
            'email' => request('email')
        ]);

        return Redirect::route('admin.users.edit', $user);
    }
}
