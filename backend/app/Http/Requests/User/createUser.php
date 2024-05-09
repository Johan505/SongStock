<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class createUser extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string'],
            'lastname' => ['required', 'string'],
            'identification' =>  ['required'],
            'email' => ['required', 'email'],
            'phone' => ['required', ],
            'id_rol' => ['required'],
            'password' => ['required'],
        ];
    }

    public function messages()
    {

        return [
            'name.required' => 'Name is required.',
            'name.string' => 'Name should be a text string.',

            'lastname.required' => 'Lastname is required.',
            'lastname.string' => 'lastName should be a text string.',

            'identification.required' => 'ID is required.',

            'email.required' => 'Email is required.',
            'email.email' => 'Email should be a valid email.',

            'phone.required' => 'Phone is required.',

            'id_rol.required' => 'Rol is required.',

            'password.required' => 'Password is required.',

        ];
    }
}
