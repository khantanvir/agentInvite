<template>
  <div class="layout-px-spacing">
    <form enctype="multipart/form-data" @submit.prevent="handleSubmit">
      <div id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
        <div class="statbox widget box box-shadow">
          <div class="widget-content widget-content-area">
            <div class="row mb-4">
              <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                <div class="d-flex align-items-start justify-content-between">
                  <h4>Add New Lead</h4>
                  <router-link :to="{ name: 'Leads' }">
                    <button class="btn btn-info btn-rounded mb-2 mr-4 inline-flex">
                      View Leads
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
              <div v-if="user && user.user_type == 'superAdmin'" class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Select Branch</label>
                  <select v-model="branch_id" class="form-control" @change="onChangeBranch($event)">
                    <option disabled value="">Select a Branch</option>
                    <option v-for="branch in branches" :key="branch.id" :value="branch.id">
                      {{ branch.branch_name }}
                    </option>
                  </select>
                </div>
              </div>
              <div
                v-if="
                  (user && user.user_type == 'superAdmin') ||
                  (user && user.user_type == 'branchManager')
                "
                class="col"
              >
                <div class="form-group mb-4">
                  <label
                    for="exampleFormControlInput1"
                    class="d-flex align-center justify-content-between"
                    >Counserlor Name
                    <div class="d-flex align-center justify-content-between">
                      <span v-if="lazyLoadBranch">
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
                    </div>
                  </label>
                  <select v-model="counselor_id" class="form-control" :disabled="lazyLoadBranch">
                    <option disabled value="">Select a Counselor</option>
                    <option
                      v-for="counselor in counselors"
                      :key="counselor.id"
                      :value="counselor.id"
                    >
                      {{ counselor.counselor_name }}
                    </option>
                  </select>
                </div>
              </div>
              <div
                v-if="
                  (user && user.user_type == 'superAdmin') ||
                  (user && user.user_type == 'branchManager') ||
                  (user && user.user_type == 'counselor') ||
                  (user && user.user_type == 'frontOfficer')
                "
                class="col"
              >
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1"
                    >Lead Source
                    <span v-if="lazyLoading">
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
                      </svg> </span
                  ></label>
                  <select
                    v-model="lead_source_id"
                    class="form-control"
                    :disabled="lazyLoading"
                    @change="getLeadSource($event.target.value)"
                  >
                    <option disabled value="">Select a Source</option>
                    <option
                      v-for="lead_source in lead_sources"
                      :key="lead_source.id"
                      :value="lead_source.id"
                    >
                      {{ lead_source.source_name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Category</label>
                  <select
                    v-model="category_id"
                    class="form-control"
                    @change="getCategoryId($event.target.value)"
                  >
                    <option disabled value="">Select a Category</option>
                    <option
                      v-for="category in categories"
                      :key="category.id"
                      :value="category.id"
                      :disabled="lazyLoading"
                    >
                      {{ category.category_name }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Course Level</label>
                  <select
                    v-model="course_level_id"
                    class="form-control"
                    @change="getCourseLevelId($event.target.value)"
                  >
                    <option disabled value="">Select a Course Level</option>
                    <option
                      v-for="courselevel in courselevels"
                      :key="courselevel.id"
                      :value="courselevel.id"
                      :disabled="lazyLoading"
                    >
                      {{ courselevel.course_level_name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Intake Year</label>
                  <input
                    v-model="intake_info"
                    type="month"
                    class="form-control"
                    name="intake_info"
                  />
                </div>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">First Name</label>
                  <input v-model="first_name" type="text" class="form-control" name="first_name" />
                  <v-error :errors="v$.first_name.$errors" />
                </div>
              </div>

              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Last Name</label>
                  <input v-model="last_name" type="text" class="form-control" name="last_name" />
                  <v-error :errors="v$.last_name.$errors" />
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Phone</label>
                  <input v-model="phone" type="text" class="form-control" name="phone" />
                  <v-error :errors="v$.phone.$errors" />
                </div>
              </div>
            </div>

            <div class="row mb-4">
              <div class="col">
                <div class="form-group mb-4">
                  <label for="email">Email</label>
                  <input
                    v-model="email"
                    type="email"
                    id="email"
                    class="form-control"
                    name="email"
                  />
                  <v-error :errors="v$.email.$errors" />
                </div>
              </div>

              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Alternate Phone</label>
                  <input
                    v-model="alternate_phone"
                    type="text"
                    class="form-control"
                    name="alternate_phone"
                  />
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Date of Birth</label>
                  <input
                    v-model="data_of_birth"
                    type="date"
                    class="form-control"
                    name="data_of_birth"
                  />
                </div>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Living Country</label>
                  <select v-model="p_address_country" class="form-control">
                    <option disabled value="">Select a Country</option>
                    <option v-for="countri in allcountries" :key="countri.id" :value="countri.id">
                      {{ countri.name }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Living City</label>
                  <input
                    v-model="p_address_city"
                    type="text"
                    class="form-control"
                    name="p_address_city"
                  />
                </div>
              </div>
              <div class="col">
                <div class="row">
                  <div class="col mr-0 pr-0">
                    <div class="form-group mb-4">
                      <label for="exampleFormControlInput1">Living State</label>
                      <input
                        v-model="p_address_state"
                        type="text"
                        class="form-control"
                        name="p_address_state"
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-group mb-4">
                      <label for="exampleFormControlInput1">Zip Code</label>
                      <input
                        v-model="p_address_zip"
                        type="text"
                        class="form-control"
                        name="p_address_zip"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row mb-4">
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlTextarea1">Address Details</label>
                  <textarea
                    id="exampleFormControlTextarea1"
                    v-model="p_address_details"
                    class="form-control"
                    rows="3"
                    spellcheck="false"
                    name="p_address_details"
                  ></textarea>
                </div>
              </div>
            </div>

            <div class="row mb-4">
              <div class="col col-md-4">
                <div class="row d-flex align-items-center">
                  <div class="col col-md-8">
                    <div class="form-group mb-4">
                      <label>Photo</label>
                      <label class="custom-file-container__custom-file">
                        <input
                          type="file"
                          class="form-control-file"
                          accept="image/*"
                          name="photo"
                          @change="onFileChange"
                        />
                      </label>
                      <div class="custom-file-container__image-preview"></div>
                    </div>
                  </div>
                  <div class="col col-md-4">
                    <div v-if="photo" class="office-logo">
                      <img alt="Application Photo" :src="photo" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="col col-md-8">
                <div class="row d-flex align-items-center">
                  <div class="col col-md-12">
                    <div class="form-group mb-4">
                      <label
                        >Multiple Files Upload ( SOP/IELTS/TOFEL/PTE/GMAT Certificate/ Work
                        Experience/ Reference Letter/ Additional Documents )
                      </label>
                      <label class="custom-file-container__custom-file">
                        <input
                          ref="filesRef"
                          type="file"
                          class="form-control-file"
                          name="files"
                          multiple
                          @change="onChangeMultipleFiles"
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
                <h4>Interested Course Information</h4>
                <br />
              </div>
              <div class="col col-md-12">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Interested Country</label>
                  <select
                    v-model="interested_country_id"
                    class="form-control"
                    @change="onChangeInterestCountry($event)"
                  >
                    <option disabled value="">Select a Country</option>
                    <option v-for="countri in countries" :key="countri.id" :value="countri.id">
                      {{ countri.country?.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col col-md-12">
                <div class="row">
                  <div class="col col-md-6">
                    <div class="form-group mb-4">
                      <label for="personName"
                        >Interested Universities
                        <span v-if="lazyLoadIns">
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
                          </svg> </span
                      ></label>
                      <vue-select
                        v-model="institute_id_1"
                        :options="institutes_1"
                        label-by="institute_name"
                        :close-on-select="true"
                        :clear-on-close="true"
                        placeholder="Select a Country Before"
                        search-placeholder="Select a University"
                        searchable
                        dropdown-item
                        value-by="id"
                        @update:modelValue="onChangeUniversity(1)"
                      ></vue-select>
                    </div>
                  </div>
                  <div class="col col-md-6">
                    <div class="form-group mb-4">
                      <label for="email">Interested Course</label>
                      <vue-select
                        v-model="course_id_1"
                        :options="courses"
                        label-by="course_name"
                        :close-on-select="true"
                        :clear-on-close="true"
                        placeholder="Select a University Before"
                        search-placeholder="Select a Course"
                        searchable
                        dropdown-item
                        value-by="id"
                      ></vue-select>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col col-md-12">
                <div class="row">
                  <div class="col col-md-6">
                    <div class="form-group mb-4">
                      <label for="personName"
                        >Interested Universities ( 2nd Choice )
                        <span v-if="lazyLoadIns">
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
                          </svg> </span
                      ></label>
                      <vue-select
                        v-model="institute_id_2"
                        :options="institutes_2"
                        label-by="institute_name"
                        :close-on-select="true"
                        :clear-on-close="true"
                        placeholder="Select a Country Before"
                        search-placeholder="Select a University"
                        searchable
                        dropdown-item
                        value-by="id"
                        @update:modelValue="onChangeUniversity(2)"
                      ></vue-select>
                    </div>
                  </div>
                  <div class="col col-md-6">
                    <div class="form-group mb-4">
                      <label for="email">Interested Course ( 2nd Choice )</label>
                      <vue-select
                        v-model="course_id_2"
                        :options="courses_2"
                        label-by="course_name"
                        :close-on-select="true"
                        :clear-on-close="true"
                        placeholder="Select a University Before"
                        search-placeholder="Select a Course"
                        searchable
                        dropdown-item
                        value-by="id"
                      ></vue-select>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col col-md-12">
                <div class="row">
                  <div class="col col-md-6">
                    <div class="form-group mb-4">
                      <label for="personName"
                        >Interested Universities ( 3rd Choice )
                        <span v-if="lazyLoadIns">
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
                          </svg> </span
                      ></label>
                      <vue-select
                        v-model="institute_id_3"
                        :options="institutes_3"
                        label-by="institute_name"
                        :close-on-select="true"
                        :clear-on-close="true"
                        placeholder="Select a Country Before"
                        search-placeholder="Select a University"
                        searchable
                        dropdown-item
                        value-by="id"
                        @update:modelValue="onChangeUniversity(3)"
                      ></vue-select>
                    </div>
                  </div>
                  <div class="col col-md-6">
                    <div class="form-group mb-4">
                      <label for="email">Interested Course ( 3rd Choice )</label>
                      <vue-select
                        v-model="course_id_3"
                        :options="courses_3"
                        label-by="course_name"
                        :close-on-select="true"
                        :clear-on-close="true"
                        placeholder="Select a University Before"
                        search-placeholder="Select a Course"
                        searchable
                        dropdown-item
                        value-by="id"
                      ></vue-select>
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
          <div
            class="widget-content widget-content-area text-center"
            :class="lead_application_status == 1 ? 'app-success-bg' : ''"
          >
            <div class="row mb-4">
              <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                <h4>Form is Ready To Go with Application ?</h4>
                <br />
                <div class="n-chk">
                  <label class="new-control new-radio square-radio new-radio-text radio-success">
                    <input
                      v-model="lead_application_status"
                      type="radio"
                      class="new-control-input"
                      name="application_status"
                      value="1"
                    />
                    <span class="new-control-indicator"></span
                    ><span class="new-radio-content">Yes</span>
                  </label>

                  <label class="new-control new-radio square-radio new-radio-text radio-danger">
                    <input
                      v-model="lead_application_status"
                      type="radio"
                      class="new-control-input"
                      name="application_status"
                      value="0"
                    />
                    <span class="new-control-indicator"></span
                    ><span class="new-radio-content">No</span>
                  </label>
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
                      <button type="submit" class="btn btn-warning btn-lg mr-2">Cancel</button>
                    </router-link>
                    <button
                      type="submit"
                      class="btn btn-primary btn-lg mr-2"
                      :disabled="v$.$invalid || isLoading"
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
import { useStore } from 'vuex'
import Notify from '../../helpers/Notify'
import Request from '../../apis/Request'
import { useRouter } from 'vue-router'
import useVuelidate from '@vuelidate/core'
import { required, email as mail, numeric } from '@vuelidate/validators'

const store = useStore()
const router = useRouter()

const rules = computed(() => {
  return {
    first_name: { required },
    last_name: { required },
    phone: { required, numeric },
    email: { required, mail },
  }
})

const branch_id = ref('')
const counselor_id = ref('')
const front_office_id = ref('')
const agent_id = ref('')
const lead_source_id = ref(null)
const category_id = ref(null)
const course_level_id = ref(null)
const intake_info = ref('')
const lead_application_status = ref(0)
const first_name = ref('')
const last_name = ref('')
const data_of_birth = ref('')
const email = ref('')
const phone = ref('')
const alternate_phone = ref('')
const photo = ref('')
const p_address_country = ref('')
const p_address_city = ref('')
const p_address_state = ref('')
const p_address_zip = ref('')
const p_address_details = ref('')
const interested_country_id = ref(null)
const files = ref([])
const filesRef = ref(null)
const countries = ref([])
const allcountries = ref([])
const branches = ref([])
const counselors = ref([])
const lead_sources = ref([])
const categories = ref([])
const courselevels = ref([])
const institutes_1 = ref([])
const institutes_2 = ref([])
const institutes_3 = ref([])
const courses = ref([])
const courses_2 = ref([])
const courses_3 = ref([])
const interests = ref([
  {
    institute_id: '',
    course_id: '',
  },
])

const institute_id_1 = ref(null)
const institute_id_2 = ref(null)
const institute_id_3 = ref(null)
const course_id_1 = ref(null)
const course_id_2 = ref(null)
const course_id_3 = ref(null)

const isLoading = ref(false)
const lazyLoading = ref(false)
const lazyLoadBranch = ref(false)
const lazyLoadIns = ref(false)

const v$ = useVuelidate(
  rules,
  {
    first_name,
    last_name,
    email,
    phone,
  },
  { $autoDirty: true, $lazy: false }
)

const user = computed(() => store.getters.user)

//methods
const getLeadSource = (leadSourceId) => {
  lead_source_id.value = leadSourceId
}

const getCategoryId = (categoryId) => {
  category_id.value = categoryId
}
const getCourseLevelId = (courseLevelId) => {
  course_level_id.value = courseLevelId
}

const handleSubmit = async () => {
  isLoading.value = true

  const data = new FormData()

  data.append('branch_id', JSON.stringify(branch_id.value || user.value.branch_id))
  data.append('counselor_id', JSON.stringify(counselor_id.value || user.value.counselor_id))
  data.append(
    'front_office_id',
    JSON.stringify(front_office_id.value || user.value.front_office_id)
  )
  data.append('agent_id', JSON.stringify(agent_id.value || user.value.agent_id))
  data.append('lead_source_id', JSON.stringify(lead_source_id.value))
  data.append('category_id', JSON.stringify(category_id.value))
  data.append('course_level_id', JSON.stringify(course_level_id.value))
  data.append('intake_info', intake_info.value)
  data.append('p_address_zip', p_address_zip.value)
  data.append('lead_application_status', lead_application_status.value)
  data.append('first_name', first_name.value)
  data.append('last_name', last_name.value)
  data.append('data_of_birth', data_of_birth.value)
  data.append('email', email.value)
  data.append('phone', phone.value)
  data.append('alternate_phone', alternate_phone.value)
  data.append('photo', photo.value)
  data.append('p_address_country', p_address_country.value)
  data.append('p_address_city', p_address_city.value)
  data.append('p_address_state', p_address_state.value)
  data.append('p_address_details', p_address_details.value)
  data.append('interested_country_id', JSON.stringify(interested_country_id.value))
  data.append('institute_id_1', JSON.stringify(institute_id_1.value))
  data.append('course_id_1', JSON.stringify(course_id_1.value))
  data.append('institute_id_2', JSON.stringify(institute_id_2.value))
  data.append('course_id_2', JSON.stringify(course_id_2.value))
  data.append('institute_id_3', JSON.stringify(institute_id_3.value))
  data.append('course_id_3', JSON.stringify(course_id_3.value))

  // data.append("interests", JSON.stringify(interests));
  for (let i = 0; i < filesRef.value.files.length; i++) {
    const file = filesRef.value.files[i]
    data.append('files[' + i + ']', file)
  }

  const isFormValid = await v$.value.$validate()
  if (!isFormValid) {
    isLoading.value = false
    return
  }

  try {
    const res = await Request.POST_REQ(data, '/add-lead')
    files.value = []
    // resetForm();
    if (user.value.user_type == 'agent') {
      router.push({ name: 'AgentLeads' })
    } else {
      router.push({ name: 'Leads' })
    }
    Notify.success(res.data.message)
  } catch (err) {
    Notify.error(err.message)
    files.value = []
  } finally {
    isLoading.value = false
  }
}

const onChangeBranch = (event) => {
  lazyLoadBranch.value = true
  let branchId = event.target.value
  Request.GET_REQ(`/branch-counselor/${branchId}`).then((res) => {
    counselors.value = res.data
    lazyLoadBranch.value = false
  })
}

const onChangeInterestCountry = (event) => {
  lazyLoadIns.value = true
  let countryId = event.target.value
  Request.GET_REQ(`/country-institutes/${countryId}`).then((res) => {
    institutes_1.value = res.data
    institutes_2.value = res.data
    institutes_3.value = res.data
    lazyLoadIns.value = false
  })
}

const onChangeUniversity = (serial) => {
  let number = serial

  switch (number) {
    case 1:
      Request.GET_REQ(`/institute-course/${institute_id_1.value}`).then((res) => {
        courses.value = res.data
      })
      break
    case 2:
      Request.GET_REQ(`/institute-course/${institute_id_2.value}`).then((res) => {
        courses_2.value = res.data
      })
      break
    case 3:
      Request.GET_REQ(`/institute-course/${institute_id_3.value}`).then((res) => {
        courses_3.value = res.data
      })

      break
  }
}
const onFileChange = (event) => {
  let file = event.target.files[0]
  if (file.size > 2000000) {
    Notify.warning('File Size Must Less than 2mb')
  } else {
    let reader = new FileReader()
    reader.onload = (event) => {
      photo.value = event.target.result
    }
    reader.readAsDataURL(file)
  }
}
const onChangeMultipleFiles = () => {
  for (let i = 0; i < filesRef.value.files.length; i++) {
    if (filesRef.value.files[i].size > 2000000) {
      Notify.warning('File Size Must Less than 2mb')
    } else {
      files.value.push(filesRef.value.files[i])
    }
  }
}
const fetchPrimary = async () => {
  lazyLoadBranch.value = true
  lazyLoading.value = true
  await store.dispatch('user')

  if (user.value.user_type == 'superAdmin') {
    lazyLoadBranch.value = true
  } else {
    try {
      const res = await Request.GET_REQ(`/branch-counselor/${user.value.branch_id}`)
      counselors.value = res.data
      lazyLoadBranch.value = false
    } catch (error) {
      Notify.error(error.res.data)
    }
  }

  try {
    const res = await Request.GET_REQ('/active-lead-sources')
    lead_sources.value = res.data
    lazyLoading.value = false
  } catch (error) {
    Notify.error(error.res.data)
  }

  try {
    const res = await Request.GET_REQ('/active-represent-countries')
    countries.value = res.data.data
  } catch (error) {
    Notify.error(error.res.data)
  }

  try {
    const res = await Request.GET_REQ('/countries')
    allcountries.value = res.data
  } catch (error) {
    Notify.error(error.res.data)
  }

  try {
    const res = await Request.GET_REQ('/active-categories')
    categories.value = res.data
  } catch (error) {
    Notify.error(error.res.data)
  }

  try {
    const res = await Request.GET_REQ('/active-branches')
    branches.value = res.data
  } catch (error) {
    Notify.error(error.res.data)
  }

  try {
    const res = await Request.GET_REQ('/active-course-levels')
    courselevels.value = res.data
  } catch (error) {
    Notify.error(error.res.data)
  }
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
.n-chk {
  .new-control {
    font-size: 18px;
  }
  .new-control.new-radio .new-control-indicator {
    top: 7px;
  }
}

.widget-content.widget-content-area.text-center.app-success-bg {
  background: midnightblue;
}
</style>
