<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create roles
        $role_admin = Role::create(['name' => 'admin']);
        $role_editor = Role::create(['name' => 'editor']);

        // Create permissions
        $permission_dashboard = Permission::create(['name' => 'dashboard']);

        // Build admin role
        $role_admin->givePermissionTo('dashboard');

        // Build editor role
        $role_editor->givePermissionTo('dashboard');

        $admin = User::where('id', 1)->first();

        $admin->assignRole('admin');
    }
}
