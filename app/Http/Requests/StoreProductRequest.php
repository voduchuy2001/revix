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
            'branch_id' => ['required_if:type,import', 'integer'],
            'name' => ['required', 'string', 'max:255'],
            'sku' => ['nullable', 'required_if:type,import', 'string', 'max:255'],
            'price' => ['nullable', 'required_if:type,import', 'numeric', 'min:0', 'max:1000000000'],
            'sale_price' =>  ['nullable', 'required_if:type,export', 'numeric', 'min:0', 'max:1000000000'],
            'stock' =>  ['nullable', 'required_if:type,import',  'numeric', 'min:0', 'max:1000000000'],
            'category' => ['nullable', 'string', 'max:255'],
            'note' => ['nullable', 'string', 'max:100000'],
            'type' => ['required', new Enum(ProductType::class)],
        ];
    }

    public function messages(): array
    {
        return [
            'branch_id.required' => 'Chi nhánh là bắt buộc.',
            'branch_id.integer' => 'Chi nhánh phải là một số nguyên.',

            'name.required' => 'Tên sản phẩm là bắt buộc.',
            'name.string' => 'Tên sản phẩm phải là chuỗi ký tự.',
            'name.max' => 'Tên sản phẩm không được vượt quá 255 ký tự.',

            'sku.required_if' => 'SKU là bắt buộc.',
            'sku.string' => 'SKU phải là chuỗi ký tự.',
            'sku.max' => 'SKU không được vượt quá 255 ký tự.',

            'price.required_if' => 'Giá sản phẩm là bắt buộc.',
            'price.numeric' => 'Giá sản phẩm phải là một số.',
            'price.min' => 'Giá sản phẩm không được nhỏ hơn 0.',
            'price.max' => 'Giá sản phẩm không được vượt quá 1 tỷ.',

            'sale_price.required_if' => 'Giá bán là bắt buộc.',
            'sale_price.numeric' => 'Giá bán phải là một số.',
            'sale_price.min' => 'Giá bán không được nhỏ hơn 0.',
            'sale_price.max' => 'Giá bán không được vượt quá 1 tỷ.',

            'stock.required_if' => 'Tồn kho là bắt buộc.',
            'stock.numeric' => 'Tồn kho phải là một số.',
            'stock.min' => 'Tồn kho không được nhỏ hơn 0.',
            'stock.max' => 'Tồn kho không được vượt quá 1 tỷ.',

            'category.string' => 'Danh mục phải là chuỗi ký tự.',
            'category.max' => 'Danh mục không được vượt quá 255 ký tự.',

            'note.string' => 'Ghi chú phải là chuỗi ký tự.',
            'note.max' => 'Ghi chú không được vượt quá 100000 ký tự.',

            'type.required' => 'Loại sản phẩm là bắt buộc.',
        ];
    }

}
