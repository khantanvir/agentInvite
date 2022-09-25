<template>
  <div class="layout-px-spacing layout-top-spacing">
    <div
      v-if="(user && user.user_type == 'superAdmin') || (user && user.user_type == 'branchManager')"
      class="text-right"
    >
      <button
        v-if="currentRouteName == 'Application_Lead_Info'"
        class="btn btn-info mb-2 mr-4 btn-rounded"
        @click="sendEmail"
      >
        Send Email
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
      </button>
      <button class="btn btn-info mb-2 mr-4 btn-rounded inline-flex" @click="editAppLead">
        Edit Lead
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
      </button>

      <router-link :to="{ name: 'Add_Lead' }">
        <button class="btn btn-info mb-2 mr-4 btn-rounded inline-flex">
          Add Lead
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
            class="feather feather-plus-circle"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
        </button>
      </router-link>

      <router-link :to="{ name: 'Application_Leads' }">
        <button class="btn btn-info mb-2 mr-4 btn-rounded inline-flex">
          Application Leads
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
      </router-link>
    </div>
    <div id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
      <div class="statbox widget box box-shadow">
        <div class="widget-content widget-content-area">
          <div class="row">
            <div class="col col-md-6 mb-4">
              <h5 class="pb-2">Personal Information</h5>
              <div class="table-responsive">
                <table class="table table-bordered mb-4">
                  <tbody>
                    <tr>
                      <td colspan="2">
                        <img
                          v-if="lead.photo"
                          :src="baseURL + `${lead.photo}`"
                          alt="..."
                          width="100"
                        />
                        <img v-else src="@/assets/img/90x90.jpg" class="" alt="..." width="90" />
                      </td>
                    </tr>
                    <tr>
                      <td>Name</td>
                      <td>{{ lead.first_name }} {{ lead.last_name }}</td>
                    </tr>
                    <tr>
                      <td>Phone</td>
                      <td>{{ lead.phone }}</td>
                    </tr>

                    <tr>
                      <td>Email</td>
                      <td>{{ lead.email }}</td>
                    </tr>
                    <tr>
                      <td>Alternate Phone</td>
                      <td>{{ lead.alternate_phone }}</td>
                    </tr>
                    <tr>
                      <td>Date of Birth</td>
                      <td>{{ lead.data_of_birth }}</td>
                    </tr>
                    <tr>
                      <td>Living Country</td>
                      <td>
                        {{ lead.living_country && lead.living_country.name }}
                      </td>
                    </tr>
                    <tr>
                      <td>Living City</td>
                      <td>{{ lead.p_address_city }}</td>
                    </tr>

                    <tr>
                      <td>Living State</td>
                      <td>{{ lead.p_address_state }}</td>
                    </tr>
                    <tr>
                      <td>Zip Code</td>
                      <td>{{ lead.p_address_zip }}</td>
                    </tr>
                    <tr>
                      <td>Living Address Details</td>
                      <td>{{ lead.p_address_details }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <application-meeting-component :lead-id="leadId" />
            </div>
            <div class="col col-md-6 mb-4">
              <h5 class="pb-2">Useful Information</h5>
              <div class="table-responsive">
                <table class="table table-bordered mb-4">
                  <tbody>
                    <tr>
                      <td>Branch</td>
                      <td>{{ lead.branch && lead.branch.branch_name }}</td>
                    </tr>
                    <tr>
                      <td>Course Category</td>
                      <td>
                        {{ lead.category && lead.category.category_name }}
                      </td>
                    </tr>

                    <tr>
                      <td>Course Level</td>
                      <td>
                        {{ lead.course_level && lead.course_level.course_level_name }}
                      </td>
                    </tr>
                    <tr>
                      <td>Counselor</td>
                      <td>
                        {{ lead.counselor && lead.counselor.counselor_name }}
                      </td>
                    </tr>
                    <tr>
                      <td>Lead Source</td>
                      <td>
                        <div v-if="lead.lead_facebook_id">Hubspot</div>
                        <div v-else>
                          <div v-if="lead.agent && lead.agent.agent_name">
                            {{ lead.agent.agent_name }}
                          </div>
                          <div v-else>
                            {{ lead.lead_source && lead.lead_source.source_name }}
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Interested Country</td>
                      <td>
                        {{ lead.country && lead.country.country.name }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h5 class="pb-2">University Information</h5>
              <div class="table-responsive">
                <table class="table table-bordered mb-4">
                  <thead>
                    <tr>
                      <th>Institute Name</th>
                      <th>Course Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="university in lead.universities" :key="university.id">
                      <td>
                        {{ university.course && university.course.institute.institute_name }}
                      </td>
                      <td>
                        {{ university.course && university.course.course_name }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <application-followup-component :lead-id="leadId" />
            </div>
            <div class="col col-md-12 mb-4">
              <h5 class="pb-2">Application Document</h5>
              <p v-if="files.length == 0">No File Uploaded Yet</p>
              <ul class="documents-files">
                <li v-for="(file, index) in files" :key="file.id">
                  <a :href="baseURL + file.file" download target="_blank">File - {{ index + 1 }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Request from '@/apis/Request'
import ApplicationFollowupComponent from '@/components/leads/ApplicationFollowupComponent.vue'
import ApplicationMeetingComponent from '@/components/leads/ApplicationMeetingComponent.vue'
import Notify from '@/helpers/Notify'

const store = useStore()
const route = useRoute()
const router = useRouter()
const user = computed(() => store.getters.user)

const lead = ref({})
const leadId = ref('')
const files = ref([])
const isLoading = ref(false)

//methods
async function fetchPrimary() {
  isLoading.value = true
  let applicantId = route.params.id
  leadId.value = applicantId
  try {
    const res = await Request.GET_REQ(`/application-lead-info/${applicantId}`)
    lead.value = res.data
    isLoading.value = false
  } catch (error) {
    Notify(error.res.data)
  }

  try {
    const res = await Request.GET_REQ(`/application-lead-documents/${applicantId}`)
    files.value = res.data
  } catch (err) {
    Notify(err.res.data)
  }
}

function editAppLead() {
  router.push({
    name: 'Edit_Lead',
    params: { id: route.params.id },
  })
}

function sendEmail() {
  router.push({
    name: 'Send_Application_Email',
    params: { id: route.params.id },
  })
}

await fetchPrimary()
</script>

<style lang="scss">
.card.component-card_4.application-custom-card {
  width: 100%;
}
.documents-files {
  list-style: none;
  display: flex;
  padding: 0;
  align-content: center;
  align-items: center;
  li {
    border: 1px solid;
    padding: 10px;
    width: 8%;
    height: 70px;
    margin-right: 5px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    background: #fefefe;
    cursor: pointer;
  }
}
body.dark .documents-files {
  li {
    border: 1px solid #191e3a;
    background: #0095cc;
  }
}
</style>
