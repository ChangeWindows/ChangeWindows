<template>
    <jet-authentication-card>
        <jet-validation-errors class="mb-4" />

        <form @submit.prevent="submit">
            <div class="form-floating">
                <jet-input id="email" type="email" class="mt-1 block w-full" v-model="form.email" required autofocus />
                <jet-label for="email" value="Email" />
            </div>

            <div class="mt-4 form-floating">
                <jet-input id="password" type="password" class="mt-1 block w-full" v-model="form.password" required autocomplete="new-password" />
                <jet-label for="password" value="Password" />
            </div>

            <div class="mt-4 form-floating">
                <jet-input id="password_confirmation" type="password" class="mt-1 block w-full" v-model="form.password_confirmation" required autocomplete="new-password" />
                <jet-label for="password_confirmation" value="Confirm Password" />
            </div>

            <div class="d-flex justify-content-between align-items-center mt-3">
                <jet-button :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    Reset Password
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

        props: {
            email: String,
            token: String,
        },

        data() {
            return {
                form: this.$inertia.form({
                    token: this.token,
                    email: this.email,
                    password: '',
                    password_confirmation: '',
                })
            }
        },

        methods: {
            submit() {
                this.form.post(this.route('password.update'), {
                    onFinish: () => this.form.reset('password', 'password_confirmation'),
                })
            }
        }
    }
</script>
