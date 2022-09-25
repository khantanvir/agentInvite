<template>
  <div class="layout-px-spacing">
    <form enctype="multipart/form-data" @submit.prevent="handleSubmit">
      <div id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
        <div class="statbox widget box box-shadow">
          <div class="widget-content widget-content-area">
            <div class="row mb-4">
              <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                <div class="d-flex align-items-start justify-content-between">
                  <h4>Edit Course Information</h4>
                  <router-link :to="{ name: 'Courses' }">
                    <button class="btn btn-info btn-rounded mb-2 mr-4 inline-flex">
                      View Courses
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
                  <label for="exampleFormControlInput1">Select Institute</label>
                  <select v-model="institute_id" class="form-control" name="institute_id">
                    <option disabled value="">Select Represent Institute</option>
                    <option
                      v-for="institute in institutes"
                      :key="institute.id"
                      :value="institute.id"
                    >
                      {{ institute.institute_name }}
                    </option>
                  </select>
                  <v-error :errors="v$.institute_id.$errors" />
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Course Name</label>
                  <input
                    v-model="course_name"
                    type="text"
                    class="form-control"
                    name="course_name"
                  />
                  <v-error :errors="v$.course_name.$errors" />
                </div>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Course Category</label>
                  <select v-model="course_category_id" class="form-control">
                    <option disabled value="">Select a Category</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                      {{ category.category_name }}
                    </option>
                  </select>
                  <v-error :errors="v$.course_category_id.$errors" />
                </div>
              </div>

              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Course Level</label>
                  <select v-model="course_level_id" class="form-control">
                    <option disabled value="">Select Course Level</option>
                    <option
                      v-for="course_level in course_levels"
                      :key="course_level.id"
                      :value="course_level.id"
                    >
                      {{ course_level.course_level_name }}
                    </option>
                  </select>
                  <v-error :errors="v$.course_level_id.$errors" />
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Course Duration</label>
                  <input
                    v-model="course_duration"
                    type="text"
                    class="form-control"
                    name="course_duration"
                  />
                  <v-error :errors="v$.course_duration.$errors" />
                </div>
              </div>
            </div>
            <div class="row mb-4">
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

              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Course Fee</label>
                  <input v-model="course_fee" type="text" class="form-control" name="course_fee" />
                  <v-error :errors="v$.course_fee.$errors" />
                </div>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Course Intake</label>
                  <input
                    v-model="course_intake"
                    type="text"
                    class="form-control"
                    name="course_intake"
                  />
                  <v-error :errors="v$.course_intake.$errors" />
                </div>
              </div>

              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Awarding Body</label>
                  <input
                    v-model="awarding_body"
                    type="text"
                    class="form-control"
                    name="awarding_body"
                  />
                  <v-error :errors="v$.awarding_body.$errors" />
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
                  <label for="lang_requirements">Language Requirements</label>
                  <light-editor v-model="lang_requirements" />
                  <v-error :errors="v$.lang_requirements.$errors" />
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlTextarea1">Course Benifits</label>
                  <light-editor v-model="course_benifits" />
                  <v-error :errors="v$.course_benifits.$errors" />
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlTextarea1"> Part Time Work Details</label>
                  <light-editor v-model="per_time_work_details" />
                </div>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlTextarea1">General Eligibility</label>
                  <light-editor v-model="general_eligibility" />
                  <v-error :errors="v$.general_eligibility.$errors" />
                </div>
              </div>
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlTextarea1"> Additional Information of Course</label>
                  <textarea
                    id="exampleFormControlTextarea1"
                    v-model="addtional_info_course"
                    class="form-control"
                    rows="3"
                    spellcheck="false"
                    name="addtional_info_course"
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col-6">
                <div class="row d-flex align-items-center">
                  <div class="col col-md-6">
                    <div class="form-group mb-4">
                      <label>Course Prospectus</label>
                      <label class="custom-file-container__custom-file">
                        <input type="file" class="form-control-file" @change="onChangeProspectus" />
                      </label>
                    </div>
                  </div>

                  <div class="col col-md-6">
                    <div v-if="course_prospectus" class="form-group mb-4">
                      <label>Previous Course Prospectus</label>

                      <a
                        :href="baseURL + '/' + course_prospectus"
                        download
                        target="_blank"
                        style="display: block"
                        ><FeatherFileTextSvg /> Download Prospectus</a
                      >
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-6">
                <div class="row d-flex align-items-center">
                  <div class="col col-md-6">
                    <div class="form-group mb-4">
                      <label>Course Module PDF</label>
                      <label class="custom-file-container__custom-file">
                        <input
                          type="file"
                          class="form-control-file"
                          @change="onChangeCourseModulePdf"
                        />
                      </label>
                    </div>
                  </div>
                  <div v-if="course_module_pdf" class="col col-md-6">
                    <div class="form-group mb-4">
                      <label>Previous Course Module</label>
                      <a
                        :href="baseURL + '/' + course_module_pdf"
                        download
                        target="_blank"
                        style="display: block"
                        ><FeatherFileTextSvg /> Download Course Module PDF</a
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="col"></div>
            </div>
          </div>
        </div>
      </div>
      <div id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
        <div class="statbox widget box box-shadow">
          <div class="widget-content widget-content-area">
            <div class="row mb-4">
              <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                <h4>Additional Information</h4>
                <br />
              </div>
              <div class="col col-md-12">
                <div
                  v-for="(course_additional, index) in course_additionals"
                  :key="index"
                  class="row"
                >
                  <div class="col col-md-10">
                    <div class="form-group mb-4">
                      <label for="personName">Course Additional Information ( If have )</label>
                      <textarea
                        id="exampleFormControlTextarea1"
                        v-model="course_additional.course_additional_infos"
                        class="form-control"
                        rows="3"
                        spellcheck="false"
                        :name="`course_additionals.${index}.course_additional_infos`"
                      ></textarea>
                    </div>
                  </div>

                  <div class="col col-md-12 text-right">
                    <div class="row ml-4">
                      <div v-show="index == course_additionals.length - 1">
                        <button class="btn btn-warning btn-rounded mb-2 mr-2" @click.prevent="add">
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
                      <div v-show="index || (!index && course_additionals.length > 1)">
                        <button
                          class="btn btn-danger btn-rounded mb-2 mr-2"
                          @click.prevent="remove"
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
            <div class="row mb-4">
              <div class="col-6">
                <h4>Upload Additional Multiple files</h4>
                <br />
                <div class="form-group mb-4">
                  <label class="custom-file-container__custom-file">
                    <input
                      ref="multipleFilesRef"
                      type="file"
                      class="form-control-file"
                      multiple
                      @change="onChangeAdditionalFiles"
                    />
                  </label>
                </div>
              </div>
              <div class="col-6">
                <h4>Previous Uploaded Additional Multiple files</h4>
                <p v-if="old_files.length == 0">No File Uploaded Yet</p>
                <ul class="documents-files">
                  <li v-for="(file, index) in old_files" :key="file.id">
                    <a :href="baseURL + file.course_additional_files" download target="_blank"
                      >File - {{ index + 1 }}</a
                    >
                  </li>
                </ul>
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
                <h4>Key Modules</h4>
                <br />
              </div>
              <div class="col col-md-12">
                <div v-for="(key_module, index) in key_modules" :key="index" class="row">
                  <div class="col col-md-8">
                    <div class="form-group mb-4">
                      <label for="exampleFormControlInput1">Module Title {{ index + 1 }}</label>
                      <input
                        v-model="key_module.module_title"
                        type="text"
                        class="form-control"
                        :name="`key_modules.${index}.module_title`"
                      />
                      <v-error
                        :errors="v$.key_modules.$each.$response.$errors[index].module_title"
                      />
                    </div>
                    <div class="form-group mb-4">
                      <label for="personName">Module Description {{ index + 1 }}</label>
                      <light-editor v-model="key_module.module_description" />
                      <v-error
                        :errors="v$.key_modules.$each.$response.$errors[index].module_description"
                      />
                    </div>
                  </div>

                  <div class="col col-md-12 text-right">
                    <div class="row ml-4">
                      <div v-show="index == key_modules.length - 1">
                        <button
                          class="btn btn-warning btn-rounded mb-2 mr-2"
                          @click.prevent="add_key_modules"
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
                            class="feather feather-plus-circle"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="16" />
                            <line x1="8" y1="12" x2="16" y2="12" />
                          </svg>
                        </button>
                      </div>
                      <div v-show="index || (!index && key_modules.length > 1)">
                        <button
                          class="btn btn-danger btn-rounded mb-2 mr-2"
                          @click.prevent="remove_key_modules"
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
                      :disabled="v$.$invalid || isLoading"
                    >
                      Update
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
import { ref, computed, defineAsyncComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import useVuelidate from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
import Notify from '../../helpers/Notify'
import Request from '../../apis/Request'

const FeatherFileTextSvg = defineAsyncComponent(() => import('@/svg/FeatherFileTextSvg.vue'))
const store = useStore()
const router = useRouter()
const route = useRoute()
const baseURL = computed(() => store.getters.baseURL)
const rules = computed(() => {
  return {
    institute_id: { required },
    course_name: { required },
    course_category_id: { required },
    course_level_id: { required },
    course_duration: { required },
    course_intake: { required },
    course_fee: { required },
    campus_name: { required },
    awarding_body: { required },
    is_lang_mendatory: { required },
    lang_requirements: { required },
    course_benifits: { required },
    general_eligibility: { required },
    key_modules: {
      $each: helpers.forEach({
        module_title: { required },
        module_description: { required },
      }),
    },
  }
})

const institute_id = ref('')
const course_name = ref('')
const course_category_id = ref('')
const course_level_id = ref('')
const course_duration = ref('')
const course_fee = ref('')
const campus_name = ref('')
const course_intake = ref('')
const awarding_body = ref('')
const is_lang_mendatory = ref('')
const lang_requirements = ref('')
const course_benifits = ref('')
const per_time_work_details = ref('')
const general_eligibility = ref('')
const addtional_info_course = ref('')
const course_prospectus = ref('')
const course_module_pdf = ref('')
const institutes = ref([])
const categories = ref([])
const course_levels = ref([])
const course_additionals = ref([
  {
    course_additional_infos: '',
  },
])
const course_additional_infos = ref('')
const files = ref([])
const old_files = ref([])
const multipleFilesRef = ref(null)
const key_modules = ref([
  {
    module_title: '',
    module_description: '',
  },
])

const v$ = useVuelidate(
  rules,
  {
    institute_id,
    course_name,
    course_category_id,
    course_level_id,
    course_duration,
    course_fee,
    campus_name,
    course_intake,
    awarding_body,
    is_lang_mendatory,
    lang_requirements,
    course_benifits,
    general_eligibility,
    course_prospectus,
    course_module_pdf,
    key_modules,
  },
  { $autoDirty: true, $lazy: false }
)

const isLoading = ref(false)

const handleSubmit = async () => {
  isLoading.value = true
  const data = new FormData()

  data.append('institute_id', institute_id.value)
  data.append('course_name', course_name.value)
  data.append('course_category_id', course_category_id.value)
  data.append('course_level_id', course_level_id.value)
  data.append('course_duration', course_duration.value)
  data.append('course_intake', course_intake.value)
  data.append('course_fee', course_fee.value)
  data.append('campus_name', campus_name.value)
  data.append('awarding_body', awarding_body.value)
  data.append('is_lang_mendatory', is_lang_mendatory.value)
  data.append('lang_requirements', lang_requirements.value)
  data.append('course_benifits', course_benifits.value)
  data.append('per_time_work_details', per_time_work_details.value)
  data.append('general_eligibility', general_eligibility.value)
  data.append('addtional_info_course', addtional_info_course.value)
  data.append('course_prospectus', course_prospectus.value)
  data.append('course_module_pdf', course_module_pdf.value)
  data.append('course_additionals', JSON.stringify(course_additionals.value))

  data.append('key_modules', JSON.stringify(key_modules.value))

  for (let i = 0; i < files.value.length; i++) {
    let file = files.value[i]
    data.append('files[' + i + ']', file)
  }
  const isFormValid = await v$.value.$validate()
  if (!isFormValid) {
    isLoading.value = false
    return
  }
  try {
    const res = await Request.POST_REQ(data, `/update-course/${route.params.id}`)
    files.value = []
    Notify.success(res.data.message)
    router.back()
  } catch (error) {
    files.value = []
    Notify.error(error.message)
  } finally {
    isLoading.value = false
  }
}

const onChangeProspectus = (event) => {
  let file = event.target.files[0]

  if (file.size > 1048770) {
    Notify.warning('File size not bigger than 2 MB')
  } else {
    course_prospectus.value = event.target.files[0]
  }
}

const onChangeCourseModulePdf = (event) => {
  let file = event.target.files[0]

  if (file.size > 1048770) {
    Notify.warning('File size not bigger than 2 MB')
  } else {
    course_module_pdf.value = event.target.files[0]
  }
}

const onChangeAdditionalFiles = () => {
  for (let i = 0; i < multipleFilesRef.value.files.length; i++) {
    files.value.push(multipleFilesRef.value.files[i])
  }
}

const add = () => {
  course_additionals.value.push({
    course_additional_infos: '',
  })
}
const remove = (index) => {
  course_additionals.value.splice(index, 1)
}

const add_key_modules = () => {
  key_modules.value.push({
    module_title: '',
    module_description: '',
  })
}
const remove_key_modules = (index) => {
  key_modules.value.splice(index, 1)
}

const fetchPrimary = async () => {
  try {
    const { data: insts } = await Request.GET_REQ('/all-active-institutes')
    institutes.value = insts

    const { data: cats } = await Request.GET_REQ('/total-active-categories')
    categories.value = cats

    const { data: levels } = await Request.GET_REQ('/total-active-course-level')
    course_levels.value = levels
  } catch (error) {
    Notify.error(error.message)
  }

  try {
    const res = await Request.GET_REQ(`/edit-course/${route.params.id}`)

    institute_id.value = res.data.institute_id
    course_name.value = res.data.course_name
    course_category_id.value = res.data.course_category_id
    course_level_id.value = res.data.course_level_id
    course_duration.value = res.data.course_duration
    course_fee.value = res.data.course_fee
    campus_name.value = res.data.campus_name
    course_intake.value = res.data.course_intake
    awarding_body.value = res.data.awarding_body
    is_lang_mendatory.value = res.data.is_lang_mendatory
    lang_requirements.value = res.data.lang_requirements
    course_benifits.value = res.data.course_benifits
    per_time_work_details.value = res.data.per_time_work_details
    general_eligibility.value = res.data.general_eligibility
    addtional_info_course.value = res.data.addtional_info_course
    course_prospectus.value = res.data.course_prospectus
    old_files.value = res.data.additional_files
    course_module_pdf.value = res.data.course_module_pdf
    if (res.data.course_additional_infos.length === 0) {
      course_additional_infos.value = ''
    } else {
      course_additionals.value = res.data.course_additional_infos
    }
    let keyModules = res.data.key_modules
    if (keyModules.length > 0) {
      keyModules = keyModules.map((kM) => {
        return {
          module_title: kM.module_title,
          module_description: kM.module_description.replace(/\n/gim, '<br />'),
        }
      })

      key_modules.value = keyModules
    } else {
      key_modules.value = [
        {
          module_title: '',
          module_description: '',
        },
      ]
    }
    isLoading.value = false
  } catch (error) {
    Notify.error(error.message)
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
</style>
