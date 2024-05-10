<?php

namespace App\Http\Requests\Song;

use Illuminate\Foundation\Http\FormRequest;

class createSong extends FormRequest
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
            'price' => ['required', 'string'],
            'duration' =>  ['required', 'string'],
            'mb' => ['required', 'string'],
            'kbps' => ['required', 'string'],
            'gender' => ['required', 'string'],
            'artist' => ['required', 'string'],
        ];
    }

    public function messages()
    {

        return [
            'name.required' => 'Name is required.',
            'name.string' => 'Name should be a text string.',

            'price.required' => 'Lastname is required.',
            'price.string' => 'lastName should be a text string.',

            'duration.required' => 'ID is required.',

            'mb.required' => 'ID is required.',

            'kbps.required' => 'ID is required.',

            'gender.required' => 'Email is required.',
            'gender.email' => 'Email should be a valid email.',

            'artist.required' => 'Phone is required.',

        ];
    }
}