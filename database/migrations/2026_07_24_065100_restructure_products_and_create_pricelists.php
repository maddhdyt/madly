<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Create Pricelists table
        Schema::dropIfExists('pricelists');
        Schema::create('pricelists', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('service_id')->nullable()->constrained()->nullOnDelete();
            $table->string('promo_header')->nullable();
            $table->json('includes')->nullable();
            $table->text('footer_text')->nullable();
            $table->timestamps();
        });

        // Clear existing prices and quotations because they will break due to structure change
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('product_prices')->truncate();
        DB::table('products')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // 2. Modify ProductPrices table
        Schema::table('product_prices', function (Blueprint $table) {
            $table->foreignId('pricelist_id')->after('id')->constrained()->cascadeOnDelete();
        });

        // 3. Modify Products table
        Schema::table('products', function (Blueprint $table) {
            // Drop old columns
            $table->dropForeign(['brand_id']);
            $table->dropColumn([
                'brand_id',
                'description_snippet',
                'category',
                'promo_header',
                'footer_text',
                'includes',
                'metadata'
            ]);

            // Add new columns
            $table->text('focus_scope')->nullable()->after('name');
            $table->decimal('hpp', 15, 2)->default(0)->after('focus_scope');
            $table->string('link')->nullable()->after('hpp');
            $table->string('publication_months')->nullable()->after('link');
            $table->string('estimated_time')->nullable()->after('publication_months');
            $table->string('accreditation_type')->nullable()->after('estimated_time');
            $table->string('available_slots')->nullable()->after('accreditation_type');
            $table->text('notes')->nullable()->after('available_slots');
            $table->string('status_note')->nullable()->after('notes');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->foreignId('brand_id')->nullable()->constrained()->nullOnDelete();
            $table->string('description_snippet')->nullable();
            $table->string('category')->nullable();
            $table->string('promo_header')->nullable();
            $table->text('footer_text')->nullable();
            $table->json('includes')->nullable();
            $table->json('metadata')->nullable();

            $table->dropColumn([
                'focus_scope',
                'hpp',
                'link',
                'publication_months',
                'estimated_time',
                'accreditation_type',
                'available_slots',
                'notes',
                'status_note'
            ]);
        });

        Schema::table('product_prices', function (Blueprint $table) {
            $table->dropForeign(['pricelist_id']);
            $table->dropColumn('pricelist_id');
        });

        Schema::dropIfExists('pricelists');
    }
};
