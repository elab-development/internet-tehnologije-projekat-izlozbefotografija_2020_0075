<?php

namespace Database\Factories;

use App\Models\Exhibition;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ticket>
 */
class TicketFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'date' => fake()->date(),
            'person_count' => fake()->randomDigit(),
            'user_id' => User::factory(),
            'exhibition_id' => Exhibition::factory(),
        ];
    }
}
