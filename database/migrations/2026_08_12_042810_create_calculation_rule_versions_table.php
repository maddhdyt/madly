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
        Schema::create('calculation_rule_versions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('calculation_rule_id')->constrained('calculation_rules')->cascadeOnDelete();
            $table->decimal('value', 10, 4); // percentage or fixed amount
            $table->date('effective_from');
            $table->date('effective_until')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index(['calculation_rule_id', 'effective_from'], 'crv_rule_effective_idx');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('calculation_rule_versions');
    }
};
