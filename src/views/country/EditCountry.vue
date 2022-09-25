<template>
  <div class="layout-px-spacing">
    <form enctype="multipart/form-data" @submit.prevent="handleSubmit">
      <div id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
        <div class="statbox widget box box-shadow">
          <div class="widget-content widget-content-area">
            <div class="row mb-4">
              <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                <div class="d-flex align-items-start justify-content-between">
                  <h4>Edit Country Information</h4>
                  <router-link :to="{ name: 'Countries' }">
                    <button class="btn btn-info mb-2 mr-4 btn-rounded inline-flex items-center">
                      View Countries
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

                <br />
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Country</label>
                  <input type="text" class="form-control" disabled :value="country_name" />
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Monthly Living Cost</label>
                  <input v-model="monthly_living_cost" type="text" class="form-control" />
                  <small
                    v-if="errors.monthly_living_cost"
                    id="sh-text1"
                    class="form-text text-danger"
                    >{{ errors.monthly_living_cost[0] }}</small
                  >
                </div>
              </div>
              <div class="col">
                <div class="row d-flex align-items-center">
                  <div class="col col-md-8">
                    <div class="form-group mb-4">
                      <label>Upload Country Flag</label>
                      <label class="custom-file-container__custom-file">
                        <input
                          type="file"
                          class="form-control-file"
                          accept="image/*"
                          @change="onFileChange"
                        />
                      </label>
                      <div class="custom-file-container__image-preview"></div>
                    </div>
                  </div>
                  <div class="col col-md-4">
                    <div v-if="flag" class="office-logo">
                      <img alt="Country Flag" :src="baseURL + flag" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlTextarea1">Visa Requirements</label>
                  <textarea
                    id="exampleFormControlTextarea1"
                    v-model="visa_requirements"
                    class="form-control"
                    rows="3"
                    spellcheck="false"
                  ></textarea>
                  <small
                    v-if="errors.visa_requirements"
                    id="sh-text1"
                    class="form-text text-danger"
                    >{{ errors.visa_requirements[0] }}</small
                  >
                </div>
              </div>

              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlTextarea1">Part Time Work Details</label>
                  <textarea
                    id="exampleFormControlTextarea1"
                    v-model="part_time_work"
                    class="form-control"
                    rows="3"
                    spellcheck="false"
                  ></textarea>
                  <small v-if="errors.part_time_work" id="sh-text1" class="form-text text-danger">{{
                    errors.part_time_work[0]
                  }}</small>
                </div>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlTextarea1">Accommodation Details</label>
                  <textarea
                    id="exampleFormControlTextarea1"
                    v-model="accommodation_details"
                    class="form-control"
                    rows="3"
                    spellcheck="false"
                  ></textarea>
                  <small
                    v-if="errors.accommodation_details"
                    id="sh-text1"
                    class="form-text text-danger"
                    >{{ errors.accommodation_details[0] }}</small
                  >
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlTextarea1">Country Benifits</label>
                  <textarea
                    id="exampleFormControlTextarea1"
                    v-model="country_benifits"
                    class="form-control"
                    rows="3"
                    spellcheck="false"
                  ></textarea>
                  <small
                    v-if="errors.country_benifits"
                    id="sh-text1"
                    class="form-text text-danger"
                    >{{ errors.country_benifits[0] }}</small
                  >
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
              <div class="col text-right">
                <div class="row">
                  <div class="col">
                    <router-link :to="{ name: 'Countries' }">
                      <button type="button" class="btn btn-warning mr-2 btn-lg">Cancel</button>
                    </router-link>
                    <button type="submit" class="btn btn-primary mr-2 btn-lg">Update</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
      <div id="add-new-status-sec" class="statbox widget box box-shadow">
        <div class="widget-content widget-content-area">
          <div class="row mb-4">
            <div class="col-xl-12 col-md-12 col-sm-12 col-12">
              <h4>Add Application Process</h4>
              <br />
            </div>
            <div class="col col-md-12">
              <div
                v-for="(input, index) in newStatuses"
                :key="index"
                class="form-group mb-4 d-flex align-items-end"
              >
                <div class="col col-md-8 pl-0">
                  <label for="exampleFormControlTextarea1">Status</label>
                  <input v-model="input.status_name_new" type="text" class="form-control" />
                  <small
                    v-if="statusErrors.has(`statuses.${index}.status_name_new`)"
                    id="sh-text1"
                    class="form-text text-danger"
                    >{{ statusErrors.get(`statuses.${index}.status_name_new`) }}</small
                  >

                  <div class="d-flex align-items-center">
                    <label class="mt-2 mr-2">{{ input.status_name_new }} Status Color</label>
                    <input v-model="input.status_color_new" style="cursor: pointer" type="color" />
                  </div>
                </div>
                <div class="row ml-4 mt-4">
                  <div v-show="index == newStatuses.length - 1">
                    <button class="btn btn-warning mb-2 mr-2 btn-rounded" @click.prevent="add">
                      Add More
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
                  </div>
                  <div v-show="index || (!index && newStatuses.length > 1)">
                    <button class="btn btn-danger mb-2 mr-2 btn-rounded" @click.prevent="remove">
                      Remove
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
                        class="feather feather-x-circle"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <button class="btn btn-primary" @click="addNewStatus">Save New Status</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ManageStatus
      :statuses="statuses"
      :country-id="country_id"
      @realodList="getData"
      @realodStatus="realodStatus"
    />
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import ManageStatus from '@/components/ManageStatus.vue'
import { useStore } from 'vuex'
import { useEmitter } from '@/composables/useEmitter'
import Notify from '../../helpers/Notify'
import Request from '../../apis/Request'
import baseURL from '../../apis/baseURL'
import { useRoute, useRouter } from 'vue-router'

class Errors {
  constructor() {
    this.errors = {}
  }

  has(field) {
    return Object.prototype.hasOwnProperty.call(this.errors, field)
  }

  any() {
    return Object.keys(this.errors).length > 0
  }

  get(field) {
    if (this.errors[field]) {
      return this.errors[field][0]
    }
  }

  record(errors) {
    this.errors = errors.errors
  }

  clear(field) {
    delete this.errors[field]
  }
}

const store = useStore()
const router = useRouter()
const route = useRoute()
const emitter = useEmitter()
const user = computed(() => store.getters.user)

const country_id = ref('')
const country_name = ref('')
const logo = ref('')
const monthly_living_cost = ref('')
const visa_requirements = ref('')
const part_time_work = ref('')
const accommodation_details = ref('')
const country_benifits = ref('')
const countries = ref([])
const flag = ref('')
const statuses = ref([
  {
    status_name: '',
    status_color: '#e2a03f',
  },
])
const newStatuses = ref([
  {
    status_name_new: '',
    status_color_new: '#e2a03f',
  },
])

const errors = ref({})
const isLoading = ref(false)
const statusErrors = ref(new Errors())

//methods
async function fetchPrimary() {
  isLoading.value = true
  await getData()
  emitter.on('reloadNewStatus', () => {
    realodStatus()
  })
}

async function getData() {
  let slug = route.params.slug

  try {
    const res = await Request.GET_REQ(`/edit-country/${slug}`)
    country_id.value = res.data.id
    country_name.value = res.data.country.name
    flag.value = res.data.flag
    monthly_living_cost.value = res.data.monthly_living_cost
    visa_requirements.value = res.data.visa_requirements
    part_time_work.value = res.data.part_time_work
    country_benifits.value = res.data.country_benifits
    accommodation_details.value = res.data.accommodation_details
    statuses.value = res.data.statuses
    isLoading.value = false
  } catch (error) {
    Notify.error(error.response.data.message)
  }
}
function handleSubmit() {
  isLoading.value = true
  const slug = route.params.slug
  const data = {
    flag: flag.value,
    monthly_living_cost: monthly_living_cost.value,
    visa_requirements: visa_requirements.value,
    part_time_work: part_time_work.value,
    accommodation_details: accommodation_details.value,
    country_benifits: country_benifits.value,
    statuses: statuses.value,
  }

  Request.POST_REQ(data, `/update-country/${slug}`)
    .then(() => {
      isLoading.value = false
      store.dispatch('baseurl', baseURL.baseURL)
      router.push({ name: 'Countries' })
      Notify.success('The Country Successfully Updated')
    })
    .catch((err) => {
      errors.value = err.response.data.errors
      isLoading.value = false

      Notify.error(errors.value.country_id && errors.value.country_id[0])
      Notify.error(errors.value.monthly_living_cost && errors.value.monthly_living_cost[0])
      Notify.error(errors.value.visa_requirements && errors.value.visa_requirements[0])
      Notify.error(errors.value.part_time_work && errors.value.part_time_work[0])
      Notify.error(errors.value.accommodation_details && errors.value.accommodation_details[0])
      Notify.error(errors.value.country_benifits && errors.value.country_benifits[0])
    })
}
function onFileChange(event) {
  store.dispatch('baseurl', '')
  logo.value = null
  let file = event.target.files[0]
  if (file.size > 1048770) {
    Notify.warning('File size not bigger than 2 MB')
  } else {
    let reader = new FileReader()
    reader.onload = (event) => {
      flag.value = event.target.result
    }
    reader.readAsDataURL(file)
  }
}
function realodStatus(id) {
  Request.GET_REQ(`/check-status-is-publish/${id && id ? id : country_id.value}`)
    .then((res) => {
      statuses.value = res.data
    })
    .catch((err) => {
      Notify(err.res.data)
    })
}
function add() {
  newStatuses.value.push({
    status_name_new: '',
    status_color_new: '#e2a03f',
  })
}
function remove(index) {
  newStatuses.value.splice(index, 1)
}
function addNewStatus() {
  let data = {
    country_id: country_id.value,
    statuses: newStatuses.value,
  }
  Request.POST_REQ(data, '/add-new-status')
    .then(() => {
      isLoading.value = false
      // $router.push({ name: "Countries" });
      emitter.emit('reloadNewStatus')
      Notify.success('Status Created Successfully')
      newStatuses.value = { status_name_new: '', status_color_new: '#e2a03f' }
    })
    .catch((error) => {
      if (statusErrors.value) {
        statusErrors.value.record(error.response.data)
      }
      isLoading.value = false
      statusErrors.value.has('status_name_new') &&
        Notify.error(statusErrors.value.get('status_name_new'))
      statusErrors.value.has('status_color_new') &&
        Notify.error(statusErrors.value.get('status_color_new'))
    })
}

await fetchPrimary()
</script>
<style scoped lang="scss">
.component-card_1 {
  width: auto;
}
body.dark .office-logo img {
  border: 1px solid #1b2e4b;
}
.office-logo img {
  width: 100px;
  border: 1px solid #bfc9d4;
  border-radius: 5px;
  padding: 5px;
}
.office-logo {
  width: 100%;
  text-align: right;
}
.switch.s-icons {
  width: auto;
  height: 10px;
}
</style>
