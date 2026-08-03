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
        Schema::table('ad_identities', function (Blueprint $table) {
            $table->dropForeign(['brand_id']);
            $table->dropColumn('brand_id');
            $table->foreignId('marketing_brand_id')->after('id')->nullable()->constrained('marketing_brands')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ad_identities', function (Blueprint $table) {
            $table->dropForeign(['marketing_brand_id']);
            $table->dropColumn('marketing_brand_id');
            $table->foreignId('brand_id')->after('id')->constrained('brands')->cascadeOnDelete();
        });
    }
};
