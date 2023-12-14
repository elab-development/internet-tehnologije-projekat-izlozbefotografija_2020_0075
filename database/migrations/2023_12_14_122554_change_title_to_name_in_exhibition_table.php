<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('exhibition', function (Blueprint $table) {
            DB::statement('ALTER TABLE exhibition CHANGE COLUMN title name VARCHAR(255)');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('exhibition', function (Blueprint $table) {
            DB::statement('ALTER TABLE exhibition CHANGE COLUMN name title VARCHAR(255)');
        });
    }
};
