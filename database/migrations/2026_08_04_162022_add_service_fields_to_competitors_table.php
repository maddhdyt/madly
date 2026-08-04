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
        Schema::table('competitors', function (Blueprint $table) {
            $table->string('service_type')->nullable()->after('tier'); // e.g., Digital Ads, SEO, Full Service
            $table->text('specific_services')->nullable()->after('service_type'); // e.g., "Meta Ads, Google Ads, TikTok Ads"
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('competitors', function (Blueprint $table) {
            $table->dropColumn(['service_type', 'specific_services']);
        });
    }
};
