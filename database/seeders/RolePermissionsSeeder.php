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
        $role_user = Role::create(['name' => 'user']);

        // Create permissions
        $permission_dashboard = Permission::create(['name' => 'dashboard']);
        $permission_profile = Permission::create(['name' => 'profile']);
        $permission_platforms = Permission::create(['name' => 'platforms']);
        $permission_platforms_create = Permission::create(['name' => 'platforms.create']);
        $permission_platforms_edit = Permission::create(['name' => 'platforms.edit']);
        $permission_platforms_delete = Permission::create(['name' => 'platforms.delete']);
        $permission_channels = Permission::create(['name' => 'channels']);
        $permission_channels_create = Permission::create(['name' => 'channels.create']);
        $permission_channels_edit = Permission::create(['name' => 'channels.edit']);
        $permission_channels_delete = Permission::create(['name' => 'channels.delete']);
        $permission_releases = Permission::create(['name' => 'releases']);
        $permission_releases_create = Permission::create(['name' => 'releases.create']);
        $permission_releases_edit = Permission::create(['name' => 'releases.edit']);
        $permission_releases_delete = Permission::create(['name' => 'releases.delete']);
        $permission_flights = Permission::create(['name' => 'flights']);
        $permission_flights_create = Permission::create(['name' => 'flights.create']);
        $permission_flights_edit = Permission::create(['name' => 'flights.edit']);
        $permission_flights_delete = Permission::create(['name' => 'flights.delete']);
        $permission_users = Permission::create(['name' => 'users']);
        $permission_users_create = Permission::create(['name' => 'users.create']);
        $permission_users_edit = Permission::create(['name' => 'users.edit']);
        $permission_users_delete = Permission::create(['name' => 'users.delete']);
        $permission_roles = Permission::create(['name' => 'roles']);
        $permission_roles_create = Permission::create(['name' => 'roles.create']);
        $permission_roles_edit = Permission::create(['name' => 'roles.edit']);
        $permission_roles_delete = Permission::create(['name' => 'roles.delete']);
        $permission_settings = Permission::create(['name' => 'settings']);

        // Built roles
        $role_admin->givePermissionTo(['profile', 'dashboard', 'platforms', 'channels', 'releases', 'flights', 'users', 'roles', 'settings']);
        $role_editor->givePermissionTo(['profile', 'dashboard', 'platforms.edit', 'channels.edit', 'releases', 'flights']);
        $role_user->givePermissionTo(['profile']);

        // Assign role to admin
        $admin = User::where('id', 1)->first();

        $admin->assignRole('admin');
    }
}
