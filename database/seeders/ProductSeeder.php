<?php

namespace Database\Seeders;

use App\Enums\ProductType;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'branch_id'   => 1,
                'name'        => 'Product A',
                'sku'         => 'SKU001',
                'price'       => 100000,
                'sale_price'  => 90000,
                'stock'       => 50,
                'category'    => 'Electronics',
                'note'        => 'Best seller',
                'type'        => ProductType::IMPORT->value,
                'created_by'  => 1,
                'updated_by'  => 1,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'branch_id'   => 1,
                'name'        => 'Product B',
                'sku'         => 'SKU002',
                'price'       => 150000,
                'sale_price'  => 120000,
                'stock'       => 30,
                'category'    => 'Electronics',
                'note'        => null,
                'type'        => ProductType::IMPORT->value,
                'created_by'  => 1,
                'updated_by'  => 1,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'branch_id'   => 1,
                'name'        => 'Product C',
                'sku'         => 'SKU003',
                'price'       => 200000,
                'sale_price'  => 180000,
                'stock'       => 20,
                'category'    => 'Furniture',
                'note'        => 'Limited stock',
                'type'        => ProductType::EXPORT->value,
                'created_by'  => 2,
                'updated_by'  => 2,
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
        ];

        Product::insert($products);
    }
}
