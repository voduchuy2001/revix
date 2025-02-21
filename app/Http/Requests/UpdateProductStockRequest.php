<?php

namespace App\Http\Requests;

use App\Enums\ProductType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class UpdateProductStockRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'stock' =>  ['required', 'numeric', 'min:1', 'max:1000000000'],
            'note' => ['nullable', 'string', 'max:100000'],
            'type' => ['required', new Enum(ProductType::class)],
        ];
    }

    public function messages(): array
    {
        return [
            'stock.required' => 'Tồn kho là bắt buộc.',
            'stock.numeric' => 'Tồn kho phải là một số.',
            'stock.min' => 'Tồn kho không được nhỏ hơn 1.',
            'stock.max' => 'Tồn kho không được vượt quá 1 tỷ.',

            'note.string' => 'Ghi chú phải là chuỗi ký tự.',
            'note.max' => 'Ghi chú không được vượt quá 100000 ký tự.',

            'type.required' => 'Loại sản phẩm là bắt buộc.',
        ];
    }
}
