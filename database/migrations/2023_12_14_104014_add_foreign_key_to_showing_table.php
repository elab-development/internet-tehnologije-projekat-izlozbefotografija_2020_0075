<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('showing', function (Blueprint $table) {
            $table->foreign('artwork_id')->references('id')->on('artwork');
            $table->foreign('exhibition_id')->references('id')->on('exhibition');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('showing', function (Blueprint $table) {
            $table->dropForeign(['artwork_id']);
            $table->dropForeign(['exhibition_id']);
        });
    }
};
