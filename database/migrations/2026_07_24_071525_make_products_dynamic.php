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
        // 1. Add product_schema to services table
        Schema::table('services', function (Blueprint $table) {
            $table->json('product_schema')->nullable()->after('form_config');
        });

        // 2. Drop specific columns from products and add attributes json column
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn([
                'focus_scope',
                'link',
                'publication_months',
                'estimated_time',
                'accreditation_type',
                'available_slots',
                'notes'
            ]);

            $table->json('attributes')->nullable()->after('hpp');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('attributes');

            $table->text('focus_scope')->nullable();
            $table->string('link')->nullable();
            $table->string('publication_months')->nullable();
            $table->string('estimated_time')->nullable();
            $table->string('accreditation_type')->nullable();
            $table->string('available_slots')->nullable();
            $table->text('notes')->nullable();
        });

        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn('product_schema');
        });
    }
};
