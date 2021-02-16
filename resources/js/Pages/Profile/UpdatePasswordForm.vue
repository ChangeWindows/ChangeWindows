<template>
    <jet-form-section @submitted="updatePassword">
        <template #title>
            Update Password
        </template>

        <template #description>
            Ensure your account is using a long, random password to stay secure.
        </template>

        <template #form>
            <div class="form-floating">
                <jet-input id="current_password" type="password" v-model="form.current_password" ref="current_password" autocomplete="current-password" placeholder="Current password" :class="{ 'is-invalid': form.errors.current_password }" />
                <jet-label for="current_password" value="Current password" />
                <jet-input-error :message="form.errors.current_password" />
            </div>

            <div class="form-floating mt-4">
                <jet-input id="password" type="password" v-model="form.password" ref="password" autocomplete="new-password" placeholder="New password" :class="{ 'is-invalid': form.errors.password }" />
                <jet-label for="password" value="New password" />
                <jet-input-error :message="form.errors.password" />
            </div>

            <div class="form-floating mt-4">
                <jet-input id="password_confirmation" type="password" v-model="form.password_confirmation" autocomplete="new-password" placeholder="Confirm password" :class="{ 'is-invalid': form.errors.password_confirmation }" />
                <jet-label for="password_confirmation" value="Confirm password" />
                <jet-input-error :message="form.errors.password_confirmation" />
            </div>
        </template>

        <template #actions>
            <jet-action-message :on="form.recentlySuccessful" class="mr-3">
                Saved.
            </jet-action-message>

            <jet-button :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                Save
            </jet-button>
        </template>
    </jet-form-section>
</template>

<script>
    import JetActionMessage from '@/Jetstream/ActionMessage'
    import JetButton from '@/Jetstream/Button'
    import JetFormSection from '@/Jetstream/FormSection'
    import JetInput from '@/Jetstream/Input'
    import JetInputError from '@/Jetstream/InputError'
    import JetLabel from '@/Jetstream/Label'

    export default {
        components: {
            JetActionMessage,
            JetButton,
            JetFormSection,
            JetInput,
            JetInputError,
            JetLabel,
        },

        data() {
            return {
                form: this.$inertia.form({
                    current_password: '',
                    password: '',
                    password_confirmation: '',
                }),
            }
        },

        methods: {
            updatePassword() {
                this.form.put(route('user-password.update'), {
                    errorBag: 'updatePassword',
                    preserveScroll: true,
                    onSuccess: () => this.form.reset(),
                    onError: () => {
                        if (this.form.errors.password) {
                            this.form.reset('password', 'password_confirmation')
                            this.$refs.password.focus()
                        }

                        if (this.form.errors.current_password) {
                            this.form.reset('current_password')
                            this.$refs.current_password.focus()
                        }
                    }
                })
            },
        },
    }
</script>
