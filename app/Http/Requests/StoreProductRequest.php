<?php

namespace App\Http\Requests;

use App\Enums\ProductType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class StoreProductRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'branch_id' => ['required', 'integer'],
            'name' => ['required', 'string', 'max:255'],
            'sku' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0', 'max:1000000000'],
            'sale_price' =>  ['required', 'numeric', 'min:0', 'max:1000000000'],
            'stock' =>  ['required', 'numeric', 'min:0', 'max:1000000000'],
            'category' => ['required', 'string', 'max:255'],
            'note' => ['nullable', 'string', 'max:100000'],
            'type' => ['required', new Enum(ProductType::class)],
        ];
    }
}
