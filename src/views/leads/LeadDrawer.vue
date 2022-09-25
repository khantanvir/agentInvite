<template>
  <div id="lead-drwer-wrap" :class="drawerActive ? 'show' : ''">
    <div class="d-flex justify-content-between align-items-center py-2 px-2">
      <div>
        <h5>
          {{ !lead.first_name ? 'Loading....' : lead.first_name + ' ' + lead.last_name }}
        </h5>
      </div>
      <div
        class="drawer-close badge badge-pill inline-grid place-items-center"
        @click="$emit('close-drawer')"
      >
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
          class="feather feather-x"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </div>
    </div>
    <div class="card component-card_4">
      <div class="card-body">
        <div class="user-profile">
          <img v-if="lead.photo" :src="baseURL + lead.photo" class="" alt="..." width="90" />
          <img v-else src="@/assets/img/90x90.jpg" class="" alt="..." />
        </div>
        <div class="user-info">
          <h5 class="card-user_name">
            {{ !lead.first_name ? 'Loading....' : lead.first_name + ' ' + lead.last_name }}
          </h5>

          <div class="card-icon d-flex justify-content-between align-item-center text-center">
            <span style="cursor: pointer" @click="clickNotes">
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
                class="feather feather-edit-3 icon custom-edit-icon"
              >
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
              <br />
              Notes
            </span>
            <span style="cursor: pointer" @click="clickFollowUp">
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
                class="feather feather-mail"
              >
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                ></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <br />
              Follow up
            </span>
            <span>
              <a href="tel:{{lead.phone}}" class="lead-phone">
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
                  class="feather feather-phone-call"
                >
                  <path
                    d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                  ></path>
                </svg>
                <br />
                Call
              </a>
            </span>

            <span style="cursor: pointer" @click="clickMeeting">
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
                class="feather feather-calendar"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <br />
              Meeting
            </span>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="col-lg-12 p-0">
      <div class="statbox box box-shadow">
        <div class="icon-accordion-content">
          <div id="withoutSpacing">
            <div class="card no-outer-spacing">
              <div id="headingOne2" class="card-header">
                <section class="mb-0 mt-0">
                  <div
                    role="menu"
                    class=""
                    data-toggle="collapse"
                    data-target="#withoutSpacingAccordionOne"
                    aria-expanded="true"
                    aria-controls="withoutSpacingAccordionOne"
                  >
                    About Contact
                    <div class="icons">
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
                        class="feather feather-chevron-down"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
                </section>
              </div>

              <div
                id="withoutSpacingAccordionOne"
                class="collapse show"
                aria-labelledby="headingOne2"
                data-parent="#withoutSpacing"
              >
                <div class="card-body custom-card-body">
                  <form @submit.prevent="handleSubmit">
                    <div class="row">
                      <div class="col col-md-12">
                        <div class="form-group lead-drawer-form">
                          <label for="first_name">First Name</label>
                          <input
                            id="first_name"
                            v-model="first_name"
                            type="text"
                            class="form-control"
                          />
                        </div>
                      </div>

                      <div class="col col-md-12">
                        <div class="form-group lead-drawer-form">
                          <label for="last_name">Last Name</label>
                          <input
                            id="last_name"
                            v-model="last_name"
                            type="text"
                            class="form-control"
                          />
                        </div>
                      </div>

                      <div class="col col-md-12">
                        <div class="form-group lead-drawer-form">
                          <label for="email">Email</label>
                          <input id="email" v-model="email" type="text" class="form-control" />
                        </div>
                      </div>
                      <div class="col col-md-12">
                        <div class="form-group lead-drawer-form">
                          <label for="phone">Phone</label>
                          <input id="phone" v-model="phone" type="text" class="form-control" />
                        </div>
                      </div>
                      <!-- Branch -->
                      <div v-if="user && user.user_type === 'superAdmin'" class="col col-md-12">
                        <div class="form-group lead-drawer-form">
                          <label for="selected_a_branch">Select Branch to assign Counselor</label>
                          <select
                            v-model="selected_a_branch"
                            id="selected_a_branch"
                            class="form-control"
                            @change="activeBranchId($event.target.value)"
                          >
                            <option value="" disabled>Choose Branch</option>
                            <option
                              v-for="branch in activeBranches"
                              :key="branch.id"
                              :value="branch.id"
                            >
                              {{ branch.branch_name }}
                            </option>
                          </select>
                          <small
                            v-if="errors.counselor_id"
                            id="sh-text1"
                            class="form-text text-danger"
                            >{{ errors.counselor_id[0] }}</small
                          >
                        </div>
                      </div>
                      <!-- Counselor -->
                      <div class="col col-md-12">
                        <div class="form-group lead-drawer-form">
                          <label for="counselor_id">Counselor</label>
                          <select v-model="counselor_id" id="counselor_id" class="form-control">
                            <option value="" disabled>Select Counselor</option>
                            <option v-if="counselor_id" :value="counselor_id" selected>
                              {{ counselor_id }}
                            </option>
                            <option
                              v-for="counselor in counselors"
                              :key="counselor.id"
                              :value="counselor.id"
                            >
                              {{ counselor.counselor_name }}
                            </option>
                          </select>
                          <small
                            v-if="errors.counselor_id"
                            id="sh-text1"
                            class="form-text text-danger"
                            >{{ errors.counselor_id[0] }}</small
                          >
                        </div>
                      </div>

                      <div class="col col-md-12">
                        <button class="btn badge badge-info btn-sm">
                          Update
                          <span v-if="lazyLoadContact">
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
                              class="feather feather-loader spin mr-2"
                            >
                              <line x1="12" y1="2" x2="12" y2="6"></line>
                              <line x1="12" y1="18" x2="12" y2="22"></line>
                              <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                              <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                              <line x1="2" y1="12" x2="6" y2="12"></line>
                              <line x1="18" y1="12" x2="22" y2="12"></line>
                              <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                              <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                            </svg>
                          </span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="pr-3 pb-2 text-right">
                  <router-link
                    v-if="
                      (user && user.user_type === 'superAdmin') ||
                      (user.user_type === 'branchManager' && lead.branch_id === user.branch_id) ||
                      lead.counselor_id === user.counselor_id
                    "
                    :to="{
                      name: 'Edit_Lead',
                      params: { id: leadId },
                    }"
                  >
                    <button class="btn btn-sm badge badge-pill bg-secondary" style="color: #fff">
                      More Edit
                    </button>
                  </router-link>
                </div>
              </div>
            </div>

            <lead-status-component :lead-id="leadId" :lead-status-id="leadStatusId" />
            <LeadNotes :lead-id="leadId" />
            <follow-up-component :lead-id="leadId" :theme-mode-data="themeModeData" />
            <meeting-component :lead-id="leadId" :theme-mode-data="themeModeData" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import Request from '@/apis/Request.js'
import FollowUpComponent from '../../components/leads/FollowUpComponent.vue'
import LeadNotes from '../../components/leads/LeadNotes.vue'
import MeetingComponent from '../../components/leads/MeetingComponent.vue'
import LeadStatusComponent from '../../components/leads/LeadStatusComponent.vue'
import { useStore } from 'vuex'
import Notify from '../../helpers/Notify'
import { useEmitter } from '@/composables/useEmitter'

const props = defineProps({
  leadId: {
    type: String,
    required: true,
  },
  drawerActive: {
    type: Boolean,
    required: true,
  },
  drawerLoading: {
    type: Boolean,
    required: true,
  },
  themeModeData: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['close-drawer', 'all_leads'])

const store = useStore()
const emitter = useEmitter()
const user = computed(() => store.getters.user)

const lead = ref('')
const counselor_id = ref('')
const loading = ref(false)
const lazyLoadContact = ref(false)
const errors = ref({})
const counselors = ref([])
const first_name = ref('')
const last_name = ref('')
const email = ref('')
const phone = ref('')
const leadStatusId = ref('')
const activeBranches = ref([])
const isSelectBranch = ref(false)
const selected_a_branch = ref('')

onMounted(async () => {
  emitter.on('leadUpdate', async () => {
    await getLead()
    await getCounselor()
  })
  await getActiveBranch()
})
watch(
  () => props.leadId,
  async () => {
    await getLead()
    await getCounselor()
  }
)

//methods
async function getLead() {
  loading.value = true
  try {
    const res = await Request.GET_REQ(`/get-lead/${props.leadId}`)
    lead.value = res.data
    first_name.value = res.data.first_name
    last_name.value = res.data.last_name
    email.value = res.data.email
    phone.value = res.data.phone
    counselor_id.value = res.data.counselor_id
    selected_a_branch.value = res.data.branch_id
    leadStatusId.value = res.data.lead_status_id
    loading.value = false
  } catch (error) {
    errors.value = error.res.data.errors
    loading.value = false
  }
}
async function getCounselor() {
  if (user.value && user.value.user_type === 'superAdmin') {
    counselors.value = ''
  }
  if (
    user.value &&
    (user.value.user_type === 'counselor' ||
      user.value.user_type === 'branchManager' ||
      user.value.user_type === 'frontOfficer')
  ) {
    try {
      const res = await Request.GET_REQ(`/active-counselor/${user.value.branch_id}`)
      counselors.value = res.data
    } catch (error) {
      Notify(error.res.data)
    }
  }
}
async function handleSubmit() {
  lazyLoadContact.value = true
  const data = {
    first_name: first_name.value,
    last_name: last_name.value,
    email: email.value,
    phone: phone.value,
    counselor_id: counselor_id.value,
    branch_id: user.value && (user.value.branch_id || selected_a_branch.value),
  }
  try {
    const res = await Request.POST_REQ(data, `/update-contact/${props.leadId}`)
    if (res.status === 200) {
      lazyLoadContact.value = false
      emit('all_leads')
      emitter.emit('leadUpdate')
      Notify.success('The Lead Contact Successfully Updated')
      errors.value = {}
    } else {
      Notify.warning(res.data)
    }
  } catch (err) {
    errors.value = err.response.data.errors
    lazyLoadContact.value = false
    errors.value.first_name && Notify.error(errors.value.first_name[0])
    errors.value.last_name && Notify.error(errors.value.last_name[0])
    errors.value.email && Notify.error(errors.value.email[0])
    errors.value.phone && Notify.error(errors.value.phone[0])
    errors.value.counselor_id && Notify.error(errors.value.counselor_id[0])
  }
}
function clickNotes() {
  const aboutElm = document.getElementById('withoutSpacingAccordionOne')
  const noteElm = document.getElementById('withoutSpacingAccordionFive')
  const followUpElm = document.getElementById('withoutSpacingAccordionTwo')
  const meetingElm = document.getElementById('withoutSpacingAccordionThree')
  if (
    aboutElm.classList.contains('show') ||
    meetingElm.classList.contains('show') ||
    followUpElm.classList.contains('show')
  ) {
    aboutElm.classList.remove('show')
    meetingElm.classList.remove('show')
    followUpElm.classList.remove('show')
  }
  noteElm.classList.add('show')
  noteElm.scrollIntoView({ behavior: 'smooth', block: 'end' })
}
function clickFollowUp() {
  const aboutElm = document.getElementById('withoutSpacingAccordionOne')
  const noteElm = document.getElementById('withoutSpacingAccordionFive')
  const followUpElm = document.getElementById('withoutSpacingAccordionTwo')
  const meetingElm = document.getElementById('withoutSpacingAccordionThree')
  if (
    aboutElm.classList.contains('show') ||
    meetingElm.classList.contains('show') ||
    noteElm.classList.contains('show')
  ) {
    aboutElm.classList.remove('show')
    meetingElm.classList.remove('show')
    noteElm.classList.remove('show')
  }
  followUpElm.classList.add('show')
  followUpElm.scrollIntoView({ behavior: 'smooth', block: 'end' })
}

function clickMeeting() {
  const aboutElm = document.getElementById('withoutSpacingAccordionOne')
  const noteElm = document.getElementById('withoutSpacingAccordionTwo')
  const meetingElm = document.getElementById('withoutSpacingAccordionThree')
  if (aboutElm.classList.contains('show') || noteElm.classList.contains('show')) {
    aboutElm.classList.remove('show')
    noteElm.classList.remove('show')
  }
  meetingElm.classList.add('show')
  noteElm.scrollIntoView({ behavior: 'smooth', block: 'end' })
}
async function getActiveBranch() {
  try {
    const res = await Request.GET_REQ(`/active-branches`)
    activeBranches.value = res.data
  } catch (error) {
    Notify.error(error.res.data)
  }
}
async function activeBranchId(branchId) {
  selected_a_branch.value = branchId
  try {
    const res = await Request.GET_REQ(`/active-counselor/${branchId}`)
    counselors.value = res.data
    isSelectBranch.value = true
  } catch (error) {
    Notify(error.res.data)
  }
}
</script>

<style lang="scss">
div#lead-drwer-wrap.show {
  visibility: visible;
  transform: translateX(0);
  right: 0;
  padding: 5px;
}
body.dark div#lead-drwer-wrap {
  background: #060818;
  border: 1px solid #191e3a;
}
div#lead-drwer-wrap {
  background: #fff;
  width: 350px;
  height: 100vh;
  position: fixed;
  top: 0;
  right: -105%;
  border-radius: 5px;
  border: 1px solid #ddd;
  visibility: hidden;
  transition: visibility 0.5s;
  transition: right 0.5s;
  transform: translateX(-30%);
  z-index: 10000;
  overflow-y: scroll;
  overflow-x: hidden;
  .card.component-card_4 {
    width: 100%;
  }
  .component-card_4 {
    border: none !important;
    border-radius: unset !important;
    widows: 100% !important;
    .user-profile {
      padding: 10px;
    }
  }
}
.drawer-close {
  width: 30px;
  height: 30px;
  background: #e7515a;
  line-height: 1.3;
  color: #fff;
  font-weight: bold;
  font-size: 1.2rem !important;
  cursor: pointer;
  padding: 0 !important;
}
.card-icon {
  span {
    margin: 0 3px;
    position: relative;
  }
}
.form-group.lead-drawer-form {
  margin-bottom: 5px;
  label {
    font-size: 11px;
    padding: 0 !important;
    margin: 0 !important;
  }
  input {
    padding: 5px;
    border-radius: 0;
    font-size: 12px;
  }
  input.form-control {
    height: 28px;
  }
  select.form-control.form-control-sm {
    height: 30px;
    padding: 0;
    font-size: 12px;
    border-radius: 0;
  }
  .custom-lead-drawer-wrap {
    .card-body {
      padding: 0px 18px;
    }
  }
}

.card-body.custom-card-body {
  padding: 0 18px 18px;
}
.form-group.lead-drawer-form select {
  height: 28px;
  padding: 0;
  font-size: 11px;
}
body.dark a.lead-phone {
  color: #888ea8;
}
a.lead-phone {
  color: #888ea8;
}
</style>
