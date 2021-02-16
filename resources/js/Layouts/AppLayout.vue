<template>
  <div>
    <jet-banner />

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand fw-bold" :href="route('home')"
          ><i class="far fa-fw fa-sun-haze"></i> Horizon</a
        >
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <jet-nav-link
              :href="route('dashboard')"
              :active="route().current('dashboard')"
            >
              Dashboard
            </jet-nav-link>
          </ul>
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <jet-dropdown id="settingsDropdown">
              <template #trigger>
                <img
                  v-if="$page.props.jetstream.managesProfilePhotos"
                  class="rounded-circle"
                  width="32"
                  height="32"
                  :src="$page.props.user.profile_photo_url"
                  :alt="$page.props.user.name"
                />
                <span v-else>{{ $page.props.user.name }}</span>

                <i class="far fa-fw fa-angle-down"></i>
              </template>
              <template #content>
                <li><h6 class="dropdown-header">Manage account</h6></li>

                <jet-dropdown-link :href="route('profile.show')">
                  Profile
                </jet-dropdown-link>

                <jet-dropdown-link
                  :href="route('api-tokens.index')"
                  v-if="$page.props.jetstream.hasApiFeatures"
                >
                  API Tokens
                </jet-dropdown-link>

                <li><hr class="dropdown-divider" /></li>

                <form @submit.prevent="logout">
                  <jet-dropdown-link as="button"> Logout </jet-dropdown-link>
                </form>
              </template>
            </jet-dropdown>
          </ul>
        </div>
      </div>
    </nav>
    <div>
      <!-- Page Heading -->
      <header class="bg-primary text-white" v-if="$slots.header">
        <div class="container py-3">
          <slot name="header"></slot>
        </div>
      </header>

      <!-- Page Content -->
      <main>
        <slot></slot>
      </main>

      <!-- Modal Portal -->
      <portal-target name="modal" multiple> </portal-target>
    </div>
  </div>
</template>

<script>
import JetBanner from "@/Jetstream/Banner";
import JetDropdown from "@/Jetstream/Dropdown";
import JetDropdownLink from "@/Jetstream/DropdownLink";
import JetNavLink from "@/Jetstream/NavLink";

export default {
  components: {
    JetBanner,
    JetDropdown,
    JetDropdownLink,
    JetNavLink,
  },

  data() {
    return {
      showingNavigationDropdown: false,
    };
  },

  methods: {
    logout() {
      this.$inertia.post(route("logout"));
    },
  },
};
</script>

