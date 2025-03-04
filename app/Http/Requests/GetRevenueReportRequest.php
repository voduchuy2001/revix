<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class GetRevenueReportRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'from' => ['nullable', 'date'],
            'to' => ['nullable', 'date'],
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'from' => $this->input('from')
                ? Carbon::parse($this->input('from'))->startOfDay()->toDateString()
                : Carbon::now()->startOfMonth()->toDateString(),
            'to' => $this->input('to')
                ? Carbon::parse($this->input('to'))->endOfDay()->toDateString()
                : Carbon::now()->endOfMonth()->toDateString(),
        ]);
    }
}
