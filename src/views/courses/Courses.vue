<template>
  <div class="layout-px-spacing layout-top-spacing">
    <div class="row p-2">
      <div class="col-md-3">
        <select v-model="country_name" class="form-control" @change="searchCountryInstitute">
          <option value="" disabled>Select Country</option>
          <option v-for="country in total_countries" :key="country.id" :value="country.id">
            {{ country.country.name }}
          </option>
        </select>
      </div>
      <div class="col-md-4">
        <vue-select
          v-model="institute_id"
          :options="institutes"
          label-by="institute_name"
          :close-on-select="true"
          :clear-on-close="true"
          placeholder="Select a Country Before"
          search-placeholder="Select a University"
          searchable
          dropdown-item
          value-by="id"
        ></vue-select>
      </div>
      <div class="col-md-3">
        <input
          v-model="query"
          type="text"
          class="form-control rounded-md border-gray-300 focus:ring-blue-500"
          placeholder="Search by Course Name"
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
      <div class="col-md-2">
        <div
          v-if="
            (user && user.user_type == 'superAdmin') || (user && user.user_type == 'branchManager')
          "
          class="text-right"
        >
          <button class="btn btn-warning btn-rounded mb-2 mr-4" @click="resetSearch">
            Reset Search
          </button>
        </div>
      </div>
    </div>

    <div id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
      <div class="statbox widget box box-shadow">
        <div class="widget-content widget-content-area">
          <div class="row">
            <div class="col-md-6 d-flex pb-2">
              <div v-if="user && user.user_type == 'superAdmin'" class="text-right">
                <a :href="baseURL + '/api/export-courses'" download="files.xlsx" type="button">
                  <button class="btn btn-secondary btn-rounded mb-2 mr-4 inline-flex space-x-2">
                    Export Courses

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
                      class="feather feather-file-text"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </button>
                </a>
              </div>

              <div v-if="user && user.user_type == 'superAdmin'" class="text-right">
                <router-link to="/import-courses">
                  <button class="btn btn-primary btn-rounded mb-2 mr-4 inline-flex">
                    Import Courses
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
                      class="feather feather-upload-cloud"
                    >
                      <polyline points="16 16 12 12 8 16"></polyline>
                      <line x1="12" y1="12" x2="12" y2="21"></line>
                      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                      <polyline points="16 16 12 12 8 16"></polyline>
                    </svg>
                  </button>
                </router-link>
              </div>
            </div>
            <div class="col-md-6 d-flex pb-2">
              <div
                v-if="
                  (user && user.user_type == 'superAdmin') ||
                  (user && user.user_type == 'branchManager')
                "
                class="col text-right"
              >
                <router-link :to="{ name: 'Add_Course' }">
                  <button class="btn btn-info btn-rounded mb-2 mr-4 inline-flex">
                    Add Course
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
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col col-md-12">
              <div id="tableSimple" class="col-lg-12 col-12 p-0">
                <div class="table-responsive">
                  <table id="manage_app_process" class="table-bordered mb-4 table">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Course Name</th>
                        <th>Institute Name</th>
                        <th>Category</th>
                        <th>Course Level</th>
                        <th>Duration</th>
                        <th>Intake</th>
                        <th
                          v-if="
                            (user && user.user_type == 'superAdmin') ||
                            (user && user.user_type == 'branchManager')
                          "
                        >
                          Status
                        </th>
                        <th></th>
                        <th
                          v-if="
                            (user && user.user_type == 'superAdmin') ||
                            (user && user.user_type == 'branchManager')
                          "
                        ></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(course, index) in courses" :key="index">
                        <td>{{ page * 20 - 20 + index + 1 }}</td>
                        <td>
                          {{ course.course_name }}
                        </td>
                        <td>
                          {{ course.institute_limit && course.institute_limit.institute_name }}
                        </td>
                        <td>
                          {{ course.category && course.category.category_name }}
                        </td>
                        <td>
                          {{ course.course_level && course.course_level.course_level_name }}
                        </td>
                        <td>{{ course.course_duration }}</td>
                        <td>{{ course.course_intake }}</td>
                        <td
                          v-if="
                            (user && user.user_type == 'superAdmin') ||
                            (user && user.user_type == 'branchManager')
                          "
                        >
                          <label class="switch s-icons s-outline s-outline-success mr-2">
                            <input
                              type="checkbox"
                              :checked="course && parseInt(course.active) === 1 ? true : false"
                              @change="status(course.id)"
                            />
                            <span class="slider round"></span>
                          </label>
                        </td>
                        <td>
                          <span
                            :class="parseInt(course.active) === 1 ? 'text-success' : 'text-danger'"
                            >{{ parseInt(course.active) === 1 ? 'Active' : 'Deactive' }}</span
                          >
                        </td>
                        <td class="flex space-x-2">
                          <router-link
                            v-if="
                              (user && user.user_type == 'superAdmin') ||
                              (user && user.user_type == 'branchManager')
                            "
                            :to="{
                              name: 'Edit_Course',
                              params: { id: course.id },
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
                          <span style="cursor: pointer" @click="viewCourseDetail(course.id)">
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
                              class="feather feather-eye"
                              data-v-139ba731=""
                            >
                              <path
                                d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                                data-v-139ba731=""
                              ></path>
                              <circle cx="12" cy="12" r="3" data-v-139ba731=""></circle>
                            </svg>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col col-md-12">
              <div class="lms-pagination">
                <base-pagination
                  v-if="isSearching"
                  v-model="page"
                  :links="pageLinks"
                  @paginate="search"
                />
                <base-pagination v-else v-model="page" :links="pageLinks" @paginate="getCoruses" />
              </div>
            </div>
          </div>
          <CourseDeatailsModal :course-id="courseId" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, watch, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useDebounceFn } from '@vueuse/core'
import Request from '../../apis/Request'
import Notify from '../../helpers/Notify'
import { useEmitter } from '@/composables/useEmitter'

import { useStore } from 'vuex'

const CourseDeatailsModal = defineAsyncComponent(() =>
  import('@/components/course/CourseDetailModal.vue')
)

const store = useStore()
const route = useRoute()
const user = computed(() => store.getters.user)
const baseURL = ref(store.getters.baseURL)
const emitter = useEmitter()

const institute_id = ref('')
const country_name = ref('')
const query = ref('')
const total_countries = ref([])
const total_country = ref(0)
const countryId = ref(0)
const institutes = ref([])
const courses = ref([])
const total_courses = ref(0)
const errors = ref({})
const isLoading = ref(false)
const page = ref(route.query.page || 1)
const pageLinks = ref([])
const isSearching = ref(false)
const searchLoading = ref(false)
const courseId = ref(0)

const getCoruses = async () => {
  try {
    const res = await Request.GET_REQ(`/courses?page=${page.value}`)
    courses.value = res.data.data
    pageLinks.value = res.data.links
    isLoading.value = false
    total_courses.value = res.data.total
    return Promise.resolve(res.data.data)
  } catch (error) {
    errors.value = error.res.data.errors
    return Promise.reject(error.res.data.errors)
  }
}

const totalCountry = async () => {
  isLoading.value = true
  try {
    const res = await Request.GET_REQ('/total-represent-countries')
    total_country.value = res.data.data.length
    total_countries.value = res.data.data
    isLoading.value = false
  } catch (error) {
    errors.value = error.res.data.errors
  }
}

const status = (id) => {
  Request.GET_REQ(`/course-status/${id}`)
    .then(() => {
      emitter.emit('reload')
      Notify.success('Course Level Updated...')
    })
    .catch((err) => {
      errors.value = err.res.data.errors
    })
}

const searchCountryInstitute = (event) => {
  let cId = event.target.value
  countryId.value = cId

  Request.GET_REQ(`/active-country-institute/${cId}`)
    .then((res) => {
      institutes.value = res.data
    })
    .catch((err) => {
      errors.value = err.res.data.errors
    })
}

async function search() {
  isSearching.value = true
  if (institute_id.value) {
    try {
      const res = await Request.GET_REQ(
        `/courses/search?q=${query.value}&institute_id=${institute_id.value}&page=${page.value}`
      )
      courses.value = res.data.data
      pageLinks.value = res.data.links
    } catch (error) {
      errors.value = error.res.data.errors
    }
  } else {
    try {
      const res = await Request.GET_REQ(`/courses/search?q=${query.value}&page=${page.value}`)
      courses.value = res.data.data
      pageLinks.value = res.data.links
    } catch (error) {
      errors.value = error.res.data.errors
    }
  }
}

const resetSearch = () => {
  isSearching.value = false
  query.value = ''
  country_name.value = ''
  institute_id.value = null
}

const viewCourseDetail = (cId) => {
  courseId.value = cId
  $('#view-course-detail').modal('show')
}

watch([query, institute_id], useDebounceFn(search, 300))

//fetching
await getCoruses()
await totalCountry()
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
.search-icon {
  position: absolute;
  right: 5%;
  top: 15%;
}
</style>
