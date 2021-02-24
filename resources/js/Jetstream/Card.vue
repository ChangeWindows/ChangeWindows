<template>
    <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div class="card shadow border-0">
            <div class="card-header py-3 border-0 text-white" :style="'background-color: ' + color">
                <h3 class="h5 m-0">
                    <slot name="title"></slot>
                </h3>
            </div>

            <div class="card-footer d-flex border-0 py-3" v-if="hasActions">
                <slot name="actions"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {
        },

        props: {
            color: String
        },

        computed: {
            hasActions() {
                return !! this.$slots.actions
            }
        }
    }
</script>
