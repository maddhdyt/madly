<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Pricelist / Quotation</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #222;
            font-size: 14px;
            line-height: 1.5;
            margin: 0;
            padding: 10px 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 2px solid #f0f0f0;
        }
        .logo {
            font-size: 28px;
            font-weight: 900;
            letter-spacing: -1px;
            color: #111;
            margin: 0 0 5px 0;
        }
        .meta-text {
            color: #666;
            margin: 0;
            font-size: 13px;
        }
        .client-info {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 30px;
        }
        .client-info p {
            margin: 3px 0;
            font-size: 13px;
        }
        .product-block {
            margin-bottom: 35px;
            page-break-inside: avoid;
        }
        .promo-header {
            color: #e65100;
            font-weight: bold;
            font-size: 14px;
            margin: 0 0 5px 0;
        }
        .product-title {
            font-size: 20px;
            font-weight: 800;
            color: #111;
            margin: 0 0 5px 0;
        }
        .product-category {
            font-size: 13px;
            color: #666;
            margin: 0 0 15px 0;
            font-style: italic;
        }
        .packages-list {
            list-style: none;
            padding: 0;
            margin: 0 0 15px 0;
        }
        .packages-list li {
            padding: 8px 12px;
            background: #fff;
            border: 1px solid #eee;
            border-radius: 6px;
            margin-bottom: 8px;
            font-size: 14px;
            font-weight: 600;
        }
        .packages-list li span.price {
            float: right;
            color: #111;
        }
        .includes-title {
            font-size: 13px;
            font-weight: 700;
            margin: 0 0 8px 0;
            color: #333;
        }
        .includes-list {
            list-style: none;
            padding: 0;
            margin: 0 0 15px 0;
        }
        .includes-list li {
            font-size: 13px;
            margin-bottom: 5px;
            color: #444;
            padding-left: 20px;
            position: relative;
        }
        .includes-list li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #10b981;
            font-weight: bold;
        }
        .footer-text {
            font-size: 12px;
            color: #666;
            margin: 10px 0 0 0;
            background: #fffbe6;
            padding: 8px;
            border-left: 3px solid #fbbf24;
        }
        .divider {
            border: 0;
            height: 1px;
            background: #eee;
            margin: 30px 0;
        }
        .grand-totals {
            margin-top: 40px;
            background: #111;
            color: #fff;
            padding: 20px;
            border-radius: 12px;
            page-break-inside: avoid;
        }
        .totals-row {
            display: block;
            width: 100%;
            margin-bottom: 8px;
            font-size: 14px;
        }
        .totals-row:after {
            content: "";
            display: table;
            clear: both;
        }
        .totals-label {
            float: left;
            color: #aaa;
        }
        .totals-value {
            float: right;
        }
        .grand-total-row {
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid #333;
            font-size: 20px;
            font-weight: 900;
        }
        .grand-total-row .totals-label {
            color: #fff;
        }
    </style>
</head>
<body>

    <div class="header">
        <h1 class="logo"><?php echo e(\App\Models\Setting::get('company_name', 'MADLY')); ?></h1>
        <p class="meta-text"><?php echo e(\App\Models\Setting::get('company_tagline', 'Digital Marketing & IT Solutions')); ?></p>
    </div>

    <?php if($quotation->client_name || $quotation->client_email || $quotation->client_phone): ?>
    <div class="client-info">
        <?php if($quotation->client_name): ?><p><strong>Client:</strong> <?php echo e($quotation->client_name); ?></p><?php endif; ?>
        <?php if($quotation->client_email): ?><p><strong>Email:</strong> <?php echo e($quotation->client_email); ?></p><?php endif; ?>
        <?php if($quotation->client_phone): ?><p><strong>Phone:</strong> <?php echo e($quotation->client_phone); ?></p><?php endif; ?>
    </div>
    <?php endif; ?>

    <?php
        $groupedItems = $quotation->items->groupBy('product_id');
        $iteration = 0;
        $totalGroups = count($groupedItems);
    ?>

    <?php $__currentLoopData = $groupedItems; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $productId => $items): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
        <?php 
            $product = $items->first()->product; 
            $iteration++;
        ?>
        
        <div class="product-block">
            <?php if($product && $product->promo_header): ?>
                <p class="promo-header"><?php echo e($product->promo_header); ?></p>
            <?php endif; ?>
            
            <h2 class="product-title"><?php echo e($items->first()->item_name); ?></h2>
            
            <?php if($product && $product->category): ?>
                <p class="product-category">Bidang: <?php echo e($product->category); ?></p>
            <?php endif; ?>

            <ul class="packages-list">
                <?php $__currentLoopData = $items; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $pkg): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <li>
                    <?php echo e($pkg->quantity); ?>x <?php echo e($pkg->package_name); ?>

                    <span class="price">Rp <?php echo e(number_format($pkg->unit_price, 0, ',', '.')); ?></span>
                </li>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            </ul>

            <?php if($product && $product->includes && is_array($product->includes) && count($product->includes) > 0): ?>
                <p class="includes-title">Include:</p>
                <ul class="includes-list">
                    <?php $__currentLoopData = $product->includes; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $inc): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <li><?php echo e($inc); ?></li>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                </ul>
            <?php endif; ?>

            <?php if($product && $product->footer_text): ?>
                <p class="footer-text"><?php echo e($product->footer_text); ?></p>
            <?php endif; ?>
        </div>

        <?php if($iteration < $totalGroups): ?>
            <hr class="divider">
        <?php endif; ?>
    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>

    <div class="grand-totals">
        <?php if($quotation->discount > 0): ?>
        <div class="totals-row">
            <div class="totals-label">Subtotal</div>
            <div class="totals-value">Rp <?php echo e(number_format($quotation->subtotal, 0, ',', '.')); ?></div>
        </div>
        <div class="totals-row">
            <div class="totals-label">Extra Discount</div>
            <div class="totals-value">- Rp <?php echo e(number_format($quotation->discount, 0, ',', '.')); ?></div>
        </div>
        <?php endif; ?>
        <div class="totals-row grand-total-row">
            <div class="totals-label">Total Tagihan</div>
            <div class="totals-value">Rp <?php echo e(number_format($quotation->total_amount, 0, ',', '.')); ?></div>
        </div>
    </div>
    
    <?php if(\App\Models\Setting::get('quotation_terms')): ?>
    <div style="margin-top: 40px; font-size: 12px; color: #666; background: #f8f9fa; padding: 15px; border-radius: 8px;">
        <h4 style="margin: 0 0 5px 0; color: #333;">Terms & Conditions:</h4>
        <p style="margin: 0; white-space: pre-wrap;"><?php echo e(\App\Models\Setting::get('quotation_terms')); ?></p>
    </div>
    <?php endif; ?>
    
    <?php if(\App\Models\Setting::get('quotation_footer')): ?>
    <div style="margin-top: 20px; text-align: center; font-size: 11px; color: #aaa;">
        <?php echo e(\App\Models\Setting::get('quotation_footer')); ?>

    </div>
    <?php endif; ?>

</body>
</html>
<?php /**PATH D:\laragon\www\madly\resources\views/pdf/quotation.blade.php ENDPATH**/ ?>