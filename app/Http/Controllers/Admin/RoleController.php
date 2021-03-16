<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use URL;
use Redirect;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Collection;

class RoleController extends Controller
{
    public function index() {
        // $this->authorize('show_roles');

        return Inertia::render('Admin/Roles/Show', [
            'roles' => Role::orderBy('name')->paginate(50)->map(function ($role) {
                return [
                    'id' => $role->id,
                    'name' => $role->name,
                    'editUrl' => URL::route('admin.roles.edit', $role)
                ];
            })
        ]);
    }

    public function edit(Role $role) {
        // $this->authorize('show_roles');

        return Inertia::render('Admin/Roles/Edit', [
            'role' => [
                'id' => $role->id,
                'name' => $role->name,
                'permissions' => $role->getPermissionNames()
            ],
            'permissions' => Permission::get()
        ]);
    }

    public function update(Role $role) {
        // $this->authorize('show_roles');

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

        return Redirect::route('admin.roles.edit', $role);
    }
}
