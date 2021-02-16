<template>
    <div v-show="message" class="invalid-feedback">
        {{ message }}
    </div>
</template>

<script>
    export default {
        props: ['message']
    }
</script>
