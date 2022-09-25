<template>
  <div class="layout-px-spacing">
    <div
      v-if="(user && user.user_type == 'superAdmin') || (user && user.user_type == 'branchManager')"
      class="text-right layout-top-spacing"
    >
      <button
        v-if="categoryAddBtn == true"
        class="btn btn-info mb-2 mr-4 btn-rounded inline-flex items-center"
        @click="catAddBtn"
      >
        Add Course Level
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
        v-if="isNewCourseLevel == true"
        id="card_1"
        class="col-lg-12 layout-spacing layout-top-spacing"
      >
        <div class="statbox widget box box-shadow">
          <div class="widget-content widget-content-area">
            <div v-if="isNewCourseLevel == true" class="row">
              <div class="col-md-9">
                <div>
                  <input
                    v-model="course_level_name"
                    class="form-control"
                    placeholder="Type New Course Level"
                    @keydown="errorClear"
                  />
                  <small
                    v-if="errors.course_level_name"
                    id="sh-text1"
                    class="form-text text-danger text-left"
                    >{{ errors.course_level_name[0] }}</small
                  >
                </div>
              </div>
              <div class="col-md-3">
                <button
                  class="btn btn-success mb-2 mr-4 btn-rounded inline-flex"
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

                <button class="btn btn-warning mb-2 mr-4 btn-rounded" @click="cancelBtn">
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
                    v-model="course_level_name"
                    class="form-control"
                    placeholder="Type New Course Level"
                    @keydown="errorClear"
                  />
                  <small
                    v-if="errors.course_level_name"
                    id="sh-text1"
                    class="form-text text-danger text-left"
                    >{{ errors.course_level_name[0] }}</small
                  >
                </div>
              </div>
              <div class="col-md-3">
                <button
                  v-if="isEdit == true"
                  class="btn btn-success mb-2 mr-4 btn-rounded inline-flex"
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

                <button class="btn btn-warning mb-2 mr-4 btn-rounded" @click="cancelBtn">
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
                      <h4>Course Level List</h4>
                    </div>
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th class="text-center">#</th>
                        <th>Course Level Name</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th
                          v-if="user.user_type == 'superAdmin' || user.user_type == 'branchManager'"
                          class="text-center"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(courselevel, index) in courselevels" :key="index">
                        <td class="text-center">{{ index + 1 }}</td>
                        <td>{{ courselevel.course_level_name }}</td>
                        <td>
                          <div class="text-left">
                            <span
                              :class="courselevel.active == 1 ? 'text-success' : 'text-danger'"
                              >{{ courselevel.active == 1 ? 'Active' : 'Deactive' }}</span
                            >
                          </div>
                        </td>
                        <td>
                          <p class="text-secondary">
                            {{ dateTime(courselevel.created_at) }}
                          </p>
                        </td>
                        <td
                          v-if="user.user_type == 'superAdmin' || user.user_type == 'branchManager'"
                          class="text-center"
                        >
                          <ul class="table-controls flex justify-center">
                            <li>
                              <a
                                href="javascript:void(0);"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Edit"
                                class="badge badge-pill badge-secondary custom-btn-branch mr-2"
                                @click="handleEdit(courselevel.id)"
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
                                  :checked="courselevel.active !== 1 ? checked : ''"
                                  @change="processStatus(courselevel.id)"
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
                        @paginate="allCourseLevels"
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
import { useRoute } from 'vue-router'
import { useEmitter } from '@/composables/useEmitter'
import moment from 'moment'
import Request from '../../apis/Request'
import Notify from '../../helpers/Notify'

const store = useStore()
const route = useRoute()
const emitter = useEmitter()
const user = computed(() => store.getters.user)

const courselevels = ref([])
const total_categories = ref(0)
const errors = ref({})
const isLoading = ref(false)
const isNewCourseLevel = ref(false)
const isEdit = ref(false)
const course_level_name = ref('')
const catid = ref('')
const page = ref(route.query.page ? route.query.page : 1)
const pageLinks = ref([])
const categoryAddBtn = ref(true)

//methods
async function fetchPrimary() {
  isLoading.value = true
  await allCourseLevels()
  await totalCourseLevels()

  emitter.on('reload', async () => {
    await allCourseLevels()
    await totalCourseLevels()
  })
}

function handleSubmit() {
  Request.POST_REQ({ course_level_name: course_level_name.value }, '/add-course-level')
    .then(() => {
      course_level_name.value = ''
      emitter.emit('reload')
      Notify.success('Course Level Added')
    })
    .catch((err) => {
      errors.value = err.response.data.errors
      errors.value.course_level_name && Notify.error(errors.value.course_level_name[0])
    })
}
function dateTime(value) {
  return moment(value).format('MMMM Do YYYY, h:mm:ss a')
}
async function allCourseLevels() {
  try {
    const res = await Request.GET_REQ(`/course-levels?page=${page.value}`)
    courselevels.value = res.data.data
    pageLinks.value = res.data.links
    isLoading.value = false
    isNewCourseLevel.value = false
  } catch (error) {
    errors.value = error.res.data.errors
  }
}
async function totalCourseLevels() {
  try {
    const res = await Request.GET_REQ(`/total-course-level`)
    total_categories.value = res.data.length
    isLoading.value = false
  } catch (error) {
    errors.value = error.res.data.errors
  }
}
function processStatus(id) {
  Request.GET_REQ(`/course-level-status/${id}`)
    .then(() => {
      emitter.emit('reload')
      Notify.success('Course Level Updated...')
    })
    .catch((err) => {
      err && Notify.error(err.response.data.errors)
    })
}
function handleEdit(id) {
  isNewCourseLevel.value = false
  isEdit.value = true
  catid.value = id

  if (catid.value > 0 && isEdit.value == true) {
    Request.GET_REQ(`/edit-course-level/${catid.value}`)
      .then((response) => {
        course_level_name.value = response.data.course_level_name
      })
      .catch((err) => {
        Notify(err.res.data)
      })
  }
  let mange_app = document.getElementById('scroll-target')
  mange_app.scrollIntoView({ behavior: 'smooth', block: 'end' })
}
function catAddBtn() {
  isNewCourseLevel.value = true
  isEdit.value = false
  categoryAddBtn.value = false
}
function cancelBtn() {
  isNewCourseLevel.value = false
  isEdit.value = false
  categoryAddBtn.value = true
  course_level_name.value = ''
}
function errorClear() {
  errors.value = ''
}
function handleUdate() {
  Request.POST_REQ({ course_level_name: course_level_name }, `/update-course-level/${catid.value}`)
    .then(() => {
      course_level_name.value = ''
      emitter.emit('reload')
      Notify.success('Course Level Updated...')
    })
    .catch((err) => {
      errors.value = err.response.data.errors
      errors.value.course_level_name && Notify.error(errors.value.course_level_name[0])
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
