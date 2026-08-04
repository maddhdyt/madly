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
            $table->string('website_url')->nullable()->after('logo_url');
            $table->string('instagram_url')->nullable()->after('website_url');
            $table->string('tiktok_url')->nullable()->after('instagram_url');
            $table->string('tier')->nullable()->after('tiktok_url'); // e.g. Tier 1, Direct Competitor
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('competitors', function (Blueprint $table) {
            $table->dropColumn(['website_url', 'instagram_url', 'tiktok_url', 'tier']);
        });
    }
};
