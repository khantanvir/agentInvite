<template>
  <div v-if="user" class="page-header page-header-scrollspy">
    <nav class="breadcrumb-one" aria-label="breadcrumb">
      <div class="title">
        <h3>{{ routePath.replace(/_/g, ' ') }}</h3>
      </div>
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          <a>{{ routePath.replace(/_/g, ' ') }}</a>
        </li>
        <!-- <li class="breadcrumb-item active" aria-current="page">
          <a href="javascript:void(0);">Cards</a>
        </li> -->
      </ol>
    </nav>

    <div class="toggle-switch">
      <label class="switch s-icons s-outline s-outline-secondary">
        <input type="checkbox" :checked="isDark" class="theme-shifter" @change="isDark = !isDark" />
        <span class="slider round">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-sun"
          >
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-moon"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </span>
      </label>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useDark } from '@vueuse/core'

const store = useStore()
const route = useRoute()
const user = computed(() => store.getters.user)
const routePath = computed(() => String(route.name))

const isDark = useDark({
  selector: 'body',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light',
})
</script>