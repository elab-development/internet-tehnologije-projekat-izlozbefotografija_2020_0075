<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Exhibition>
 */
class ExhibitionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $endDate = '2023-12-25';
        $startDate = $this->faker->dateTimeBetween('-1 year', $endDate)->format('Y-m-d');

        return [
            'name' => fake()->name(),
            'start_date' => $startDate,
            'end_date' => $endDate,
        ];
    }
}
