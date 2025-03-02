<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class GetRepairTicketRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'search' => ['nullable', 'string', 'max:255'],
            'from' => ['nullable', 'date', 'before_or_equal:to'],
            'to' => ['nullable', 'date', 'after_or_equal:from'],
        ];
    }

    public function messages(): array
    {
        return [
            'from.date' => 'Ngày bắt đầu không hợp lệ.',
            'to.date' => 'Ngày kết thúc không hợp lệ.',
            'from.before_or_equal' => 'Ngày bắt đầu phải trước hoặc bằng ngày kết thúc.',
            'to.after_or_equal' => 'Ngày kết thúc phải sau hoặc bằng ngày bắt đầu.',
            'search.max' => 'Từ khóa tìm kiếm không được quá 255 ký tự.',
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'search' => $this->input('search'),
            'from' => $this->input('from')
                ? Carbon::parse($this->input('from'))->startOfDay()
                : Carbon::now()->startOfMonth(),
            'to' => $this->input('to')
                ? Carbon::parse($this->input('to'))->endOfDay()
                : Carbon::now()->endOfMonth(),
        ]);
    }
}
