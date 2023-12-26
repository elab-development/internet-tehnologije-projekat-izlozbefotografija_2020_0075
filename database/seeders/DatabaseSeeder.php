<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Admin;
use App\Models\Artwork;
use App\Models\Exhibition;
use App\Models\Newsletter;
use App\Models\Showing;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    { 
        Newsletter::factory(3)->create();
        Ticket::factory(5)->create();        
        Artwork::factory(5)->create();        
        Showing::factory(10)->create();        
    }
}
