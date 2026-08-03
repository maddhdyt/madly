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
        Schema::create('daily_metrics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('marketing_brand_id')->constrained()->cascadeOnDelete();
            $table->date('date');
            $table->decimal('ad_spend', 15, 2)->default(0);
            $table->integer('clicks')->default(0);
            $table->integer('leads')->default(0);
            $table->decimal('revenue', 15, 2)->default(0);
            $table->timestamps();

            // Ensure only one metric per brand per day
            $table->unique(['marketing_brand_id', 'date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daily_metrics');
    }
};
