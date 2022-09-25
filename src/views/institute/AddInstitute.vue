<template>
  <div class="layout-px-spacing">
    <form enctype="multipart/form-data" @submit.prevent="handleSubmit">
      <div id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
        <div class="statbox widget box box-shadow">
          <div class="widget-content widget-content-area">
            <div class="row mb-4">
              <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                <div class="d-flex align-items-start justify-content-between">
                  <h4>Add Institute Information</h4>
                  <router-link :to="{ name: 'Institutes' }">
                    <button class="btn btn-info btn-rounded mb-2 mr-4 inline-flex items-center">
                      View Institutes
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
                  <label for="exampleFormControlInput1">Represent Country</label>
                  <select
                    v-model="represent_country_id"
                    class="form-control"
                    @change="errors.clear('represent_country_id')"
                  >
                    <option disabled value="">Select Represent Country</option>
                    <option v-for="countri in countries" :key="countri.id" :value="countri.id">
                      {{ countri.country.name }}
                    </option>
                  </select>
                  <v-error :errors="v$.represent_country_id.$errors" />
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Institute Name</label>
                  <input
                    v-model="institute_name"
                    type="text"
                    class="form-control"
                    name="institute_name"
                  />
                  <v-error :errors="v$.institute_name.$errors" />
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Campus Name</label>
                  <input
                    v-model="campus_name"
                    type="text"
                    class="form-control"
                    name="campus_name"
                  />
                  <v-error :errors="v$.campus_name.$errors" />
                </div>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Website</label>
                  <input v-model="website" type="text" class="form-control" name="website" />
                  <v-error :errors="v$.website.$errors" />
                </div>
              </div>

              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Monthly Living Cost</label>
                  <input
                    v-model="monthly_living_cost"
                    type="text"
                    class="form-control"
                    name="monthly_living_cost"
                  />
                  <v-error :errors="v$.monthly_living_cost.$errors" />
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Funds Requirements for Visa</label>
                  <input
                    v-model="funds_requirements_for_visa"
                    type="text"
                    class="form-control"
                    name="funds_requirements_for_visa"
                  />
                  <v-error :errors="v$.funds_requirements_for_visa.$errors" />
                </div>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Application Fees</label>
                  <input
                    v-model="application_fee"
                    type="text"
                    class="form-control"
                    name="application_fee"
                  />
                  <v-error :errors="v$.application_fee.$errors" />
                </div>
              </div>

              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Currency</label>
                  <input v-model="currency" type="text" class="form-control" name="currency" />
                  <v-error :errors="v$.currency.$errors" />
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Is Language Mendatory</label>
                  <input
                    v-model="is_lang_mendatory"
                    type="text"
                    class="form-control"
                    placeholder="Yes or No"
                    name="is_lang_mendatory"
                  />
                  <v-error :errors="v$.is_lang_mendatory.$errors" />
                </div>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlTextarea1">Language Requirements</label>
                  <textarea
                    id="exampleFormControlTextarea1"
                    v-model="lang_requirements"
                    class="form-control"
                    rows="3"
                    spellcheck="false"
                    name="lang_requirements"
                  ></textarea>
                  <v-error :errors="v$.lang_requirements.$errors" />
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlTextarea1">Institute Benifits</label>
                  <textarea
                    id="exampleFormControlTextarea1"
                    v-model="institute_benifits"
                    class="form-control"
                    rows="3"
                    spellcheck="false"
                    name="institute_benifits"
                  ></textarea>
                  <v-error :errors="v$.institute_benifits.$errors" />
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlTextarea1"> Part Time Work Details</label>
                  <textarea
                    id="exampleFormControlTextarea1"
                    v-model="per_time_work_details"
                    class="form-control"
                    rows="3"
                    spellcheck="false"
                    name="per_time_work_details"
                  ></textarea>
                  <v-error :errors="v$.per_time_work_details.$errors" />
                </div>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlTextarea1">Scholarship Policy</label>
                  <textarea
                    id="exampleFormControlTextarea1"
                    v-model="scholarship_policy"
                    class="form-control"
                    rows="3"
                    spellcheck="false"
                    name="scholarship_policy"
                  ></textarea>
                  <v-error :errors="v$.scholarship_policy.$errors" />
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlTextarea1"> Institute Important Notes</label>
                  <textarea
                    id="exampleFormControlTextarea1"
                    v-model="institute_important_notes"
                    class="form-control"
                    rows="3"
                    spellcheck="false"
                    name="institute_important_notes"
                  ></textarea>
                  <v-error :errors="v$.institute_important_notes.$errors" />
                </div>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <div class="row d-flex align-items-center">
                  <div class="col col-md-8">
                    <div class="form-group mb-4">
                      <label>Upload Institute Logo</label>
                      <label class="custom-file-container__custom-file">
                        <input
                          type="file"
                          class="form-control-file"
                          accept="image/*"
                          name="institute_logo"
                          @change="onFileChange"
                        />
                      </label>
                      <v-error :errors="v$.institute_logo.$errors" />
                      <div class="custom-file-container__image-preview"></div>
                    </div>
                  </div>
                  <div class="col col-md-4">
                    <div v-if="institute_logo" class="office-logo">
                      <img alt="Institute Logo" :src="institute_logo" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="col">
                <div class="row d-flex align-items-center">
                  <div class="col col-md-8">
                    <div class="form-group mb-4">
                      <label>Institute Prospectus</label>
                      <label class="custom-file-container__custom-file">
                        <input type="file" class="form-control-file" @change="onChangeProspectus" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col">
                <div class="row d-flex align-items-center">
                  <div class="col col-md-8">
                    <div class="form-group mb-4">
                      <label>Institute Course Module</label>
                      <label class="custom-file-container__custom-file">
                        <input
                          type="file"
                          class="form-control-file"
                          @change="onChangeCourseModule"
                        />
                      </label>
                      <div class="custom-file-container__image-preview"></div>
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
            <div class="row mb-4">
              <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                <h4>University Contact Person</h4>
                <br />
              </div>
              <div class="col col-md-12">
                <div v-for="(contact, index) in contacts" :key="index" class="row">
                  <div class="col col-md-3">
                    <div class="form-group mb-4">
                      <label for="personName">Contact Person Name</label>
                      <input
                        id="personName"
                        v-model="contact.name"
                        type="text"
                        class="form-control"
                        :name="`contacts.${index}.name`"
                      />
                      <v-error :errors="v$.contacts.$each.$response.$errors[index].name" />
                    </div>
                  </div>
                  <div class="col col-md-3">
                    <div class="form-group mb-4">
                      <label for="email">Email</label>
                      <input
                        v-model="contact.email"
                        type="email"
                        class="form-control"
                        :name="`contacts.${index}.email`"
                      />
                      <v-error :errors="v$.contacts.$each.$response.$errors[index].email" />
                    </div>
                  </div>
                  <div class="col col-md-3">
                    <div class="form-group mb-4">
                      <label for="phone">Phone</label>
                      <input
                        v-model="contact.phone"
                        type="text"
                        class="form-control"
                        :name="`contacts.${index}.phone`"
                      />
                      <v-error :errors="v$.contacts.$each.$response.$errors[index].phone" />
                    </div>
                  </div>
                  <div class="col col-md-3">
                    <div class="form-group mb-4">
                      <label for="alternate_phone">Alternate Phone</label>
                      <input
                        v-model="contact.alternate_phone"
                        type="text"
                        class="form-control"
                        :name="`contacts.${index}.alternate_phone`"
                      />
                      <v-error
                        :errors="v$.contacts.$each.$response.$errors[index].alternate_phone"
                      />
                    </div>
                  </div>
                  <div class="col col-md-12 text-right">
                    <div class="row ml-4">
                      <div v-show="index == contacts.length - 1">
                        <button
                          class="btn btn-warning btn-rounded mb-2 mr-2 inline-flex"
                          @click.prevent="add"
                        >
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
                      <div v-show="index || (!index && contacts.length > 1)">
                        <button
                          class="btn btn-danger btn-rounded mb-2 mr-2 inline-flex"
                          @click.prevent="remove"
                        >
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
      </div>
      <div id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
        <div class="statbox widget box box-shadow">
          <div class="widget-content widget-content-area">
            <div class="row">
              <div class="col text-right">
                <div class="row">
                  <div class="col">
                    <button type="button" @click="router.back" class="btn btn-warning btn-lg mr-2">
                      Cancel
                    </button>

                    <button
                      type="submit"
                      class="btn btn-primary btn-lg mr-2"
                      :disabled="v$.$invalid"
                    >
                      Submit
                    </button>
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
import useVuelidate from '@vuelidate/core'
import { required, helpers, email } from '@vuelidate/validators'
import Notify from '../../helpers/Notify'
import Request from '../../apis/Request'
import Errors from '@/utils/Errors'
import { useRouter } from 'vue-router'

const router = useRouter()

const rules = computed(() => {
  return {
    represent_country_id: { required },
    institute_name: { required },
    campus_name: { required },
    website: { required },
    monthly_living_cost: { required },
    funds_requirements_for_visa: { required },
    application_fee: { required },
    currency: { required },
    is_lang_mendatory: { required },
    lang_requirements: { required },
    institute_benifits: { required },
    per_time_work_details: { required },
    scholarship_policy: { required },
    institute_important_notes: { required },
    institute_logo: { required },
    contacts: {
      $each: helpers.forEach({
        name: { required },
        email: { required, email },
        phone: { required },
        alternate_phone: { required },
      }),
    },
  }
})

const represent_country_id = ref('')
const institute_name = ref('')
const campus_name = ref('')
const website = ref('')
const monthly_living_cost = ref('')
const funds_requirements_for_visa = ref('')
const application_fee = ref('')
const currency = ref('')
const is_lang_mendatory = ref('')
const lang_requirements = ref('')
const institute_benifits = ref('')
const per_time_work_details = ref('')
const scholarship_policy = ref('')
const institute_important_notes = ref('')
const institute_logo = ref('')
const institute_prospectus = ref('')
const institute_course_pdf = ref('')
const countries = ref([])
const contacts = ref([
  {
    name: '',
    email: '',
    phone: '',
    alternate_phone: '',
  },
])

const v$ = useVuelidate(
  rules,
  {
    represent_country_id,
    institute_name,
    campus_name,
    website,
    monthly_living_cost,
    funds_requirements_for_visa,
    application_fee,
    currency,
    is_lang_mendatory,
    lang_requirements,
    institute_benifits,
    per_time_work_details,
    scholarship_policy,
    institute_important_notes,
    institute_logo,
    contacts,
  },
  { $autoDirty: true, $lazy: false }
)

const errors = ref(new Errors())
const isLoading = ref(false)

//methods
async function fetchPrimary() {
  try {
    const res = await Request.GET_REQ('/active-represent-countries')
    countries.value = res.data.data
  } catch (error) {
    Notify.error(error.message)
  }
}

async function handleSubmit() {
  isLoading.value = true

  const isFormValid = await v$.value.$validate()
  if (!isFormValid) {
    isLoading.value = false
    return
  }
  const data = new FormData()

  data.append('represent_country_id', represent_country_id.value)
  data.append('institute_name', institute_name.value)
  data.append('campus_name', campus_name.value)
  data.append('website', website.value)
  data.append('monthly_living_cost', monthly_living_cost.value)
  data.append('funds_requirements_for_visa', funds_requirements_for_visa.value)
  data.append('application_fee', application_fee.value)
  data.append('currency', currency.value)
  data.append('is_lang_mendatory', is_lang_mendatory.value)
  data.append('lang_requirements', lang_requirements.value)
  data.append('institute_benifits', institute_benifits.value)
  data.append('per_time_work_details', per_time_work_details.value)
  data.append('scholarship_policy', scholarship_policy.value)
  data.append('institute_important_notes', institute_important_notes.value)
  data.append('institute_logo', institute_logo.value)
  data.append('institute_prospectus', institute_prospectus.value)
  data.append('institute_course_pdf', institute_course_pdf.value)
  data.append('contacts', JSON.stringify(contacts.value))

  try {
    const res = await Request.POST_REQ(data, '/add-institute')
    isLoading.value = false
    router.push({ name: 'Institutes' })
    Notify.success('The Institute Successfully Created')
    console.log(res)
  } catch (error) {
    console.error(error.response.data)
  }
}
function onFileChange(event) {
  let file = event.target.files[0]
  if (file.size > 1048770) {
    Notify.warning('file is bigger than 2mb')
  } else {
    let reader = new FileReader()
    reader.onload = (event) => {
      institute_logo.value = event.target.result
    }
    reader.readAsDataURL(file)
  }
}
function onChangeProspectus(event) {
  let file = event.target.files[0]

  if (file.size > 1048770) {
    Notify.warning('file is bigger than 2mb')
  } else {
    institute_prospectus.value = event.target.files[0]
  }
}
function onChangeCourseModule(event) {
  let file = event.target.files[0]

  if (file.size > 1048770) {
    Notify.warning('file is bigger than 2mb')
  } else {
    institute_course_pdf.value = event.target.files[0]
  }
}

function add() {
  contacts.value.push({
    name: '',
    email: '',
    phone: '',
    alternate_phone: '',
  })
}
function remove(index) {
  contacts.value.splice(index, 1)
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
</style>
