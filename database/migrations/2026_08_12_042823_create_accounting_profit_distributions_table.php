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
        Schema::create('accounting_profit_distributions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('period_closing_id');
            $table->foreign('period_closing_id', 'apd_period_closing_fk')->references('id')->on('accounting_period_closings')->cascadeOnDelete();
            $table->unsignedBigInteger('profit_sharing_scheme_id')->nullable();
            $table->foreign('profit_sharing_scheme_id', 'apd_scheme_fk')->references('id')->on('profit_sharing_schemes')->nullOnDelete();
            $table->foreignId('profit_participant_id')->constrained('profit_participants')->restrictOnDelete();
            $table->decimal('share_percentage', 10, 4);
            $table->decimal('distributed_amount', 15, 2);
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accounting_profit_distributions');
    }
};
