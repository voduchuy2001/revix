<?php

namespace App\Http\Requests;

use App\Enums\UserType;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class UpdateUserRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $type = $this->input('type');

        return [
            'branch_id' => ['nullable', 'required_if:type,user', 'integer'],
            'name' => ['required', 'string', 'max:191'],
            'phone_number' => [
                'required',
                Rule::unique(User::class)
                    ->where(fn ($query) => $query->where('type', $type))
                    ->ignore($this->route('id')),
                'regex:/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/',
            ],
            'address' => ['nullable', 'string', 'max:191'],
            'type' => ['required', new Enum(UserType::class)],
        ];
    }

    public function messages(): array
    {
        return [
            'branch_id.required_if' => 'Chi nhánh là bắt buộc.',
            'branch_id.integer' => 'Chi nhánh phải là một số nguyên.',

            'name.required' => 'Tên không được để trống.',
            'name.string' => 'Tên phải là một chuỗi ký tự.',
            'name.max' => 'Tên không được vượt quá 191 ký tự.',

            'phone_number.required' => 'Số điện thoại không được để trống.',
            'phone_number.regex' => 'Số điện thoại không hợp lệ.',
            'phone_number.unique' => 'Số điện thoại đã tồn tại.',

            'address.string' => 'Địa chỉ phải là một chuỗi ký tự.',
            'address.max' => 'Địa chỉ không được vượt quá 191 ký tự.',

            'type.required' => 'Loại người dùng không được để trống.',
            'type.enum' => 'Loại người dùng không hợp lệ, chỉ chấp nhận "customer" hoặc "user".',
        ];
    }
}
