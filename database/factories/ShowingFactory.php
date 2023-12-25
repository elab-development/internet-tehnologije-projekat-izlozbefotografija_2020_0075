<?php

namespace Database\Factories;

use App\Models\Artwork;
use App\Models\Exhibition;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Showing>
 */
class ShowingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'artwork_id' => Artwork::factory(),
            'exhibition_id' => Exhibition::factory(),
        ];
    }
}
