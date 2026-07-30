<?php
$json = file_get_contents('https://open.er-api.com/v6/latest/USD');
$data = json_decode($json, true);
echo "1 USD = " . $data['rates']['IDR'] . " IDR\n";
