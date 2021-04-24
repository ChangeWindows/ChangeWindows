<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Auth;
use Redirect;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Collection;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        $this->authorize('permissions.show');

        $permissions = Permission::orderBy('name')->paginate(100);

        return Inertia::render('Admin/Permissions/Show', [
            'can' => [
                'create_permissions' => Auth::user()->can('permissions.create'),
                'edit_permissions' => Auth::user()->can('permissions.edit')
            ],
            'permissions' => $permissions->map(function ($permission) {
                return [
                    'id' => $permission->id,
                    'name' => $permission->name,
                    'editUrl' => route('admin.permissions.edit', $permission, false)
                ];
            }),
            'pagination' => $permissions,
            'createUrl' => route('admin.permissions.create', [], false),
            'status' => session('status')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create() {
        $this->authorize('permissions.create');

        return Inertia::render('Admin/Permissions/Create', [
            'urls' => [
                'store_permission' => route('admin.permissions.store', [], false),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $this->authorize('permissions.create');
        
        $permissions = new Collection(request('variants'));

        foreach($permissions as $permission) {
            Permission::create([
                'name' => $permission,
            ]);
        }

        return Redirect::route('admin.permissions')->with('status', 'Succesfully created this permission.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Permission  $permission
     * @return \Illuminate\Http\Response
     */
    public function show(Permission $permission)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Permission  $permission
     * @return \Illuminate\Http\Response
     */
    public function edit(Permission $permission) {
        $this->authorize('permissions.show');

        return Inertia::render('Admin/Permissions/Edit', [
            'can' => [
                'edit_permissions' => Auth::user()->can('permissions.edit'),
                'delete_permissions' => Auth::user()->can('permissions.delete')
            ],
            'urls' => [
                'update_permission' => route('admin.permissions.update', $permission, false),
                'delete_permission' => route('admin.permissions.destroy', $permission, false)
            ],
            'permission' => [
                'id' => $permission->id,
                'name' => $permission->name,
                'permissions' => $permission->getPermissionNames()
            ],
            'status' => session('status')
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Permission  $permission
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Permission $permission) {
        $this->authorize('permissions.edit');

        $permission->update([
            'name' => request('name'),
        ]);

        return Redirect::route('admin.permissions.edit', $permission)->with('status', 'Succesfully updated this permission.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Permission  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(Permission $permission) {
        $this->authorize('permissions.delete');

        $permission->delete();

        return Redirect::route('admin.permissions')->with('status', 'Succesfully deleted permission.');
    }
}
