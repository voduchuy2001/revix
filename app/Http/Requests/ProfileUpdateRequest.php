<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
            'phone_number' => ['nullable', 'regex:/^(0?)(3[2-9]|5[689]|7[06789]|8[0-689]|9[0-46-9])[0-9]{7}$/']
        ];
    }

    public function messages()
    {
        return [
            'phone_number.regex' => 'Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại di động Việt Nam.',
        ];
    }

}
