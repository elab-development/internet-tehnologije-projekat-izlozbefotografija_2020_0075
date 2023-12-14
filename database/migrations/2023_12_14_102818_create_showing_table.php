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
        Schema::create('showing', function (Blueprint $table) {
            $table->unsignedBigInteger('id');
            $table->unsignedBigInteger('artwork_id');
            $table->unsignedBigInteger('exhibition_id');
            $table->primary(array('id', 'artwork_id', 'exhibition_id'));
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('showing');
    }
};
