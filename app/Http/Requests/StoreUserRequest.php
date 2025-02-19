<?php

namespace App\Http\Requests;

use App\Enums\UserType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class StoreUserRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:191'],
            'phone_number' => [
                'required',
                'regex:/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/',
            ],
            'address' => ['required', 'string', 'max:191'],
            'type' => ['required', new Enum(UserType::class)],
            'email' => ['nullable', 'required_if:type,user', 'email', 'unique:users,email'],
            'password' => ['nullable', 'required_if:type,user', 'string','max:64'],
            'password_confirmation' => ['required_with:password', 'same:password'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Tên không được để trống.',
            'name.string' => 'Tên phải là một chuỗi ký tự.',
            'name.max' => 'Tên không được vượt quá 191 ký tự.',

            'phone_number.required' => 'Số điện thoại không được để trống.',
            'phone_number.regex' => 'Số điện thoại không hợp lệ.',
            'phone_number.unique' => 'Số điện thoại đã tồn tại.',

            'address.required' => 'Địa chỉ không được để trống.',
            'address.string' => 'Địa chỉ phải là một chuỗi ký tự.',
            'address.max' => 'Địa chỉ không được vượt quá 191 ký tự.',

            'type.required' => 'Loại người dùng không được để trống.',
            'type.enum' => 'Loại người dùng không hợp lệ, chỉ chấp nhận "customer" hoặc "user".',

            'email.required_if' => 'Email là bắt buộc.',
            'email.email' => 'Email không hợp lệ.',
            'email.unique' => 'Email này đã được sử dụng.',

            'password.required_if' => 'Mật khẩu là bắt buộc.',
            'password.string' => 'Mật khẩu phải là chuỗi ký tự.',
            'password.max' => 'Mật khẩu không được vượt quá 64 ký tự.',

            'password_confirmation.same' => 'Mật khẩu xác nhận không khớp với mật khẩu.',
        ];
    }
}
