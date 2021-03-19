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
            'description' => 'The PC is Windows\'s most well known platform. This OS is primarily targeted at desktops, laptops, and tablets.',
            'color' => '#0078d7',
            'icon' => 'laptop',
            'position' => 1,
            'active' => 1,
            'legacy' => 0
        ]);

        Platform::create([
            'name' => 'Mobile',
            'description' => 'Mobile evolved from Windows Phone merging into the mainline Windows NT-family. Here the OS saw 4 major revisions (8, 8.1, 10 v1511 and 10 v1607) and a number of smaller upgrades after which the platform was deprecated when Microsoft left the smartphone OS market.',
            'color' => '#00bcf2',
            'icon' => 'mobile', 
            'position' => 0,
            'active' => 0,
            'legacy' => 1
        ]);

        Platform::create([
            'name' => 'Xbox',
            'description' => 'The Xbox One and Series run 3 OS\'s as one, one of those is Windows. Xbox is by far the most active platform for Insiders, seeing nearly daily updates in at least 1 channel.',
            'color' => '#107c10',
            'icon' => 'gamepad-modern',
            'position' => 2,
            'active' => 1,
            'legacy' => 0
        ]);

        Platform::create([
            'name' => 'Server',
            'description' => 'Together with PC, Server may hold the name of the longest running platform. It is however split in 2 release types. There are bi-annual releases that provide only a commandline interface, and there are the mainline Server releases like Server 2016, Server 2019, and Server 2022. Major Server releases almost always match with an LTSC version of desktop.',
            'color' => '#ffb900',
            'icon' => 'server',
            'position' => 3,
            'active' => 1,
            'legacy' => 0
        ]);

        Platform::create([
            'name' => 'Holographic',
            'description' => 'Holographic is Microsoft\'s OS for HoloLens, and its main AR platform for Windows Mixed Reality. Like Team, this OS has never been used on a device that was not made by Microsoft.',
            'color' => '#ff4343',
            'icon' => 'head-side-goggles',
            'position' => 5,
            'active' => 1,
            'legacy' => 0
        ]);

        Platform::create([
            'name' => 'IoT',
            'description' => 'IoT is Microsoft\'s replacement for Windows for embedded usage. The platform has been deprecated.',
            'color' => '#f7630c',
            'icon' => 'microchip',
            'position' => 7,
            'active' => 1,
            'legacy' => 1
        ]);

        Platform::create([
            'name' => 'Team',
            'description' => 'Team is Microsoft\'s OS for the Surface Hub-line of devices. Like Holographic, this OS has never been used on a device that was not made by Microsoft.',
            'color' => '#e3008c',
            'icon' => 'tv',
            'position' => 6,
            'active' => 1,
            'legacy' => 0
        ]);

        Platform::create([
            'name' => 'ISO',
            'description' => 'ISO\'s are one of the many methods to download full Windows installations and to quickly install a new version of Windows.',
            'color' => '#00cea6',
            'icon' => 'compact-disc',
            'position' => 9,
            'active' => 1,
            'legacy' => 0
        ]);

        Platform::create([
            'name' => 'SDK',
            'description' => 'With the SDK, you can develop apps for Windows.',
            'color' => '#886ce4',
            'icon' => 'code',
            'position' => 8,
            'active' => 1,
            'legacy' => 0
        ]);

        Platform::create([
            'name' => '10X',
            'description' => 'Windows 10X is Microsoft next generation of Windows. While it was first set to target dual-screen devices like the Surface Neo, it has since been repurposed to target more classic formfactors like laptops and desktops. It is Microsoft\'s goal to eventually let 10X takeover Windows 10\'s place as the mainline Windows version.',
            'color' => '#9ad93a',
            'icon' => 'tablet',
            'position' => 4,
            'active' => 1,
            'legacy' => 0
        ]);

        Platform::create([
            'name' => 'Azure',
            'description' => 'Windows, but it is actually Azure.',
            'color' => '#005aa3',
            'icon' => 'cloud', 
            'position' => 0,
            'active' => 1,
            'legacy' => 0
        ]);
    }
}
