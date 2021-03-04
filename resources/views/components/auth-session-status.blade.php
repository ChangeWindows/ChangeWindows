@props(['status'])

@if ($status)
    <div {{ $attributes->merge(['class' => 'text-success']) }}>
        {{ $status }}
    </div>
@endif
