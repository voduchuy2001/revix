<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRepairTicketRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'device_name' => ['required', 'string', 'max:191'],
            'imei' => ['required', 'string', 'max:191'],
            'amount' => ['required', 'integer', 'min:0', 'max:100000000'],
            'note' => ['nullable', 'string', 'max:10000'],
            'condition' => ['required', 'string', 'max:10000'],
            'customer' => ['required'],
            'technician' => ['required'],
            'action' => ['required', 'boolean']
        ];
    }

    public function messages(): array
    {
        return [
            'device_name.required' => 'Tên thiết bị không được để trống.',
            'device_name.string' => 'Tên thiết bị phải là một chuỗi ký tự.',
            'device_name.max' => 'Tên thiết bị không được vượt quá 191 ký tự.',

            'imei.required' => 'Mã IMEI không được để trống.',
            'imei.string' => 'Mã IMEI phải là một chuỗi ký tự.',
            'imei.max' => 'Mã IMEI không được vượt quá 191 ký tự.',

            'amount.required' => 'Chi phí sửa chữa không được để trống.',
            'amount.integer' => 'Chi phí sửa chữa phải là một số nguyên.',
            'amount.min' => 'Chi phí sửa chữa không được nhỏ hơn 0.',
            'amount.max' => 'Chi phí sửa chữa không được vượt quá 100.000.000.',

            'condition.required' => 'Tình trạng thiết bị không được để trống.',
            'condition.string' => 'Tình trạng thiết bị phải là một chuỗi ký tự.',
            'condition.max' => 'Tình trạng thiết bị không được vượt quá 10.000 ký tự.',

            'note.string' => 'Ghi chú phải là một chuỗi ký tự.',
            'note.max' => 'Ghi chú không được vượt quá 10.000 ký tự.',

            'customer.required' => 'Khách hàng không được để trống.',
            'technician.required' => 'Kỹ thuật viên không được để trống.',
        ];
    }
}
