<template>
  <div class="layout-px-spacing layout-top-spacing">
    <div class="text-right">
      <button class="btn btn-info mb-2 mr-4 btn-rounded inline-flex" @click="emailViewHistory">
        View Send History
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-eye"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      </button>
    </div>
    <div id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
      <div class="statbox widget box box-shadow">
        <div class="widget-content widget-content-area">
          <div class="row">
            <div class="col-md-12">
              <form @submit.prevent="handleSubmit">
                <div class="row">
                  <div class="col col-md-6">
                    <label for="to">Send To:</label>
                    <input
                      v-model="send_to"
                      type="email"
                      class="form-control"
                      placeholder="Email Address"
                    />
                    <small
                      v-if="errors.send_to"
                      id="sh-text1"
                      type="text"
                      class="form-text text-danger"
                      >{{ errors.send_to[0] }}</small
                    >
                  </div>
                  <div class="col col-md-6">
                    <label for="to">Subject</label>
                    <input v-model="subject" class="form-control" placeholder="Subject" />
                    <small v-if="errors.subject" id="sh-text1" class="form-text text-danger">{{
                      errors.subject[0]
                    }}</small>
                  </div>
                  <div class="col col-md-12 mt-2">
                    <label for="exampleFormControlTextarea1">Body</label>
                    <textarea
                      id="exampleFormControlTextarea1"
                      v-model="mail_body"
                      class="form-control"
                      rows="5"
                      spellcheck="false"
                    ></textarea>
                    <small v-if="errors.mail_body" id="sh-text1" class="form-text text-danger">{{
                      errors.mail_body[0]
                    }}</small>
                  </div>
                  <div class="col col-md-12 mt-2">
                    <button type="submit" class="btn btn-primary">Send Email</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <application-lead-info :lead-id="leadId" />
    <ApplicationEmailSendHistory :lead-modal-id="leadModalId" />
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import Request from '../../apis/Request'
import Notify from '../../helpers/Notify'
import ApplicationLeadInfo from './ApplicationLeadInfo.vue'
import ApplicationEmailSendHistory from '../../components/leads/ApplicationEmailSendHistory.vue'

defineProps(['themeModeData'])

const store = useStore()
const route = useRoute()
const router = useRouter()
const user = computed(() => store.getters.user)

const send_to = ref('')
const subject = ref('')
const mail_body = ref('')
const errors = ref({})
const application = ref('')
const leadId = ref('')
const leadModalId = ref('')
const isLoading = ref(false)
const getOwnBranchId = ref('')
const getOwnCounselorId = ref('')

onMounted(async () => {
  isLoading.value = true
  leadId.value = route.params.id

  try {
    const res = await Request.GET_REQ(`/edit-lead/${leadId.value}`)
    getOwnBranchId.value = +res.data.branch_id
    getOwnCounselorId.value = +res.data.counselor_id
  } catch (error) {
    Notify(error.res.data)
  }

  if (
    user.value.user_type === 'superAdmin' ||
    (user.value.user_type === 'branchManager' && getOwnBranchId.value === +user.value.branch_id) ||
    (user.value.user_type === 'counselor' && getOwnCounselorId.value === +user.value.counselor_id)
  ) {
    isLoading.value = false
    return true
  } else {
    router.push({ name: 'Not_Permission' })
  }
})

//methods
function handleSubmit() {
  isLoading.value = true
  let leadId = route.params.id
  let data = {
    send_to: send_to.value,
    subject: subject.value,
    mail_body: mail_body.value,
  }

  Request.POST_REQ(data, `/application-email-sender/${leadId}`)
    .then((res) => {
      if (res.status === 200) {
        isLoading.value = false
        Notify.success('Email Has sent Successfully')
        router.push({ name: 'Application_Leads' })
      }
    })
    .catch((err) => {
      errors.value = err.response.data.errors
    })
}
function emailViewHistory() {
  let leadId = route.params.id
  leadModalId.value = leadId
  $('#app-email-sent-history').modal('show')
}
</script>
