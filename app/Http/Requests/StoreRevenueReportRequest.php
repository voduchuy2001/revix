<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreRevenueReportRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'branch_id' => ['sometimes', 'exists:branches,id'],
            'date' => ['required', 'date'],
            'content' => ['nullable', 'string', 'max:100000'],
            'amount' => ['required', 'numeric', 'min:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'branch_id.exists' => 'Chi nhánh không hợp lệ.',

            'date.required' => 'Vui lòng chọn ngày.',
            'date.date' => 'Ngày không hợp lệ.',

            'content.string' => 'Nội dung phải là chuỗi ký tự.',
            'content.max' => 'Nội dung không được vượt quá :max ký tự.',
            'amount.required' => 'Vui lòng nhập số tiền.',
            'amount.numeric' => 'Số tiền phải là một số hợp lệ.',
            'amount.min' => 'Số tiền không được âm.',
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            if (Auth::user()->isSuperUser() && !$this->input('branch_id')) {
                $validator->errors()->add('branch_id', 'Vui lòng chọn chi nhánh.');
            }
        });
    }
}
