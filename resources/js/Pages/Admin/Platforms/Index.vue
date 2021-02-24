<template>
    <app-layout>
        <template #header>
            <h2 class="m-0">Platforms</h2>
            <div>
                <a :href="create_url" class="btn btn-light btn-sm"><i class="far fa-fw fa-plus me-1"></i> New</a>
            </div>
        </template>

        <div class="container my-3">
            <div class="row g-3">
                <card v-for="platform in platforms" :key="platform.id" :color="platform.color">
                    <template #title>
                        <i :class="'me-2 far fa-fw fa-' + platform.icon"></i>
                        {{ platform.name }}
                    </template>
                    <template #actions>
                        <a :href="platform.edit_url" class="btn btn-primary btn-sm">
                            <i class="far fa-pencil me-1"></i> Edit
                        </a>
                    </template>
                </card>
            </div>
        </div>
    </app-layout>
</template>

<script>
    import AppLayout from '@/Layouts/AppLayout'
    import Card from '@/Jetstream/Card'

    export default {
        components: {
            AppLayout,
            Card
        },

        props: {
            platforms: Array,
            create_url: String
        }
    }
</script>
