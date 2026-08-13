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
        Schema::create('accounting_closing_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('accounting_closing_id')->constrained('accounting_closings')->cascadeOnDelete();
            $table->foreignId('expense_category_id')->nullable()->constrained('expense_categories')->nullOnDelete();
            $table->string('label'); // e.g. "HPP", "Gaji", "Biaya iklan 4%"
            $table->decimal('amount', 15, 2)->default(0);
            $table->enum('item_type', ['revenue', 'expense'])->default('expense');
            $table->decimal('rule_value_snapshot', 10, 4)->nullable(); // snapshot of rule % at closing
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accounting_closing_items');
    }
};
