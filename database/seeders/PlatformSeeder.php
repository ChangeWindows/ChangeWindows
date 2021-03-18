<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Platform;

class PlatformSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Platform::create([
            'name' => 'PC',
            'color' => '#0078d7',
            'icon' => 'desktop',
            'position' => 1,
            'active' => 1,
            'legacy' => 0
        ]);

        Platform::create([
            'name' => 'Mobile',
            'color' => '#00bcf2',
            'icon' => 'mobile', 
            'position' => 0,
            'active' => 0,
            'legacy' => 1
        ]);

        Platform::create([
            'name' => 'Xbox',
            'color' => '#107c10',
            'icon' => 'gamepad-modern',
            'position' => 2,
            'active' => 1,
            'legacy' => 0
        ]);

        Platform::create([
            'name' => 'Server',
            'color' => '#ffb900',
            'icon' => 'server',
            'position' => 3,
            'active' => 1,
            'legacy' => 0
        ]);

        Platform::create([
            'name' => 'Holographic',
            'color' => '#ff4343',
            'icon' => 'head-side-goggles',
            'position' => 5,
            'active' => 1,
            'legacy' => 0
        ]);

        Platform::create([
            'name' => 'IoT',
            'color' => '#f7630c',
            'icon' => 'microchip',
            'position' => 7,
            'active' => 1,
            'legacy' => 1
        ]);

        Platform::create([
            'name' => 'Team',
            'color' => '#e3008c',
            'icon' => 'tv',
            'position' => 6,
            'active' => 1,
            'legacy' => 0
        ]);

        Platform::create([
            'name' => 'ISO',
            'color' => '#00cea6',
            'icon' => 'compact-disc',
            'position' => 9,
            'active' => 1,
            'legacy' => 0
        ]);

        Platform::create([
            'name' => 'SDK',
            'color' => '#886ce4',
            'icon' => 'code',
            'position' => 8,
            'active' => 1,
            'legacy' => 0
        ]);

        Platform::create([
            'name' => '10X',
            'color' => '#9ad93a',
            'icon' => 'laptop',
            'position' => 4,
            'active' => 1,
            'legacy' => 0
        ]);

        Platform::create([
            'name' => 'Azure',
            'color' => '#005aa3',
            'icon' => 'cloud', 
            'position' => 0,
            'active' => 1,
            'legacy' => 0
        ]);
    }
}
