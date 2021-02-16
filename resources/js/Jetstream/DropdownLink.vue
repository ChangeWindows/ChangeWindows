<template>
    <div>
        <button type="submit" class="dropdown-item" v-if="as == 'button'">
            <slot></slot>
        </button>

        <li v-else>
            <inertia-link :href="href" class="dropdown-item">
                <slot></slot>
            </inertia-link>
        </li>
    </div>
</template>

<script>
    export default {
        props: ['href', 'as']
    }
</script>
