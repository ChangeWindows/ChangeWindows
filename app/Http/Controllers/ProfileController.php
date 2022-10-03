<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Redirect;

use App\Models\User;

class ProfileController extends Controller
{
    public function index() {
        $user = User::find(Auth::user()->id);

        return Inertia::render('Profile/Index', [
            'status' => session('status'),
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email
            ]
        ]);
    }

    public function password() {
        $user = User::find(Auth::user()->id);

        return Inertia::render('Profile/Password', [
            'status' => session('status'),
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
            ]
        ]);
    }

    public function update(User $user) {
        if (Auth::user()->id !== $user->id) {
            abort(403);
        }

        $this->validate(request(), [
            'name' => ['required'],
            'email' => ['string', 'required', 'email', 'max:255', Rule::unique('users')->ignore($user)],
        ], [
            'name.required' => 'Your name is required.',
            'email.required' => 'An email address is required.',
            'email.max' => 'Your email address cannot excede 255 characters.',
            'email.email' => 'This is not a valid email address.'
        ]);

        $user->update([
            'name' => request('name'),
            'email' => request('email')
        ]);

        return Redirect::route('front.profile')->with('status', [
            'message' => 'Your profile has been saved.',
        'type' => 'success'
    ]);
    }

    public function updatePassword(User $user) {
        if (Auth::user()->id !== $user->id) {
            abort(403);
        }

        $this->validate(request(), [
            'password' => ['nullable', 'string', 'min:8', 'max:255', 'confirmed']
        ], [
            'password.min' => 'Password must contain at least 8 characters.',
            'password.max' => 'Password cannot contain more than 255 characters.',
            'password.confirmed' => 'Password does not match.'
        ]);

        $user->update([
            'password' => request('password')
        ]);

        return Redirect::route('front.profile')->with('status', [
            'message' => 'Your password has been updated.',
            'type' => 'success'
        ]);
    }
}
