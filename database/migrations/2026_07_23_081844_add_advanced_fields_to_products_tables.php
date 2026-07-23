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
        Schema::table('products', function (Blueprint $table) {
            $table->string('category')->nullable()->after('name');
            $table->json('includes')->nullable()->after('description_snippet');
            $table->string('promo_header')->nullable();
            $table->string('footer_text')->nullable();
        });

        Schema::table('product_prices', function (Blueprint $table) {
            $table->string('notes')->nullable()->after('promo_price');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products_tables', function (Blueprint $table) {
            //
        });
    }
};
