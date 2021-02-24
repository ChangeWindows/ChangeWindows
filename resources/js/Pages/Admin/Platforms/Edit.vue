<template>
    <app-layout>
        <template #header>
            <h2 class="m-0">
                <i :class="'me-2 far fa-fw fa-' + platform.icon"></i>
                {{ platform.name }}
            </h2>
        </template>

        <div class="container my-3">
            <form>
                <div class="row g-3">
                    <div class="col-12">
                        <h4>Basic information</h4>
                    </div>
                    <div class="col-4">
                        <div class="form-floating">
                            <jet-input id="name" v-model="platform.name" ref="name" placeholder="Name" />
                            <jet-label for="name" value="Name" />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </app-layout>
</template>

<script>
    import AppLayout from '@/Layouts/AppLayout'
    import Card from '@/Jetstream/Card'
    import JetInput from '@/Jetstream/Input'
    import JetLabel from '@/Jetstream/Label'

    export default {
        components: {
            AppLayout,
            Card,
            JetInput,
            JetLabel,
        },

        props: {
            platform: Object,
            create_url: String
        }
    }
</script>
