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
        Schema::table('quotation_items', function (Blueprint $table) {
            $table->dropForeign(['product_price_id']);
            $table->dropColumn('product_price_id');
        });

        Schema::dropIfExists('product_prices');
        Schema::dropIfExists('pricelists');
    }

    public function down(): void
    {
        // One-way migration
    }
};
