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
        Schema::create('accounting_period_closing_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('period_closing_id');
            $table->foreign('period_closing_id', 'pci_period_closing_fk')->references('id')->on('accounting_period_closings')->cascadeOnDelete();
            $table->unsignedBigInteger('closing_id');
            $table->foreign('closing_id', 'pci_closing_fk')->references('id')->on('accounting_closings')->cascadeOnDelete();
            $table->date('closing_date');
            $table->decimal('daily_settlement', 15, 2)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accounting_period_closing_items');
    }
};
