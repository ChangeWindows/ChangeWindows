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
                'name' => ['required', 'string'],
                'description' => ['string']
            ];
        }

        return [
            'name' => ['required', 'string'],
            'description' => ['string'],
            'user_id' => []
        ];
    }
}
