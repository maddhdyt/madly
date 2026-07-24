<?php
require 'vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;

DB::statement('SET FOREIGN_KEY_CHECKS=0;');
Schema::dropIfExists('pricelists');
if (Schema::hasColumn('product_prices', 'pricelist_id')) {
    Schema::table('product_prices', function (Blueprint $table) {
        $table->dropForeign(['pricelist_id']);
        $table->dropColumn('pricelist_id');
    });
}
DB::statement('SET FOREIGN_KEY_CHECKS=1;');
echo "Cleanup done.\n";
