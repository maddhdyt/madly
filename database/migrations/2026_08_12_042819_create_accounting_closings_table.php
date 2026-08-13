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
        Schema::create('accounting_closings', function (Blueprint $table) {
            $table->id();
            $table->date('closing_date')->unique();
            $table->decimal('total_revenue', 15, 2)->default(0);
            $table->decimal('total_expense', 15, 2)->default(0);
            $table->decimal('daily_settlement', 15, 2)->default(0); // revenue - expense
            $table->enum('status', ['open', 'closed', 'reopened'])->default('open');
            $table->foreignId('closed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('closed_at')->nullable();
            $table->text('notes')->nullable();
            $table->json('snapshot_rules')->nullable(); // snapshot of rules at closing time
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accounting_closings');
    }
};
