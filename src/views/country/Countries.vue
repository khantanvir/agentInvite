<template>
  <div class="layout-px-spacing">
    <div class="d-flex align-items-center justify-content-between mt-4 text-right">
      <div class="form-group col-md-4">
        <select v-model="country_name" class="form-control" @change="searchCountry($event)">
          <option value="" disabled>Search Country</option>
          <option v-for="country in total_countries" :key="country.id" :value="country.id">
            {{ country?.country?.name }}
          </option>
        </select>
        <small v-if="errors.country" id="sh-text1" class="form-text text-danger">{{
          errors.country[0]
        }}</small>
      </div>
      <router-link
        v-if="
          (user && user.user_type == 'superAdmin') || (user && user.user_type == 'branchManager')
        "
        :to="{ name: 'Add_Country' }"
      >
        <button class="btn btn-info btn-rounded mb-2 mr-4 inline-flex items-center">
          Add Country
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
    <div id="card_1" class="col-lg-12 layout-spacing">
      <div class="statbox widget box box-shadow">
        <div class="widget-content widget-content-area">
          <div class="row">
            <div v-for="country in countries" :key="country.id" class="col col-md-4 mb-4">
              <div class="card component-card_4">
                <div class="card-body custom-card-body-country">
                  <div class="user-info">
                    <div class="d-flex align-items-start justify-content-between pl-4">
                      <div class="logo-title-wrap">
                        <img
                          v-if="country.flag"
                          :src="baseURL + `/${country.flag}`"
                          class=""
                          alt="..."
                        />
                        <img v-else src="@/assets/logo.png" class="" alt="..." />
                      </div>
                      <div class="action-wrap d-flex align-items-center justify-content-between">
                        <span class="badge badge-pill badge-warning custom-btn-branch">
                          <router-link
                            v-if="
                              (user && user.user_type == 'superAdmin') ||
                              (user && user.user_type == 'branchManager')
                            "
                            :to="{
                              name: 'View_Country',
                              params: { slug: country.slug },
                            }"
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
                              class="feather feather-eye"
                            >
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                          </router-link>
                        </span>

                        <router-link
                          v-if="
                            (user && user.user_type == 'superAdmin') ||
                            (user && user.user_type == 'branchManager')
                          "
                          :to="{
                            name: 'Edit_Country',
                            params: { slug: country.slug },
                          }"
                        >
                          <span class="badge badge-pill badge-secondary custom-btn-branch">
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
                            :checked="country && parseInt(country.active) === 1 ? true : false"
                            @change="status(country.id)"
                          />
                          <span class="slider round"></span>
                        </label>
                      </div>
                    </div>

                    <div class="card-info-lists px-4">
                      <div class="title-subtitle-wrap mt-4">
                        <h3 class="card-user_name">
                          {{ country.country?.name }}
                        </h3>
                        <p class="card-user_occupation">Code: {{ country.country?.code }}</p>
                      </div>

                      <ul class="list-group custom-list-group-branch">
                        <li
                          class="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <h6 class="count-primary">Application Status</h6>
                          <span class="badge badge-primary">{{ country.statuses_count }}</span>
                        </li>
                        <li
                          v-if="
                            (user && user.user_type == 'superAdmin') ||
                            (user && user.user_type == 'branchManager')
                          "
                          class="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <h6 class="count-info">
                            <router-link
                              v-if="
                                (user && user.user_type == 'superAdmin') ||
                                (user && user.user_type == 'branchManager')
                              "
                              :to="{
                                name: 'Edit_Country',
                                params: {
                                  slug: country.slug,
                                },
                                hash: '#add-new-status-sec',
                              }"
                              >Add New Status
                            </router-link>
                          </h6>
                          <!-- <span class="badge badge-info">500</span> -->
                        </li>

                        <li
                          v-if="
                            (user && user.user_type == 'superAdmin') ||
                            (user && user.user_type == 'branchManager')
                          "
                          class="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <h6 class="count-success">
                            <router-link
                              v-if="
                                (user && user.user_type == 'superAdmin') ||
                                (user && user.user_type == 'branchManager')
                              "
                              :to="{
                                name: 'Edit_Country',
                                params: { slug: country.slug },
                              }"
                              >Manage Status
                            </router-link>
                          </h6>
                          <!-- <span class="badge badge-success">10</span> -->
                        </li>
                        <li
                          class="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <h6 class="count-warning">Total Universities</h6>
                          <span class="badge badge-warning">{{ country.institutes_count }}</span>
                        </li>
                        <li
                          class="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <h6 class="count-danger">Status Notes</h6>
                          <!-- <span class="badge badge-danger">3500</span> -->
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
                <!-- <pagination
                  v-if="!isSearch"
                  v-model="page"
                  :records="total_country"
                  :per-page="9"
                  @paginate="getCountry"
                /> -->
                <base-pagination v-model="page" :links="pageLinks" @paginate="getCountry" />
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
import Request from '../../apis/Request'
import Notify from '../../helpers/Notify'

const store = useStore()
const route = useRoute()
const user = computed(() => store.getters.user)
const baseURL = ref(store.state.baseURL)
const emitter = useEmitter()

const country_name = ref('')
const page = ref(route.query.page ? route.query.page : 1)
const pageLinks = ref([])
const total_country = ref(0)
const countries = ref([])
const total_countries = ref([])
const errors = ref({})
const isLoading = ref(false)
const isSearch = ref(false)
//methods
const getCountry = async () => {
  isSearch.value = false
  isLoading.value = true
  try {
    const res = await Request.GET_REQ(`/represent-countries?page=${page.value}`)
    countries.value = res.data.data
    pageLinks.value = res.data.meta.links
    isLoading.value = false
  } catch (error) {
    errors.value = error.res.data.errors
  }
}
const totalCountry = async () => {
  isLoading.value = true
  try {
    const res = await Request.GET_REQ('/total-represent-countries')
    total_country.value = res.data.length
    total_countries.value = res.data
    isLoading.value = false
  } catch (error) {
    errors.value = error.res.data.errors
  }
}
const searchCountry = async (event) => {
  let countryId = event.target.value
  isLoading.value = true
  isSearch.value = true
  try {
    const res = await Request.GET_REQ(`/search-represent-countries/${countryId}`)
    countries.value = res.data
    isLoading.value = false
  } catch (error) {
    errors.value = error.res.data.errors
  }
}
const status = async (id) => {
  try {
    const res = await Request.GET_REQ(`/country-active-status/${id}`)
    emitter.emit('country-reload')
    Notify.success('Country Status Updated...')
  } catch (error) {
    errors.value = error.res.data.errors
  }
}
const fetchPrimary = async () => {
  await getCountry()
  await totalCountry()
  emitter.on('country-reload', async () => {
    await getCountry()
    await totalCountry()
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
body.dark .custom-card-body-country {
  ul.list-group a {
    color: #e0e6ed !important;
  }
}
</style>
