<template>
  <div class="user-list-box">
    <div class="search">
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
        class="feather feather-search"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input
        v-model="searchTerm"
        type="text"
        class="form-control"
        placeholder="Search"
        @keydown.enter="contactFilteredList"
      />
    </div>
    <div class="people">
      <div
        v-for="contact in contactFilteredList"
        :key="contact.id"
        class="person"
        :class="{ selected: contact == selected }"
        @click="userSelect(contact)"
      >
        <div class="user-info">
          <div class="f-head">
            <img v-if="contact && contact.photo" :src="baseURL + contact.photo" alt="avatar" />
            <img v-else src="@/assets/img/90x90.jpg" alt="avatar" />
          </div>
          <div class="f-body">
            <div class="meta-info">
              <span class="user-name">{{ contact && contact.name }}</span>
              <span v-if="contact.unread" class="user-meta-time badge badge-info custom-badge-pill">
                {{ contact.unread }}
              </span>
            </div>
            <small class="branch-name-in-list" style="display: block">{{
              contact.branch && contact.branch.branch_name
            }}</small>
            <span class="preview">{{ contact && contact.user_type }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, toRefs } from 'vue'
import _ from 'lodash'
import { useStore } from 'vuex'

const store = useStore()
const baseURL = computed(() => store.state.baseURL)

const props = defineProps({
  contacts: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['selectedUser'])

const { contacts } = toRefs(props)

const selected = ref(contacts.value.length ? contacts.value[0] : null)
const searchTerm = ref('')

const sortedContacts = computed(() => {
  return _.sortBy(contacts.value, [
    (contact) => {
      if (contact == selected.value) {
        return Infinity
      }
      totalUnreadCount.value = contact?.unread
      return contact?.unread
    },
  ]).reverse()
})

const contactFilteredList = computed(() => {
  return sortedContacts.value.filter((contact) => {
    return contact?.name?.toLowerCase().includes(searchTerm.value.toLowerCase())
  })
})

const totalUnreadCount = computed(() => {
  return _.sumBy(contacts, function (contact) {
    return contact.unread
  })
})

//methods
function userSelect(contact) {
  selected.value = contact
  emit('selectedUser', contact)
}
</script>
<style lang="scss">
.custom-badge-pill {
  color: #fff !important;
}
</style>
