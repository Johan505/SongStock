<?php

namespace App\Http\Requests\VinylDisc;

use Illuminate\Foundation\Http\FormRequest;

class ReqVinylDisc extends FormRequest
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
            'artist' => ['required', 'string'],
            'releaseyear' =>  ['required', 'date'],
            'price' => ['required', 'string'],
            'amount' => ['required', 'string'],
            'img' => ['required'],
            'format' => ['required', 'string'],
            'description' => ['required', 'string'],
            'state' => ['required', 'string'],
            'condition' => ['required', 'string'],
<<<<<<< HEAD
            'observations' => ['required', 'string'],
            'id_user' => ['required']
=======
            'observations' => ['required', 'string']
>>>>>>> Santiago
        ];
    }

}
