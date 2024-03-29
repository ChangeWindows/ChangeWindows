<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Auth;
use Redirect;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Collection;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('permissions.show');

        $permissions = Permission::orderBy('name');
        $paginator = $permissions->paginate(100)->onEachSide(2)->through(function () {
            return [];
        });

        return Inertia::render('Admin/Permissions/Index', [
            'can' => [
                'permissions' => [
                    'create' => Auth::user()->can('permissions.create'),
                    'edit' => Auth::user()->can('permissions.edit')
                ],
            ],
            'permissions' => $permissions->paginate(100)->map(function ($permission) {
                return [
                    'id' => $permission->id,
                    'name' => $permission->name
                ];
            }),
            'pagination' => $paginator,
            'status' => session('status')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $this->authorize('permissions.create');

        return Inertia::render('Admin/Permissions/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->authorize('permissions.create');

        $permissions = new Collection(request('variants'));

        foreach ($permissions as $permission) {
            Permission::create([
                'name' => $permission,
            ]);
        }

        return Redirect::route('admin.permissions')->with('status', [
            'message' => 'Succesfully created this permission.',
            'type' => 'success'
        ]);
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
    public function edit(Permission $permission)
    {
        $this->authorize('permissions.show');

        return Inertia::render('Admin/Permissions/Edit', [
            'can' => [
                'permissions' => [
                    'delete' => Auth::user()->can('permissions.delete'),
                    'edit' => Auth::user()->can('permissions.edit')
                ],
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
    public function update(Request $request, Permission $permission)
    {
        $this->authorize('permissions.edit');

        $permission->update([
            'name' => request('name'),
        ]);

        return Redirect::route('admin.permissions.edit', $permission)->with('status', [
            'message' => 'Succesfully updated this permission.',
            'type' => 'success'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Permission  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(Permission $permission)
    {
        $this->authorize('permissions.delete');

        $permission->delete();

        return Redirect::route('admin.permissions')->with('status', [
            'message' => 'Succesfully deleted permission.',
            'type' => 'success'
        ]);
    }
}
