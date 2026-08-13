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
        Schema::create('profit_sharing_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('profit_sharing_scheme_id')->constrained('profit_sharing_schemes')->cascadeOnDelete();
            $table->foreignId('profit_participant_id')->constrained('profit_participants')->cascadeOnDelete();
            $table->decimal('share_percentage', 10, 4); // e.g. 40.0000
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profit_sharing_items');
    }
};
