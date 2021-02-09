<template>
    <button :type="type" class="inline-flex items-center justify-center px-3 py-1 bg-red-600 border border-transparent rounded-md font-semibold text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500 focus:ring-opacity-50 active:bg-red-600 transition ease-in-out duration-150">
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
