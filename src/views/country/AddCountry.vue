<template>
  <div class="layout-px-spacing">
    <form enctype="multipart/form-data" @submit.prevent="handleSubmit">
      <div id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
        <div class="statbox widget box box-shadow">
          <div class="widget-content widget-content-area">
            <div class="row mb-4">
              <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                <div class="d-flex align-items-start justify-content-between">
                  <h4>Add Country Information</h4>
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
                  <select v-model="country_id" class="form-control">
                    <option disabled value="">Select Country</option>
                    <option v-for="countri in countries" :key="countri.id" :value="countri.id">
                      {{ countri.name }}
                    </option>
                  </select>
                  <small v-if="errors.country_id" id="sh-text1" class="form-text text-danger">{{
                    errors.country_id[0]
                  }}</small>
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
                      <img alt="Country Flag" :src="flag" />
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
            <div class="row mb-4">
              <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                <h4>Add Application Process</h4>
                <br />
              </div>
              <div class="col col-md-12">
                <div
                  v-for="(input, index) in statuses"
                  :key="index"
                  class="form-group mb-4 d-flex align-items-end"
                >
                  <div class="col col-md-8 pl-0">
                    <label for="exampleFormControlTextarea1">Status {{ index + 1 }}</label>
                    <input v-model="input.status_name" type="text" class="form-control" />
                    <small v-if="errors.status_name" id="sh-text1" class="form-text text-danger">{{
                      errors.status_name[0]
                    }}</small>

                    <div class="d-flex align-items-center">
                      <label class="mt-2 mr-2">{{ input.status_name }} Status Color</label>
                      <input v-model="input.status_color" style="cursor: pointer" type="color" />
                    </div>
                  </div>
                  <div class="row ml-4 mt-4">
                    <div v-show="index == statuses.length - 1">
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
                    <div v-show="index || (!index && statuses.length > 1)">
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
                    <router-link :to="{ name: 'Branches' }">
                      <button type="submit" class="btn btn-warning mr-2 btn-lg">Cancel</button>
                    </router-link>
                    <button type="submit" class="btn btn-primary mr-2 btn-lg">Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
import Notify from '../../helpers/Notify'
import Request from '../../apis/Request'

const store = useStore()
const router = useRouter()
const user = computed(() => store.getters.user)
const pendingStatus = computed(() => store.getters.pendingStatus)

const country_id = ref('')
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

const errors = ref({})
const isLoading = ref(false)

//methods
const fetchPrimary = async () => {
  try {
    const res = await Request.GET_REQ('/countries')
    countries.value = res.data
  } catch (error) {
    Notify.error(error.message)
  }
}

const handleSubmit = () => {
  isLoading.value = true
  let data = {
    country_id: country_id,
    flag: flag,
    monthly_living_cost: monthly_living_cost,
    visa_requirements: visa_requirements,
    part_time_work: part_time_work,
    accommodation_details: accommodation_details,
    country_benifits: country_benifits,
    statuses: statuses,
  }

  Request.POST_REQ(data, '/add-country')
    .then(() => {
      isLoading.value = false
      // resetForm();
      router.push({ name: 'Countries' })
      Notify.success('The Country Successfully Created')
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
function add() {
  statuses.value.push({ status_name: '', status_color: '#e2a03f' })
}
function remove(index) {
  statuses.value.splice(index, 1)
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
  border: 1px solid #1b2e4b;
  border-radius: 5px;
  padding: 5px;
}
.office-logo {
  width: 100%;
  text-align: right;
}
input[type='color'] {
  -webkit-appearance: none;
  border: none;
  width: 32px;
  height: 32px;
}
input[type='color']::-webkit-color-swatch-wrapper {
  padding: 0;
}
input[type='color']::-webkit-color-swatch {
  border: none;
}
</style>
