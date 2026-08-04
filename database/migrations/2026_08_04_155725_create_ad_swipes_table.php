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
        Schema::create('ad_swipes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('marketing_brand_id')->nullable()->constrained()->nullOnDelete();
            $table->string('title');
            $table->string('platform')->nullable(); // e.g. Meta Ads, TikTok
            $table->text('url')->nullable();
            $table->string('angle')->nullable();
            $table->string('image_path')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ad_swipes');
    }
};
