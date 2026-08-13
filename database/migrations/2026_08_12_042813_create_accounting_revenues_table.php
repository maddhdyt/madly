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
        Schema::create('accounting_revenues', function (Blueprint $table) {
            $table->id();
            $table->foreignId('accounting_project_id')->constrained('accounting_projects')->cascadeOnDelete();
            $table->foreignId('cash_account_id')->constrained('cash_accounts')->restrictOnDelete();
            $table->date('transaction_date');
            $table->decimal('amount', 15, 2);
            $table->string('description')->nullable();
            $table->string('reference_number')->nullable();
            $table->enum('status', ['draft', 'posted', 'voided'])->default('posted');
            $table->foreignId('recorded_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->index(['accounting_project_id', 'transaction_date'], 'acc_rev_proj_date_idx');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accounting_revenues');
    }
};
