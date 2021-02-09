<template>
    <button :type="type" class="inline-flex items-center px-3 py-1 bg-accent-500 border border-transparent rounded-md font-semibold text-white hover:bg-accent-400 active:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accent-500 focus:ring-opacity-50 transition ease-in-out duration-150">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                default: 'submit',
            },
        }
    }
</script>
