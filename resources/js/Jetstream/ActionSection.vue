<template>
    <div class="row g-3 mt-3">
        <jet-section-title>
            <template #title><slot name="title"></slot></template>
            <template #description><slot name="description"></slot></template>
        </jet-section-title>

        <div class="col-12 col-md-8">
            <div class="shadow rounded border overflow-hidden">
                <div class="p-4">
                    <div class="grid grid-cols-6 gap-6">
                        <slot name="content"></slot>
                    </div>
                </div>

                <div class="bg-light d-flex justify-content-end px-4 py-3" v-if="hasActions">
                    <slot name="actions"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import JetSectionTitle from './SectionTitle'

    export default {
        components: {
            JetSectionTitle,
        },

        computed: {
            hasActions() {
                return !! this.$slots.actions
            }
        }
    }
</script>
