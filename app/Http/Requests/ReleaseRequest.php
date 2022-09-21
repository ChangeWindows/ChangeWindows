<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReleaseRequest extends FormRequest
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
     * @return array
     */
    public function rules()
    {
        if ($this->isMethod('PATCH')) {
            return [
                'name' => ['required', 'string'],
                'version' => ['required', 'string'],
                'canonical_version' => ['required', 'numeric'],
                'codename' => ['required'],
                'description' => ['nullable'],
                'changelog' => ['nullable'],
                'ongoing' => [],
                'start_preview' => ['nullable', 'date'],
                'start_public' => ['nullable', 'date'],
                'start_extended' => ['nullable', 'date'],
                'start_lts' => ['nullable', 'date'],
                'end_lts' => ['nullable', 'date'],
                'start_build' => ['required', 'numeric'],
                'start_delta' => ['required', 'numeric'],
                'end_build' => ['required', 'numeric'],
                'end_delta' => ['required', 'numeric']
            ];
        }

        return [
            'name' => ['required', 'string'],
            'version' => ['required', 'string'],
            'canonical_version' => ['required', 'numeric'],
            'codename' => ['required'],
            'description' => ['nullable'],
            'changelog' => ['nullable'],
            'ongoing' => [],
            'platform_id' => ['required'],
            'start_preview' => ['nullable', 'date'],
            'start_public' => ['nullable', 'date'],
            'start_extended' => ['nullable', 'date'],
            'start_lts' => ['nullable', 'date'],
            'end_lts' => ['nullable', 'date'],
            'start_build' => ['required', 'numeric'],
            'start_delta' => ['required', 'numeric'],
            'end_build' => ['required', 'numeric'],
            'end_delta' => ['required', 'numeric']
        ];
    }
}
