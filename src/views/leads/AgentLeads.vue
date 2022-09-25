<template>
  <div class="layout-px-spacing layout-top-spacing">
    <div class="text-right">
      <router-link :to="{ name: 'Add_Lead' }">
        <button class="btn btn-info mb-2 mr-4 btn-rounded">
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

      <router-link
        v-if="
          (user && user.user_type == 'superAdmin') ||
          (user && user.user_type == 'branchManager') ||
          (user && user.user_type == 'counselor') ||
          (user && user.user_type == 'frontOfficer')
        "
        :to="{ name: 'Application_Leads' }"
      >
        <button class="btn btn-info mb-2 mr-4 btn-rounded">
          Application Lead
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

      <button
        v-if="
          (user && user.user_type == 'branchManager') ||
          (user && user.user_type == 'counselor') ||
          (user && user.user_type == 'frontOfficer')
        "
        class="btn btn-primary mb-2 mr-4 btn-rounded"
        @click="myBranchLeads"
      >
        My Branch Leads
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

      <button
        v-if="
          (user && user.user_type == 'branchManager') ||
          (user && user.user_type == 'counselor') ||
          (user && user.user_type == 'frontOfficer')
        "
        class="btn btn-secondary mb-2 mr-4 btn-rounded"
        @click="allBranchLeads"
      >
        All Branch Leads
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
            <div class="col col-md-5 offset-md-7">
              <div class="form-group mb-4">
                <input
                  v-model="search"
                  type="text"
                  class="form-control"
                  placeholder="Search by First or Last Name, Email, Phone"
                  style="position: relative"
                  @keyup="searchit"
                />
                <span v-if="searchLoading" class="search-icon">
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
                <span v-if="!searchLoading" class="search-icon">
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
                </span>
              </div>
            </div>

            <div class="col col-md-12">
              <div id="tableSimple" class="col-lg-12 col-12 p-0">
                <div class="table-responsive">
                  <table id="manage_app_process" class="table table-bordered mb-4">
                    <thead>
                      <tr>
                        <th></th>
                        <th></th>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Branch</th>
                        <th style="text-align: center">Applicant Ready</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <h3 v-if="leads.length == 0" class="mt-4">No Data Found</h3>
                      <template v-for="(lead, index) in leads" :key="lead.id">
                        <tr class="lead-row">
                          <td>
                            <span style="cursor: pointer" @click="toggle(index)">
                              <svg
                                :class="index == isOpenIndex ? 'plus-off' : ''"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-plus-square"
                              >
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="12" y1="8" x2="12" y2="16"></line>
                                <line x1="8" y1="12" x2="16" y2="12"></line>
                              </svg>

                              <svg
                                v-if="index == isOpenIndex"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-minus-square"
                              >
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="8" y1="12" x2="16" y2="12"></line>
                              </svg>
                            </span>
                          </td>
                          <td>
                            <div v-if="lead.lead_status && lead.lead_status.id == 1">
                              <span
                                class="badge badge-pill badge-sm"
                                :style="{
                                  background:
                                    lead.lead_application_status_id &&
                                    lead.application_status.status_color
                                      ? lead.application_status.status_color
                                      : '#1b55e2',
                                }"
                                style="position: relative"
                              >
                                {{
                                  lead.lead_application_status_id
                                    ? lead.application_status && lead.application_status.status_name
                                    : 'Set Status'
                                }}
                              </span>
                            </div>
                            <div v-else>
                              <span
                                v-if="lead.lead_status && lead.lead_status.id == 1"
                                class="badge badge-pill badge-sm bg-warning"
                                >{{ lead.lead_status && lead.lead_status.status_name }}</span
                              >
                              <span
                                v-if="lead.lead_status && lead.lead_status.id == 2"
                                class="badge badge-pill badge-sm bg-primary"
                                >{{ lead.lead_status && lead.lead_status.status_name }}</span
                              >
                              <span
                                v-if="lead.lead_status && lead.lead_status.id == 3"
                                class="badge badge-pill badge-sm bg-danger"
                                >{{ lead.lead_status && lead.lead_status.status_name }}</span
                              >
                              <span
                                v-if="lead.lead_status && lead.lead_status.id == 4"
                                class="badge badge-pill badge-sm bg-info"
                                >{{ lead.lead_status && lead.lead_status.status_name }}</span
                              >
                              <span
                                v-if="lead.lead_status && lead.lead_status.id == 5"
                                class="badge badge-pill badge-sm bg-success"
                                >{{ lead.lead_status && lead.lead_status.status_name }}</span
                              >
                            </div>
                          </td>
                          <td>
                            {{ page * 15 - 15 + index + 1 }}
                          </td>
                          <td>
                            {{ lead.first_name }}
                            {{ lead.last_name }}
                          </td>

                          <td>
                            {{ lead.phone }}
                          </td>
                          <td>
                            {{ lead.email }}
                          </td>
                          <td>
                            {{ lead.branch && lead.branch.branch_name }}
                          </td>
                          <td style="text-align: center">
                            <span
                              :class="
                                lead.lead_application_status == 1
                                  ? 'badge badge-pill badge-success'
                                  : 'badge badge-pill badge-danger'
                              "
                            >
                              {{ lead.lead_application_status == 1 ? 'Yes' : 'No' }}
                            </span>
                          </td>

                          <td>
                            <router-link
                              :to="{
                                name: 'Edit_Lead',
                                params: { id: lead.id },
                              }"
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
                                class="feather feather-edit-3 icon custom-edit-icon"
                              >
                                <path d="M12 20h9"></path>
                                <path
                                  d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
                                ></path>
                              </svg>
                            </router-link>
                          </td>
                        </tr>
                        <tr v-if="index == isOpenIndex" class="sub-row-th">
                          <th></th>
                          <th></th>
                          <th></th>
                          <th>Category</th>
                          <th>Course Level</th>
                          <th>Intersted Country</th>
                          <th>Lead Status</th>
                        </tr>
                        <tr v-if="index == isOpenIndex">
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>
                            {{ lead.category && lead.category.category_name }}
                          </td>
                          <td>
                            {{ lead.course_level && lead.course_level.course_level_name }}
                          </td>
                          <td>
                            {{ lead.country && lead.country.country.name }}
                          </td>

                          <td>
                            {{
                              lead.lead_application_status == 1
                                ? lead.lead_application_status_id
                                  ? lead.application_status && lead.application_status.status_name
                                  : 'Set Status'
                                : lead.lead_status && lead.lead_status.status_name
                            }}
                          </td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col col-md-12">
              <div class="lms-pagination">
                <pagination
                  v-if="isSearch"
                  v-model="page"
                  :records="total_search_leads"
                  :per-page="15"
                  @paginate="searchit"
                />
                <pagination
                  v-if="isAllLeads"
                  v-model="page"
                  :records="total_leads"
                  :per-page="15"
                  @paginate="all_leads"
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
import { ref, reactive, computed } from 'vue'
import _ from 'lodash'
import { useStore } from 'vuex'
import { useEmitter } from '@/composables/useEmitter'

const store = useStore()
const emitter = useEmitter()
const user = computed(() => store.getters.user)

const form = reactive({
  country: '',
})
const leads = ref([])
const errors = ref({})
const isLoading = ref(false)
const drawerLoading = ref(false)
const page = ref(1)
const total_leads = ref(0)
const total_search_leads = ref(0)
const total_my_branch_search_leads = ref(0)
const leadId = ref(0)
const drawerActive = ref(false)
const selected = ref([])
const selectAll = ref(false)
const isAssign = ref(false)
const lazyLoadAssign = ref(false)
const selectItems = ref('')
const selected_counselor = ref('')
const counselors = ref([])
const isOpen = ref(-1)
const search = ref('')
const isAllLeads = ref(true)
const isMyBranch = ref(false)
const isSearch = ref(false)
const searchLoading = ref(false)

//methods
async function fetchPrimary() {
  isLoading.value = true
  await store.dispatch('user')
  await all_leads()
  await totalLeads()

  emitter.on('reloadLead', async () => {
    await all_leads()
    await totalLeads()
  })
}

async function all_leads() {
  isMyBranch.value = false
  isSearch.value = false
  let branchId = user.value.branch_id
  let agentId = user.value.agent_id

  try {
    const res = await Request.GET_REQ(`/agent-leads/${branchId}/${agentId}?page=${page.value}`)
    leads.value = res.data.data
  } catch (error) {
    errors.value = error
  }
}
async function totalLeads() {
  let branchId = user.value && user.value.branch_id
  let agentId = user.value && user.value.agent_id
  try {
    const res = await Request.GET_REQ(`/total-agent-leads/${branchId}/${agentId}`)
    total_leads.value = res.data.length
    isLoading.value = false
  } catch (error) {
    errors.value = error
  }
  emitter.on('reload', async () => {
    await all_leads()
  })

  emitter.on('reloadLeadTb', async () => {
    await all_leads()
  })
}
function toggle(index) {
  if (index == isOpen.value) {
    isOpen.value = -1
  } else {
    isOpen.value = index
  }
}
const searchit = _.debounce(async function () {
  searchLoading.value = true
  const query = search
  if (query.length > 0) {
    isSearch.value = true
    isMyBranch.value = false
    isAllLeads.value = false
    let branchId = user.value && user.value.branch_id
    if (branchId) {
      Request.GET_REQ(`/lead-search/${branchId}?q=${query}&?page=${page.value}`)
        .then((res) => {
          leads.value = res.data.data
          searchLoading.value = false
        })
        .catch((err) => {
          errors.value = err.res.data.errors
        })
      //total search result count
      Request.GET_REQ(`/total-search-leads/${branchId}?q=${query}&?page=${page.value}`)
        .then((res) => {
          total_search_leads.value = res.data
        })
        .catch((err) => {
          errors.value = err.res.data.errors
        })
    } else {
      Request.GET_REQ(`/lead-search?q=${query}&?page=${page.value}`)
        .then((res) => {
          leads.value = res.data.data
          searchLoading.value = false
        })
        .catch((err) => {
          errors.value = err.res.data.errors
        })
      //total search result count
      Request.GET_REQ(`/total-search-leads?q=${query}&?page=${page.value}`)
        .then((res) => {
          total_search_leads.value = res.data
        })
        .catch((err) => {
          errors.value = err.res.data.errors
        })
    }
  } else {
    searchLoading.value = false
    isSearch.value = false
    await all_leads()
    await totalLeads()
  }
}, 2000)

await fetchPrimary()
</script>
<style scoped lang="scss">
.component-card_4 {
  width: auto;
  .user-info {
    width: 100%;
    padding: 5px 0 20px 0px;
  }
  .logo-title-wrap {
    img {
      border-radius: unset;
      height: 80px;
    }
  }
  .custom-btn-branch {
    margin-bottom: 0.5rem;
    margin-right: 0.5rem;
    cursor: pointer;
  }
  .custom-list-group-branch .list-group-item {
    background: transparent;
    padding: 0;
    border: unset;
    position: relative;
    margin: 7px 0;

    &::before {
      position: absolute;
      content: '';
      width: 100%;
      height: 1px;
      background: #e0e6ed;
      left: 0;
      bottom: -7px;
    }
    &::last-child::before {
      background: transparent !important;
      content: unset;
    }
    h6 {
      margin: 0;
      position: relative;
      padding-left: 20px;
      font-size: 14px;

      &::before {
        position: absolute;
        content: '';
        width: 16px;
        height: 16px;
        left: 0;
        border-radius: 3px;
      }
    }
    h6.count-primary {
      &::before {
        background: #1b55e2;
      }
    }
    h6.count-info {
      &::before {
        background: #2196f3;
      }
    }
    h6.count-success {
      &::before {
        background: #8dbf42;
      }
    }
    h6.count-warning {
      &::before {
        background: #e2a03f;
      }
    }
    h6.count-danger {
      &::before {
        background: #e7515a;
      }
    }
    h6.count-secondary {
      &::before {
        background: #5c1ac3;
      }
    }
  }
  .card-user_name {
    font-size: 24px;
  }
}

body.dark .component-card_4 {
  .custom-list-group-branch .list-group-item {
    &::before {
      background: #1b2e4b;
    }
  }
}

ul.list-group.custom-list-group-branch li:last-child:before {
  background: transparent !important;
}
.page-link {
  background-color: #0e1726 !important;
}
.lead-row {
  cursor: pointer;
}
body.dark tr.lead-row:hover {
  background-color: #060818;
}
tr.lead-row:hover {
  background-color: #fafafa;
}
.assign-text {
  text-decoration: underline;
  cursor: pointer;
}
.modal-footer {
  display: block !important;
  padding: 15px 25px 15px;
}
.preview-lead {
  display: none;
  position: absolute;
  right: 0;
  top: 30%;
}
.lead-row:hover .preview-lead {
  display: block;
}
.plus-off {
  display: none;
}
body.dark .sub-row-th th {
  color: #d3d3d3;
}
.sub-row-th th {
  text-transform: uppercase;
  color: #1b55e2;
  font-size: 12px;
}
.search-icon {
  position: absolute;
  right: 5%;
  top: 15%;
}
</style>
