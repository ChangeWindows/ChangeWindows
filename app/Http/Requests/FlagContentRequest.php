<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FlagContentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        if ($this->isMethod('PATCH')) {
            return [
                'name' => ['required', 'min:5', 'string'],
                'description' => ['string']
            ];
        }

        return [
            'name' => ['required', 'string', 'min:5'],
            'description' => ['string']
        ];
    }
}
