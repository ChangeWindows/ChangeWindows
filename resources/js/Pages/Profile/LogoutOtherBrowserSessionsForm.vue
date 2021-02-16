<template>
    <jet-action-section>
        <template #title>
            Browser Sessions
        </template>

        <template #description>
            Manage and logout your active sessions on other browsers and devices.
        </template>

        <template #content>
            <p>
                If necessary, you may logout of all of your other browser sessions across all of your devices. Some of your recent sessions are listed below; however, this list may not be exhaustive. If you feel your account has been compromised, you should also update your password.
            </p>

            <!-- Other Browser Sessions -->
            <div class="mt-5 space-y-6" v-if="sessions.length > 0">
                <div class="d-flex align-items-center" v-for="(session, i) in sessions" :key="i">
                    <i class="far fw-fw fa-desktop h4 m-0"></i>

                    <div class="ms-3">
                        <div class="text-sm text-gray-600">
                            {{ session.agent.platform }} - {{ session.agent.browser }}
                        </div>

                        <div>
                            <div class="text-xs text-gray-500">
                                {{ session.ip_address }},

                                <span class="text-green-500 font-semibold" v-if="session.is_current_device">this device</span>
                                <span v-else>last active {{ session.last_active }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Logout Other Devices Confirmation Modal -->
            <jet-dialog-modal id="confirmingLogoutModal">
                <template #title>
                    Logout everywhere
                </template>

                <template #content>
                    Please enter your password to confirm you would like to logout on all your devices.

                    <div class="mt-4 form-floating">
                        <jet-input type="password" placeholder="Password"
                                    ref="password" id="password"
                                    v-model="form.password" :class="{ 'is-invalid': form.errors.password }"
                                    @keyup.enter.native="logoutOtherBrowserSessions" />
                        <jet-label for="password" value="Password" />
                        <jet-input-error :message="form.errors.password" />
                    </div>

                </template>

                <template #footer>
                    <jet-secondary-button @click.native="closeModal">
                        Nevermind
                    </jet-secondary-button>

                    <jet-button @click.native="logoutOtherBrowserSessions" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                        Logout everywhere
                    </jet-button>
                </template>
            </jet-dialog-modal>
        </template>

        <template #actions>
            <jet-action-message :on="form.recentlySuccessful">
                Done.
            </jet-action-message>

            <jet-button @click.native="confirmLogout">
                Logout everywhere
            </jet-button>
        </template>
    </jet-action-section>
</template>

<script>
    import JetActionMessage from '@/Jetstream/ActionMessage'
    import JetActionSection from '@/Jetstream/ActionSection'
    import JetButton from '@/Jetstream/Button'
    import JetDialogModal from '@/Jetstream/DialogModal'
    import JetInput from '@/Jetstream/Input'
    import JetInputError from '@/Jetstream/InputError'
    import JetLabel from '@/Jetstream/Label'
    import JetSecondaryButton from '@/Jetstream/SecondaryButton'

    export default {
        props: ['sessions'],

        components: {
            JetActionMessage,
            JetActionSection,
            JetButton,
            JetDialogModal,
            JetInput,
            JetInputError,
            JetLabel,
            JetSecondaryButton,
        },

        data() {
            return {
                confirmingLogout: false,

                form: this.$inertia.form({
                    password: '',
                })
            }
        },

        methods: {
            confirmLogout() {
                this.form.password = ''

                this.modal = new Bootstrap.Modal(document.getElementById('confirmingLogoutModal'))
                this.modal.toggle()

                setTimeout(() => this.$refs.password.focus(), 250)
            },

            logoutOtherBrowserSessions() {
                this.form.delete(route('other-browser-sessions.destroy'), {
                    preserveScroll: true,
                    onSuccess: () => this.closeModal(),
                    onError: () => this.$refs.password.focus(),
                    onFinish: () => this.form.reset(),
                })
            },

            closeModal() {
                this.confirmingLogout = false

                this.form.reset()
            },
        },
    }
</script>
