<template>
    <jet-authentication-card>
        <div class="mb-4">
            This is a secure area of the application. Please confirm your password before continuing.
        </div>

        <jet-validation-errors class="mb-4" />

        <form @submit.prevent="submit">
            <div class="form-floating">
                <jet-input id="password" type="password" class="mt-1 block w-full" v-model="form.password" required autocomplete="current-password" autofocus />
                <jet-label for="password" value="Password" />
            </div>

            <div class="d-flex justify-content-between align-items-center mt-3">
                <jet-button :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    Confirm
                </jet-button>
            </div>
        </form>
    </jet-authentication-card>
</template>

<script>
    import JetAuthenticationCard from '@/Jetstream/AuthenticationCard'
    import JetButton from '@/Jetstream/Button'
    import JetInput from '@/Jetstream/Input'
    import JetLabel from '@/Jetstream/Label'
    import JetValidationErrors from '@/Jetstream/ValidationErrors'

    export default {
        components: {
            JetAuthenticationCard,
            JetButton,
            JetInput,
            JetLabel,
            JetValidationErrors
        },

        data() {
            return {
                form: this.$inertia.form({
                    password: '',
                })
            }
        },

        methods: {
            submit() {
                this.form.post(this.route('password.confirm'), {
                    onFinish: () => this.form.reset(),
                })
            }
        }
    }
</script>
