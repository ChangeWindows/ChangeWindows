<template>
    <jet-authentication-card>
        <jet-validation-errors class="mb-4" />

        <form @submit.prevent="submit">
            <div class="form-floating">
                <jet-input id="name" type="text" class="mt-1 block w-full" v-model="form.name" required autofocus autocomplete="name" />
                <jet-label for="name" value="Name" />
            </div>

            <div class="mt-4 form-floating">
                <jet-input id="email" type="email" class="mt-1 block w-full" v-model="form.email" required />
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

            <div class="mt-4" v-if="$page.props.jetstream.hasTermsAndPrivacyPolicyFeature">
                <jet-label for="terms">
                    <div class="form-check">
                        <jet-checkbox name="terms" id="terms" v-model="form.terms" />

                        <label class="form-check-label">
                            I agree to the <a target="_blank" :href="route('terms.show')" class="underline text-sm text-gray-600 hover:text-gray-900">Terms of Service</a> and <a target="_blank" :href="route('policy.show')" class="underline text-sm text-gray-600 hover:text-gray-900">Privacy Policy</a>
                        </label>
                    </div>
                </jet-label>
            </div>

            <div class="d-flex justify-content-between align-items-center mt-3">
                <inertia-link :href="route('login')">
                    Already registered?
                </inertia-link>

                <jet-button :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    Register
                </jet-button>
            </div>
        </form>
    </jet-authentication-card>
</template>

<script>
    import JetAuthenticationCard from '@/Jetstream/AuthenticationCard'
    import JetButton from '@/Jetstream/Button'
    import JetInput from '@/Jetstream/Input'
    import JetCheckbox from "@/Jetstream/Checkbox";
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

        data() {
            return {
                form: this.$inertia.form({
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                    terms: false,
                })
            }
        },

        methods: {
            submit() {
                this.form.post(this.route('register'), {
                    onFinish: () => this.form.reset('password', 'password_confirmation'),
                })
            }
        }
    }
</script>
