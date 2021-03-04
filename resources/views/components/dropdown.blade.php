@props(['align' => 'left'])

@php
switch ($align) {
    case 'right':
        $alignmentClasses = 'dropdown-menu-end';
        break;
    case 'left':
    default:
        $alignmentClasses = 'dropdown-menu-end';
        break;
}
@endphp

<li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        {{ $trigger }}
    </a>
    <ul class="dropdown-menu {{ $alignmentClasses }}" aria-labelledby="navbarDropdown">
        {{ $content }}
    </ul>
</li>