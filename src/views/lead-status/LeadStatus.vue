<template>
  <div class="layout-px-spacing">
    <div
      v-if="(user && user.user_type == 'superAdmin') || (user && user.user_type == 'branchManager')"
      class="layout-top-spacing text-right"
    >
      <button
        v-if="leadAddBtn == true"
        class="btn btn-info btn-rounded mb-2 mr-4 inline-flex"
        @click="catAddBtn"
      >
        Add Lead Status
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

      <div
        v-if="isNewLeadStatus == true"
        id="card_1"
        class="col-lg-12 layout-spacing layout-top-spacing"
      >
        <div class="statbox widget box box-shadow">
          <div class="widget-content widget-content-area">
            <div v-if="isNewLeadStatus == true" class="row">
              <div class="col-md-9">
                <div>
                  <input
                    v-model="status_name"
                    class="form-control"
                    placeholder="Type New Course Level"
                    @keydown="errorClear"
                  />
                  <small
                    v-if="errors.status_name"
                    id="sh-text1"
                    class="form-text text-danger text-left"
                    >{{ errors.status_name[0] }}</small
                  >
                </div>
              </div>
              <div class="col-md-3">
                <button
                  class="btn btn-success btn-rounded mb-2 mr-4 inline-flex"
                  @click="handleSubmit"
                >
                  Submit
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

                <button class="btn btn-warning btn-rounded mb-2 mr-4" @click="cancelBtn">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="isEdit == true" id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
        <div class="statbox widget box box-shadow">
          <div class="widget-content widget-content-area">
            <div v-if="isEdit == true" class="row">
              <div class="col-md-9">
                <div>
                  <input
                    id="scroll-target"
                    v-model="status_name"
                    class="form-control"
                    placeholder="Type New Course Level"
                    @keydown="errorClear"
                  />
                  <small
                    v-if="errors.status_name"
                    id="sh-text1"
                    class="form-text text-danger text-left"
                    >{{ errors.status_name[0] }}</small
                  >
                </div>
              </div>
              <div class="col-md-3">
                <button
                  v-if="isEdit == true"
                  class="btn btn-success btn-rounded mb-2 mr-4"
                  @click="handleUdate"
                >
                  Update
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

                <button class="btn btn-warning btn-rounded mb-2 mr-4" @click="cancelBtn">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
      <div class="statbox widget box box-shadow">
        <div class="widget-content widget-content-area">
          <div class="row">
            <div id="tableProgress" class="col-lg-12 col-12 layout-spacing">
              <div class="statbox widget box box-shadow">
                <div class="widget-header">
                  <div class="row">
                    <div class="col-xl-12 col-md-12 col-sm-12 col-12 p-0">
                      <h4>Lead Status List</h4>
                    </div>
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="table-bordered table">
                    <thead>
                      <tr>
                        <th class="text-center">#</th>
                        <th>Lead Status Name</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th class="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(leadstatus, index) in leadstatuses" :key="leadstatus.id">
                        <td class="text-center">{{ index + 1 }}</td>
                        <td>{{ leadstatus.status_name }}</td>
                        <td>
                          <div class="text-left">
                            <span
                              :class="leadstatus.active == 1 ? 'text-success' : 'text-danger'"
                              >{{ leadstatus.active == 1 ? 'Active' : 'Deactive' }}</span
                            >
                          </div>
                        </td>
                        <td>
                          <p class="text-secondary">
                            {{ dateTime(leadstatus.created_at) }}
                          </p>
                        </td>
                        <td class="text-center">
                          <ul class="table-controls">
                            <li>
                              <a
                                href="javascript:void(0);"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Edit"
                                class="badge badge-pill badge-secondary custom-btn-branch mr-2"
                                @click="handleEdit(leadstatus.id)"
                              >
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
                                  class="feather feather-edit-3"
                                >
                                  <path d="M12 20h9"></path>
                                  <path
                                    d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
                                  ></path>
                                </svg>
                              </a>
                            </li>
                            <li>
                              <label class="switch s-icons s-outline s-outline-success mr-2">
                                <input
                                  type="checkbox"
                                  :checked="leadstatus.active !== 1 ? checked : ''"
                                  @change="processStatus(leadstatus.id)"
                                />
                                <span class="slider round"></span>
                              </label>
                            </li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="row">
                  <div class="col col-md-12">
                    <div class="lms-pagination">
                      <base-pagination
                        v-model="page"
                        :links="pageLinks"
                        class="custom-pagination"
                        @paginate="all_lead_status"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useEmitter } from '@/composables/useEmitter'
import moment from 'moment'
import Request from '../../apis/Request'
import Notify from '../../helpers/Notify'

const store = useStore()
const emitter = useEmitter()
const user = computed(() => store.getters.user)

const leadstatuses = ref([])
const total_lead_status = ref(0)
const errors = ref({})
const isLoading = ref(false)
const isNewLeadStatus = ref(false)
const isEdit = ref(false)
const status_name = ref('')
const leadId = ref('')
const page = ref(1)
const pageLinks = ref([])
const leadAddBtn = ref(true)

//methods
async function fetchPrimary() {
  isLoading.value = true
  await all_lead_status()
  await totalCourseLevels()

  emitter.on('reload', async () => {
    await all_lead_status()
    await totalCourseLevels()
  })
}

function handleSubmit() {
  Request.POST_REQ({ status_name: status_name.value }, '/add-lead-status')
    .then(() => {
      status_name.value = ''
      leadAddBtn.value = true
      emitter.emit('reload')
      Notify.success('Lead Status Added')
    })
    .catch((err) => {
      errors.value = err.response.data.errors
      errors.value.status_name && Notify.error(errors.value.status_name[0])
    })
}
function dateTime(value) {
  return moment(value).format('MMMM Do YYYY, h:mm:ss a')
}
async function all_lead_status() {
  try {
    const res = await Request.GET_REQ(`/lead-status?page=${page.value}`)
    leadstatuses.value = res.data.data
    pageLinks.value = res.data.links
    isLoading.value = false
    isNewLeadStatus.value = false
  } catch (error) {
    errors.value = error.res.data.errors
  }
}
async function totalCourseLevels() {
  try {
    const res = await Request.GET_REQ(`/total-lead-status`)
    total_lead_status.value = res.data.length
    isLoading.value = false
  } catch (error) {
    errors.value = error.res.data.errors
  }
}
function processStatus(id) {
  Request.GET_REQ(`/lead-status-process/${id}`)
    .then(() => {
      emitter.emit('reload')
      Notify.success('Lead Status Updated...')
    })
    .catch((err) => {
      err && Notify.error(err.response.data.errors)
    })
}
function handleEdit(id) {
  isNewLeadStatus.value = false
  isEdit.value = true
  leadId.value = id

  if (leadId.value > 0 && isEdit.value == true) {
    Request.GET_REQ(`/edit-lead-status/${leadId.value}`)
      .then((response) => {
        status_name.value = response.data.status_name
      })
      .catch((err) => {
        Notify(err.res.data)
      })
  }
  let mange_app = document.getElementById('scroll-target')
  mange_app.scrollIntoView({ behavior: 'smooth', block: 'end' })
}
function catAddBtn() {
  isNewLeadStatus.value = true
  isEdit.value = false
  leadAddBtn.value = false
}
function cancelBtn() {
  isNewLeadStatus.value = false
  isEdit.value = false
  leadAddBtn.value = true
  status_name.value = ''
}
function errorClear() {
  errors.value = ''
}
function handleUdate() {
  Request.POST_REQ({ status_name: status_name }, `/update-lead-status/${leadId.value}`)
    .then(() => {
      status_name.value = ''
      isNewLeadStatus.value = false
      isEdit.value = false
      emitter.emit('reload')
      Notify.success('Lead Status Updated...')
    })
    .catch((err) => {
      errors.value = err.response.data.errors
      errors.value.status_name && Notify.error(errors.value.status_name[0])
    })
}

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
      border-radius: 50%;
      height: 60px;
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
.switch.s-icons {
  height: 7px;
}
</style>
