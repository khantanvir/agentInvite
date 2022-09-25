<template>
  <div class="chat-box">
    <div v-if="!isUserSelected" class="chat-not-selected">
      <p>
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
          class="feather feather-message-square"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        Click User To Chat
      </p>
    </div>

    <div v-if="isUserSelected" class="chat-box-inner">
      <div class="chat-meta-user">
        <div class="current-chat-user-name">
          <span>
            <img v-if="singleUser.photo" :src="baseURL + singleUser.photo" alt="dynamic-image" />
            <img v-else src="@/assets/img/90x90.jpg" alt="dynamic-image" />
            <span class="name">{{ singleUser.name }}</span> -
            <small class="branch-name">{{
              singleUser.branch && singleUser.branch.branch_name
            }}</small>
          </span>
        </div>
      </div>

      <div class="chat-conversation-box">
        <div id="chat-conversation-box-scroll" class="chat-conversation-box-scroll">
          <div class="chat" data-chat="person1">
            <div class="conversation-start">
              <!-- <span>Today, 6:48 AM</span> -->
            </div>
            <div
              v-for="msg in messages"
              :key="msg && msg.id"
              class="bubble"
              :class="msg && +msg.from === +sendUser.id ? 'me' : 'you'"
            >
              {{ msg && msg.message }}
              <small class="message-date-time">{{ dateTime(msg && msg.created_at) }}</small>
            </div>
          </div>
        </div>
      </div>

      <div class="chat-footer">
        <div class="chat-input">
          <form class="chat-form" action="javascript:void(0);">
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
              class="feather feather-message-square"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <input
              v-model="message"
              type="text"
              class="mail-write-box form-control"
              placeholder="Message"
              @keydown.enter="sendMessage"
            />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, watch, toRefs } from 'vue'
import { useStore } from 'vuex'
import Request from '@/apis/Request'
import moment from 'moment'
import Notify from '../../helpers/Notify'

const store = useStore()
const baseURL = computed(() => store.state.baseURL)
const props = defineProps({
  isUserSelected: {
    type: Boolean,
    default: true,
  },
  messages: {
    type: Array,
    requred: true,
    default() {
      return []
    },
  },
  sendUser: {
    type: Object,
    requred: true,
    default() {
      return {}
    },
  },
  selectedUserId: {
    type: Number,
    requred: true,
    default: 0,
  },
})

const emit = defineEmits(['reloadMessage'])

const { selectedUserId } = toRefs(props)

const singleUser = ref('')
const message = ref('')
const errors = ref({})

//methods
function sendMessage() {
  const data = {
    message: message.value,
    user_id: selectedUserId.value,
  }
  Request.POST_REQ(data, '/send-message')
    .then((res) => {
      if (res.status === 200) {
        emit('reloadMessage', res.data)
      }
    })
    .catch((err) => {
      Notify(err.res.data)
    })
  message.value = ''

  let mange_app = document.querySelector('.chat')
  mange_app.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
    inline: 'start',
  })
}
function dateTime(value) {
  return moment(value).calendar()
}

watch(selectedUserId, async () => {
  try {
    const res = await Request.GET_REQ(`/single-contact-list/${selectedUserId.value}`)
    singleUser.value = res.data
  } catch (error) {
    errors.value = error.res.data.errors
  }
})
</script>

<style lang="scss">
small.message-date-time {
  display: block;
  font-size: 8px;
}
.chat {
  padding-bottom: 50px !important;
}
</style>
