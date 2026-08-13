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
        Schema::create('calculation_rules', function (Blueprint $table) {
            $table->id();
            $table->string('rule_name'); // e.g. Advertising, Bonus
            $table->foreignId('expense_category_id')->constrained('expense_categories')->cascadeOnDelete();
            $table->enum('calculation_type', ['percentage_of_revenue', 'fixed_amount', 'percentage_of_profit'])->default('percentage_of_revenue');
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('calculation_rules');
    }
};
