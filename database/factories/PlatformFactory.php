<?php

namespace Database\Factories;

use App\Models\Platform;
use Illuminate\Database\Eloquent\Factories\Factory;

class PlatformFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Platform::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->randomElement(['PC', 'Mobile', 'Xbox', 'Server', 'Holographic', 'IoT', 'Team', 'ICO', 'SDK', '10X', 'Azure']),
            'description' => $this->faker-text($maxNbChars = 255),
            'color' => $this->faker->hexColor(),
            'icon' => $this->faker->randomElement(['laptop', 'mobile', 'gamepad-modern', 'server', 'head-side-goggles', 'microchip', 'tv', 'compact-disc', 'code', 'tablet', 'cloud']),
            'position' => $this->faker->randomNumber(5),
            'active' => 1,
            'legacy' => 0,
            'tool' => 0
        ];
    }
}
