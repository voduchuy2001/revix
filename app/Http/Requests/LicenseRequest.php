<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class LicenseRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'username' => ['required', 'string'],
            'password' => ['required', 'string']
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'message' => 'Validation failed',
            'errors' => $validator->errors(),
        ], 422));
    }
}
