<template>
    <jet-authentication-card>
        <jet-validation-errors class="mb-4" />

        <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
            {{ status }}
        </div>

        <form @submit.prevent="submit">
            <div class="form-floating">
                <jet-input id="email" type="email" class="mt-1 block w-full" v-model="form.email" required autofocus />
                <jet-label for="email" value="Email" />
            </div>

            <div class="mt-4 form-floating">
                <jet-input id="password" type="password" class="mt-1 block w-full" v-model="form.password" required autocomplete="current-password" />
                <jet-label for="password" value="Password" />
            </div>

            <div class="mt-4">
                <div class="form-check">
                    <jet-checkbox name="remember" id="remember" v-model="form.remember" />
                    <label class="form-check-label" for="remember">Remember me</label>
                </div>
            </div>

            <div class="d-flex justify-content-between align-items-center mt-3">
                <inertia-link v-if="canResetPassword" :href="route('password.request')">
                    Forgot your password?
                </inertia-link>

                <jet-button :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    Login
                </jet-button>
            </div>
        </form>
    </jet-authentication-card>
</template>

<script>
    import JetAuthenticationCard from '@/Jetstream/AuthenticationCard'
    import JetButton from '@/Jetstream/Button'
    import JetInput from '@/Jetstream/Input'
    import JetCheckbox from '@/Jetstream/Checkbox'
    import JetLabel from '@/Jetstream/Label'
    import JetValidationErrors from '@/Jetstream/ValidationErrors'

    export default {
        components: {
            JetAuthenticationCard,
            JetButton,
            JetInput,
            JetCheckbox,
            JetLabel,
            JetValidationErrors
        },

        props: {
            canResetPassword: Boolean,
            status: String
        },

        data() {
            return {
                form: this.$inertia.form({
                    email: '',
                    password: '',
                    remember: false
                })
            }
        },

        methods: {
            submit() {
                this.form
                    .transform(data => ({
                        ... data,
                        remember: this.form.remember ? 'on' : ''
                    }))
                    .post(this.route('login'), {
                        onFinish: () => this.form.reset('password'),
                    })
            }
        }
    }
</script>
