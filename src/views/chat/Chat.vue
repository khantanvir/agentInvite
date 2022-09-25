<template>
  <div id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
    <div class="statbox widget box box-shadow">
      <div class="widget-content widget-content-area">
        <div class="chat-section">
          <div class="row">
            <div class="col-xl-12 col-lg-12 col-md-12">
              <div class="chat-system">
                <div class="hamburger">
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
                    class="feather feather-menu mail-menu d-lg-none"
                  >
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                </div>
                <!-- user list box here -->

                <UserSelection :contacts="contacts" @selectedUser="startConversationWith" />

                <UserMessage
                  :is-user-selected="isSelectUser"
                  :selected-user-id="selectedUserId"
                  :messages="messages"
                  :send-user="sendUser"
                  @reloadMessage="saveNewMessage"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, nextTick } from 'vue'
import { useStore } from 'vuex'
import Notify from '@/helpers/Notify'
import UserSelection from '@/views/chat/UserSelection.vue'
import UserMessage from '@/views/chat/UserMessage.vue'
import Request from '@/apis/Request'

const store = useStore()
const user = computed(() => store.getters.user)

const isLoading = ref(false)
const contacts = ref([])
const messages = ref([])
const isSelectUser = ref(false)
const selectedUserId = ref('')
const sendUser = ref('')

async function fetchPrimary() {
  await allUsers()

  window.Echo.channel(`chat-with.${user.value.id}`).listen('MessageSendEvent', (e) => {
    handleIncoming(e.message)
  })
}
//methods
async function allUsers() {
  isLoading.value = true
  try {
    const res = await Request.GET_REQ(`/contact-list/${user.value.id}`)
    contacts.value = res.data
  } catch (error) {
    Notify.error(error.message)
  } finally {
    isLoading.value = false
  }
}
async function startConversationWith(contact) {
  updateUnreadCount(contact, true)
  selectedUserId.value = contact.id
  try {
    const res = await Request.GET_REQ(`user-message/${contact.id}`)
    messages.value = res.data.messages.data
    sendUser.value = res.data.user
    isSelectUser.value = true
    await store.dispatch('unreadMsg')
  } catch (error) {
    Notify.error(error.message)
  }

  selectedCssStyle()
}
function saveNewMessage(msg) {
  messages.value.push(msg)
}
function handleIncoming(message) {
  if (selectedUserId.value && message.from == selectedUserId.value) {
    saveNewMessage(message)
    return
  }
  updateUnreadCount(message.from_contact, false)
}
function updateUnreadCount(contact, reset) {
  contacts.value ==
    contacts.value.map((single) => {
      if (single.id != contact.id) {
        return single
      }
      if (reset) {
        single.unread = 0
      } else {
        single.unread += 1
      }

      return single
    })
}
function selectedCssStyle() {
  nextTick(() => {
    $(document).ready(function () {
      $('.chat-box .chat-box-inner').css('height', '100%')
      $('.chat-box .overlay-phone-call').css('display', 'block')
      $('.chat-box .overlay-video-call').css('display', 'block')
      $(this).addClass('active')
      $('.chat-meta-user').addClass('chat-active')
      $('.chat-box').css('height', 'calc(100vh - 250px)')
      $('.chat-footer').addClass('chat-active')
    })
  })
}

// primary fetching
await fetchPrimary()
</script>
