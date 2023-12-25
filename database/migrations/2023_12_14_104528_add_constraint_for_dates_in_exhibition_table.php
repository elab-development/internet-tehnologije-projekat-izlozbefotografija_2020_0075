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
        Schema::table('exhibitions', function (Blueprint $table) {
            DB::statement('ALTER TABLE exhibitions ADD CONSTRAINT check_dates CHECK (start_date<end_date)');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('exhibitions', function (Blueprint $table) {
            DB::statement('ALTER TABLE exhibitions DROP CONSTRAINT check_dates');
        });
    }
};
