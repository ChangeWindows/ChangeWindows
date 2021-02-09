<template>
    <button :type="type" class="inline-flex items-center px-3 py-1 bg-gray-200 rounded-md font-semibold text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 focus:ring-opacity-50 active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                default: 'button',
            },
        }
    }
</script>
