<template>
    <input class="border-gray-300 border-2 focus:border-accent-300 focus:ring focus:ring-accent-200 focus:ring-opacity-50 rounded-md" :value="value" @input="$emit('input', $event.target.value)" ref="input">
</template>

<script>
    export default {
        props: ['value'],

        methods: {
            focus() {
                this.$refs.input.focus()
            }
        }
    }
</script>

