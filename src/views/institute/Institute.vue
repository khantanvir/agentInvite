<template>
  <div class="layout-px-spacing layout-top-spacing">
    <div class="row p-2">
      <div class="col-md-4">
        <div class="form-group mb-4">
          <select v-model="countryId" class="form-control">
            <option value="" disabled>Search Country</option>
            <option v-for="country in total_countries" :key="country.id" :value="country.id">
              {{ country.country?.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group mb-4">
          <input
            v-model="query"
            @update:modelValue="isSearch = true"
            type="text"
            class="form-control rounded-md border-gray-300 focus:ring-blue-500"
            placeholder="Search by Institute Name"
            style="position: relative"
          />
          <span v-if="searchLoading" class="search-icon">
            <FeatherLoaderSpinSvg />
          </span>
          <span v-if="!searchLoading" class="search-icon">
            <FeatherSearchSvg />
          </span>
          <span
            v-if="isSearch || countryId"
            class="inline-block w-full cursor-pointer text-right text-blue-500"
            @click="resetSearch"
            >Clear</span
          >
        </div>
      </div>
      <div class="col-md-4">
        <div
          v-if="
            (user && user.user_type == 'superAdmin') || (user && user.user_type == 'branchManager')
          "
          class="text-right"
        >
          <router-link :to="{ name: 'Add_Institute' }">
            <button class="btn btn-info btn-rounded mb-2 mr-4 inline-flex">
              Add Institute
              <FeatherPlusCircleSvg />
            </button>
          </router-link>
        </div>
      </div>
    </div>

    <div id="card_1" class="col-lg-12 layout-spacing">
      <div class="statbox widget box box-shadow">
        <div class="widget-content widget-content-area">
          <div class="row">
            <div class="col-md-12 d-flex pb-2">
              <div v-if="user && user.user_type == 'superAdmin'" class="text-right">
                <a :href="baseURL + '/api/export-institute'" download="files.xlsx" type="button">
                  <button class="btn btn-secondary btn-rounded mb-2 mr-4 inline-flex">
                    Export Institute

                    <FeatherFileTextSvg />
                  </button>
                </a>
              </div>

              <div v-if="user && user.user_type == 'superAdmin'" class="text-right">
                <router-link to="/import-institute">
                  <button class="btn btn-primary btn-rounded mb-2 mr-4 inline-flex">
                    Import Institute
                    <FeatherUploadCloudSvg />
                  </button>
                </router-link>
              </div>
            </div>
          </div>
          <div class="row">
            <div v-for="institute in institutes" :key="institute.id" class="col col-md-4 mb-4">
              <div class="card component-card_4">
                <div class="card-body">
                  <div class="user-info">
                    <div class="d-flex align-items-start justify-content-between pl-4">
                      <div class="logo-title-wrap">
                        <img
                          v-if="institute.institute_logo"
                          :src="baseURL + `/${institute.institute_logo}`"
                          class=""
                          alt="..."
                        />
                        <img v-else src="@/assets/img/no-image.png" class="" alt="..." />
                      </div>
                      <div class="action-wrap d-flex align-items-center justify-content-between">
                        <span class="badge badge-pill badge-warning custom-btn-branch">
                          <router-link
                            :to="{
                              name: 'View_Institute',
                              params: { id: institute.id },
                            }"
                          >
                            <FeeatherEyeSvg />
                          </router-link>
                        </span>

                        <router-link
                          v-if="
                            (user && user.user_type == 'superAdmin') ||
                            (user && user.user_type == 'branchManager')
                          "
                          :to="{
                            name: 'Edit_Institute',
                            params: { id: institute.id },
                          }"
                        >
                          <span class="badge badge-pill badge-secondary custom-btn-branch">
                            <FeatherEdit3Svg />
                          </span>
                        </router-link>
                        <label
                          v-if="
                            (user && user.user_type == 'superAdmin') ||
                            (user && user.user_type == 'branchManager')
                          "
                          class="switch s-icons s-outline s-outline-success mr-2"
                        >
                          <input
                            type="checkbox"
                            :checked="institute && +institute.active === 1 ? true : false"
                            @change="status(institute.id)"
                          />
                          <span class="slider round"></span>
                        </label>
                      </div>
                    </div>

                    <div class="card-info-lists px-4">
                      <div class="title-subtitle-wrap mt-4">
                        <h3 class="card-user_name">
                          {{ institute.institute_name }}
                        </h3>
                        <p class="card-user_occupation">
                          {{
                            institute.represent_country && institute.represent_country.country.name
                          }}
                        </p>
                      </div>

                      <ul class="list-group custom-list-group-branch">
                        <li
                          class="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <h6 class="count-primary">Total Courses</h6>
                          <span class="badge badge-primary">{{ institute.courses_count }}</span>
                        </li>
                        <li
                          class="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <h6 class="count-info">Monthly Living Costs</h6>
                          <span class="badge badge-info">{{ institute.monthly_living_cost }}</span>
                        </li>

                        <li
                          class="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <h6 class="count-success">Is Language Mendatory</h6>
                          <span class="badge badge-success">{{ institute.is_lang_mendatory }}</span>
                        </li>
                        <li
                          class="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <h6 class="count-warning">Currency</h6>
                          <span class="badge badge-warning">{{ institute.currency }}</span>
                        </li>
                        <li
                          class="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <router-link
                            v-if="
                              (user && user.user_type == 'superAdmin') ||
                              (user && user.user_type == 'branchManager')
                            "
                            :to="{
                              name: 'Edit_Institute',
                              params: { id: institute.id },
                            }"
                          >
                            <h6 class="count-danger">Manage Institute</h6>
                          </router-link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col col-md-12">
              <div class="lms-pagination">
                <base-pagination
                  v-if="isSearch"
                  :links="pageLinks"
                  v-model="page"
                  @paginate="search"
                />
                <base-pagination
                  v-else
                  :links="pageLinks"
                  v-model="page"
                  @paginate="fetchInstitute"
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
import { ref, computed, watch, defineAsyncComponent } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useDebounceFn } from '@vueuse/core'
import { useEmitter } from '@/composables/useEmitter'
import Request from '../../apis/Request'
import Notify from '../../helpers/Notify'

//components
const FeatherLoaderSpinSvg = defineAsyncComponent(() => import('@/svg/FeatherLoaderSpinSvg.vue'))
const FeatherSearchSvg = defineAsyncComponent(() => import('@/svg/FeatherSearchSvg.vue'))
const FeatherPlusCircleSvg = defineAsyncComponent(() => import('@/svg/FeatherPlusCircleSvg.vue'))
const FeatherFileTextSvg = defineAsyncComponent(() => import('@/svg/FeatherFileTextSvg.vue'))
const FeatherUploadCloudSvg = defineAsyncComponent(() => import('@/svg/FeatherUploadCloudSvg.vue'))
const FeeatherEyeSvg = defineAsyncComponent(() => import('@/svg/FeeatherEyeSvg.vue'))
const FeatherEdit3Svg = defineAsyncComponent(() => import('@/svg/FeatherEdit3Svg.vue'))

//data
const store = useStore()
const route = useRoute()
const emitter = useEmitter()
const user = computed(() => store.getters.user)
const baseURL = computed(() => store.getters.baseURL)

const institutes = ref([])
const total_countries = ref([])
const total_country = ref(0)
const errors = ref({})
const isLoading = ref(false)
const query = ref('')
const isSearch = ref(false)
const page = ref(route.query.page ? route.query.page : 1)
const pageLinks = ref([])
const all_institutes = ref(0)
const searchLoading = ref(false)
const countryId = ref('')

//methods
async function fetchPrimary() {
  await getTotalInstitute()
  await getInstitute()
  await totalCountry()
  emitter.on('institute-reload', async () => {
    await getTotalInstitute()
    await getInstitute()
  })
}

async function getInstitute() {
  isLoading.value = true
  searchLoading.value = false

  try {
    const res = await Request.GET_REQ(`/institutes?page=${page.value}`)
    institutes.value = res.data.data
    pageLinks.value = res.data.links
    isLoading.value = false
  } catch (error) {
    errors.value = error.res.data.errors
  }
}
async function getTotalInstitute() {
  try {
    const res = await Request.GET_REQ('/all-institutes')
    all_institutes.value = res.data
    isLoading.value = false
  } catch (error) {
    errors.value = error.res.data.errors
  }
}
async function fetchInstitute() {
  try {
    const res = await Request.GET_REQ(`/institutes?page=${page.value}`)
    isSearch.value = false
    institutes.value = res.data.data
    pageLinks.value = res.data.links
    isLoading.value = false
  } catch (error) {
    errors.value = error.res.data.errors
  }
}
async function totalCountry() {
  isLoading.value = true

  try {
    const res = await Request.GET_REQ('/active-represent-countries')
    total_country.value = res.data.length
    total_countries.value = res.data
    isLoading.value = false
  } catch (error) {
    errors.value = error.res.data.errors
  }
}
// searching institute
async function search() {
  if (countryId.value) {
    try {
      const res = await Request.GET_REQ(
        `/institutes/search?q=${query.value}&country_id=${countryId.value}&page=${page.value}`
      )
      institutes.value = res.data.data
      pageLinks.value = res.data.links
    } catch (error) {
      errors.value = error.res.data.errors
    }
  } else if (query.value) {
    try {
      const res = await Request.GET_REQ(`/institutes/search?q=${query.value}&page=${page.value}`)
      institutes.value = res.data.data
      pageLinks.value = res.data.links
    } catch (error) {
      errors.value = error.res.data.errors
    }
  } else {
    await fetchInstitute()
  }
}

function resetSearch() {
  isSearch.value = false
  countryId.value = ''
  query.value = ''
}
function status(id) {
  Request.GET_REQ(`/institue-change-status/${id}`)
    .then(() => {
      emitter.emit('institute-reload')
      Notify.success('Institute Status Updated...')
    })
    .catch((err) => {
      errors.value = err.res.data.errors
    })
}

watch([query, countryId], useDebounceFn(search, 1000))

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
.search-icon {
  position: absolute;
  right: 5%;
  top: 15%;
}
</style>