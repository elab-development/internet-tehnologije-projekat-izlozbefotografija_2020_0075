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
            DB::statement('ALTER TABLE exhibition ADD CONSTRAINT check_dates CHECK (start_date<end_date)');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('exhibition', function (Blueprint $table) {
            DB::statement('ALTER TABLE exhibition DROP CONSTRAINT check_dates');
        });
    }
};
