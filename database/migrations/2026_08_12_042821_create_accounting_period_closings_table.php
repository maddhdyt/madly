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
        Schema::create('accounting_period_closings', function (Blueprint $table) {
            $table->id();
            $table->string('period_name'); // e.g. "Agustus 2026"
            $table->date('period_start');
            $table->date('period_end');
            $table->decimal('total_daily_settlements', 15, 2)->default(0); // SUM(daily_settlement)
            $table->decimal('total_revenue', 15, 2)->default(0);
            $table->decimal('total_expense', 15, 2)->default(0);
            $table->enum('status', ['open', 'closed'])->default('open');
            $table->foreignId('closed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('closed_at')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->unique(['period_start', 'period_end']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accounting_period_closings');
    }
};
