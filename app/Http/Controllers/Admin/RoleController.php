<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Auth;
use URL;
use Redirect;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Collection;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        $this->authorize('roles.show');

        return Inertia::render('Admin/Roles/Show', [
            'can' => [
                'create_roles' => Auth::user()->can('roles.create'),
                'edit_roles' => Auth::user()->can('roles.edit')
            ],
            'roles' => Role::orderBy('name')->paginate(50)->map(function ($role) {
                return [
                    'id' => $role->id,
                    'name' => $role->name,
                    'editUrl' => URL::route('admin.roles.edit', $role)
                ];
            }),
            'createUrl' => URL::route('admin.roles.create'),
            'status' => session('status')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create() {
        $this->authorize('roles.create');

        return Inertia::render('Admin/Roles/Create', [
            'permissions' => Permission::get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $this->authorize('roles.create');

        $role = $role->create([
            'name' => request('name'),
        ]);
        
        $role_permissions = new Collection(request('permissions'));

        foreach($role_permissions as $permission) {
            $role->givePermissionTo($permission);
        }

        return Redirect::route('admin.roles.edit', ['role' => $role->id])->with('status', 'Succesfully created this role.');
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
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function edit(Role $role) {
        $this->authorize('roles.show');

        return Inertia::render('Admin/Roles/Edit', [
            'can' => [
                'edit_roles' => Auth::user()->can('roles.edit'),
                'delete_roles' => Auth::user()->can('roles.delete')
            ],
            'role' => [
                'id' => $role->id,
                'name' => $role->name,
                'permissions' => $role->getPermissionNames()
            ],
            'permissions' => Permission::get(),
            'status' => session('status')
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Role $role) {
        $this->authorize('roles.edit');

        $role->update([
            'name' => request('name'),
        ]);

        $role_permissions = new Collection(request('permissions'));

        foreach(Permission::get() as $permission) {
            if ($role_permissions->contains($permission->name)) {
                $role->givePermissionTo($permission->name);
            } else {
                $role->revokePermissionTo($permission->name);
            }
        }

        return Redirect::route('admin.roles.edit', $role)->with('status', 'Succesfully updated this role.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(Role $role) {
        $this->authorize('roles.delete');

        $role->delete();

        return Redirect::route('admin.roles')->with('status', 'Succesfully deleted role.');
    }
}
