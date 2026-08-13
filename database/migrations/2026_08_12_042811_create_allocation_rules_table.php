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
        Schema::create('allocation_rules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('expense_category_id')->constrained('expense_categories')->cascadeOnDelete();
            $table->foreignId('accounting_project_id')->constrained('accounting_projects')->cascadeOnDelete();
            $table->enum('allocation_method', ['percentage', 'revenue_proportion', 'equal', 'manual'])->default('percentage');
            $table->decimal('allocation_value', 10, 4)->nullable(); // percentage value when method is 'percentage'
            $table->date('effective_from');
            $table->date('effective_until')->nullable();
            $table->timestamps();

            $table->index(['expense_category_id', 'accounting_project_id'], 'alloc_rules_cat_proj_idx');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('allocation_rules');
    }
};
