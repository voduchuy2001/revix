<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRepairSettingRequest extends FormRequest
{
    public function rules(): array
    {
        return [
           'setting.type' => 'required|string|max:255',
           'setting.name' => 'required|string|max:255',
           'setting.short_description' => 'nullable|string|max:500',
           'setting.website' => 'nullable|url',
           'setting.policies' => 'required|array|min:1',
           'setting.policies.*' => 'string|max:500',
           'setting.branches' => 'required|array|min:1',
           'setting.branches.*' => 'string|max:500',
           'setting.support_phone_number' => 'nullable|string|max:15',

           'branchesData' => 'required|array|min:1',
           'branchesData.*.id' => 'required|integer',
           'branchesData.*.phone_number' => 'required|string|max:15',
           'branchesData.*.address' => 'required|string|max:255',
        ];
        ;
    }

    public function messages()
    {
        return [
            'setting.type.required' => 'Loại hình kinh doanh không được để trống.',
            'setting.type.string' => 'Loại hình kinh doanh phải là chuỗi ký tự.',
            'setting.type.max' => 'Loại hình kinh doanh không được vượt quá 255 ký tự.',

            'setting.name.required' => 'Tên cửa hàng không được để trống.',
            'setting.name.string' => 'Tên cửa hàng phải là chuỗi ký tự.',
            'setting.name.max' => 'Tên cửa hàng không được vượt quá 255 ký tự.',

            'setting.short_description.string' => 'Mô tả ngắn phải là chuỗi ký tự.',
            'setting.short_description.max' => 'Mô tả ngắn không được vượt quá 500 ký tự.',

            'setting.website.url' => 'Địa chỉ website không hợp lệ.',

            'setting.policies.required' => 'Chính sách cửa hàng không được để trống.',
            'setting.policies.array' => 'Chính sách cửa hàng phải là mảng dữ liệu.',
            'setting.policies.min' => 'Phải có ít nhất một chính sách.',
            'setting.policies.*.string' => 'Mỗi chính sách phải là chuỗi ký tự.',
            'setting.policies.*.max' => 'Chính sách không được vượt quá 500 ký tự.',

            'setting.branches.required' => 'Danh sách chi nhánh không được để trống.',
            'setting.branches.array' => 'Danh sách chi nhánh phải là mảng dữ liệu.',
            'setting.branches.min' => 'Phải có ít nhất một chi nhánh.',
            'setting.branches.*.string' => 'Mỗi chi nhánh phải là chuỗi ký tự.',
            'setting.branches.*.max' => 'Tên chi nhánh không được vượt quá 500 ký tự.',

            'setting.support_phone_number.string' => 'Số điện thoại hỗ trợ phải là chuỗi ký tự.',
            'setting.support_phone_number.max' => 'Số điện thoại hỗ trợ không được vượt quá 15 ký tự.',

            'branchesData.required' => 'Danh sách chi nhánh không được để trống.',
            'branchesData.array' => 'Danh sách chi nhánh phải là mảng dữ liệu.',
            'branchesData.min' => 'Phải có ít nhất một chi nhánh.',

            'branchesData.*.id.required' => 'Mã ID của chi nhánh không được để trống.',
            'branchesData.*.id.integer' => 'Mã ID của chi nhánh phải là số nguyên.',

            'branchesData.*.phone_number.required' => 'Số điện thoại chi nhánh không được để trống.',
            'branchesData.*.phone_number.string' => 'Số điện thoại chi nhánh phải là chuỗi ký tự.',
            'branchesData.*.phone_number.max' => 'Số điện thoại chi nhánh không được vượt quá 15 ký tự.',

            'branchesData.*.address.required' => 'Địa chỉ chi nhánh không được để trống.',
            'branchesData.*.address.string' => 'Địa chỉ chi nhánh phải là chuỗi ký tự.',
            'branchesData.*.address.max' => 'Địa chỉ chi nhánh không được vượt quá 255 ký tự.',
        ];
    }

}
