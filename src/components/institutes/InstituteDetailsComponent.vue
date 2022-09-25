<template>
  <div v-if="pendingStatus || isLoading">
    <Loader />
  </div>
  <div v-else class="layout-px-spacing">
    <div id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
      <div class="statbox widget box box-shadow">
        <div class="widget-content widget-content-area">
          <div class="row mb-4">
            <div class="col-xl-12 col-md-12 col-sm-12 col-12">
              <div class="d-flex align-items-start justify-content-between">
                <h4>{{ institute.institute_name }} - Details</h4>
                <div>
                  <router-link
                    v-if="user.user_type == 'superAdmin' || user.user_type == 'branchManager'"
                    :to="{
                      name: 'Edit_Institute',
                      params: { id: institute.id },
                    }"
                  >
                    <button class="btn btn-info mb-2 mr-4 btn-rounded">
                      Edit Institute
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
                  <router-link :to="{ name: 'Institutes' }">
                    <button class="btn btn-info mb-2 mr-4 btn-rounded">
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
              </div>

              <br />
            </div>
            <div class="col">
              <div class="form-group mb-4">
                <label for="exampleFormControlInput1">Represent Country</label>
                <h6>
                  {{ institute.represent_country && institute.represent_country.country.name }}
                </h6>
              </div>
            </div>
            <div class="col">
              <div class="form-group mb-4">
                <label for="exampleFormControlInput1">Institute Name</label>
                <h6>{{ institute.institute_name }}</h6>
              </div>
            </div>
            <div class="col">
              <div class="form-group mb-4">
                <label for="exampleFormControlInput1">Campus Name</label>
                <h6>{{ institute.campus_name }}</h6>
              </div>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col">
              <div class="form-group mb-4">
                <label for="exampleFormControlInput1">Website</label>
                <h6>{{ institute.website }}</h6>
              </div>
            </div>

            <div class="col">
              <div class="form-group mb-4">
                <label for="exampleFormControlInput1">Monthly Living Cost</label>
                <h6>{{ institute.monthly_living_cost }}</h6>
              </div>
            </div>
            <div class="col">
              <div class="form-group mb-4">
                <label for="exampleFormControlInput1">Funds Requirements for Visa</label>
                <p>{{ institute.funds_requirements_for_visa }}</p>
              </div>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col">
              <div class="form-group mb-4">
                <label for="exampleFormControlInput1">Application Fees</label>
                <h6>{{ institute.funds_requirements_for_visa }}</h6>
              </div>
            </div>

            <div class="col">
              <div class="form-group mb-4">
                <label for="exampleFormControlInput1">Currency</label>
                <h6>{{ institute.currency }}</h6>
              </div>
            </div>
            <div class="col">
              <div class="form-group mb-4">
                <label for="exampleFormControlInput1">Is Language Mendatory</label>
                <h6>{{ institute.is_lang_mendatory }}</h6>
              </div>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col">
              <div class="form-group mb-4">
                <label for="exampleFormControlTextarea1">Language Requirements</label>
                <p>{{ institute.lang_requirements }}</p>
              </div>
            </div>
            <div class="col">
              <div class="form-group mb-4">
                <label for="exampleFormControlTextarea1">Institute Benifits</label>
                <p>{{ institute.institute_benifits }}</p>
              </div>
            </div>
            <div class="col">
              <div class="form-group mb-4">
                <label for="exampleFormControlTextarea1"> Part Time Work Details</label>
                <p>{{ institute.per_time_work_details }}</p>
              </div>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col">
              <div class="form-group mb-4">
                <label for="exampleFormControlTextarea1">Scholarship Policy</label>
                <p>{{ institute.scholarship_policy }}</p>
              </div>
            </div>
            <div class="col">
              <div class="form-group mb-4">
                <label for="exampleFormControlTextarea1"> Institute Important Notes</label>
                <p>{{ institute.institute_important_notes }}</p>
              </div>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col">
              <div class="row d-flex align-items-center">
                <div class="col col-md-8">
                  <div class="col col-md-4">
                    <img
                      v-if="institute.institute_logo"
                      alt="Country Flag"
                      :src="`${baseURL}${institute.institute_logo}`"
                      width="100"
                    />

                    <img v-else alt="Country Flag" src="@/assets/img/no-image.png" width="100" />
                  </div>
                </div>
              </div>
            </div>

            <div class="col">
              <div class="row d-flex align-items-center">
                <div class="col col-md-8">
                  <div v-if="institute.institute_prospectus" class="form-group mb-4">
                    <a
                      target="_blank"
                      :href="baseURL + institute.institute_prospectus"
                      download
                      class="d-flex align-items-center download-file"
                    >
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="64"
                          height="64"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="feather feather-file"
                        >
                          <path
                            d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
                          ></path>
                          <polyline points="13 2 13 9 20 9"></polyline>
                        </svg>
                      </span>
                      <label>Download Institute Prospectus</label>
                    </a>
                  </div>
                  <div v-else class="form-group mb-4">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="64"
                        height="64"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-file"
                      >
                        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                        <polyline points="13 2 13 9 20 9"></polyline>
                      </svg>
                    </span>
                    <label>No Institute Prospectus</label>
                  </div>
                </div>
              </div>
            </div>

            <div class="col">
              <div class="row d-flex align-items-center">
                <div class="col col-md-8">
                  <div v-if="institute.institute_course_pdf" class="form-group mb-4">
                    <a
                      target="_blank"
                      :href="baseURL + institute.institute_course_pdf"
                      download
                      class="d-flex align-items-center download-file"
                    >
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="64"
                          height="64"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="feather feather-file"
                        >
                          <path
                            d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
                          ></path>
                          <polyline points="13 2 13 9 20 9"></polyline>
                        </svg>
                      </span>
                      <label>Download Institute Course Module</label>
                    </a>
                  </div>
                  <div v-else>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="64"
                        height="64"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-file"
                      >
                        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                        <polyline points="13 2 13 9 20 9"></polyline>
                      </svg>
                    </span>
                    <label>No Institute Module</label>
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
              <div class="row">
                <div class="table-responsive">
                  <table class="table table-bordered table-hover table-striped mb-4">
                    <thead>
                      <tr>
                        <th>Contact Person Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Alternate Phone</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="contact in institute.contacts" :key="contact.id">
                        <td>{{ contact.name }}</td>
                        <td>{{ contact.email }}</td>
                        <td>{{ contact.phone }}</td>
                        <td>{{ contact.alternate_phone }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Loader from '@/components/Loader.vue'
import { mapGetters, mapState } from 'vuex'
import Request from '../../apis/Request'
import Notify from '../../helpers/Notify'
// import baseURL from "../../apis/baseURL";

export default {
  name: 'EditInstitute',
  components: { Loader },
  data() {
    return {
      institute: {},
      contacts: [
        {
          name: '',
          email: '',
          phone: '',
        },
      ],

      isLoading: false,
    }
  },
  computed: {
    ...mapGetters(['user', 'pendingStatus']),
    ...mapState(['baseURL']),
  },

  mounted() {
    this.isLoading = true
    this.getInstitute()
  },

  methods: {
    getInstitute() {
      const id = this.$route.params.id
      Request.GET_REQ(`/institute/${id}`)
        .then((res) => {
          this.institute = res.data
          this.isLoading = false
        })
        .catch((err) => {
          Notify(err.res.data)
        })
    },
  },
}
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
body.dark .download-file {
  border: 1px solid #0e1726;
  display: inline-block;
  padding: 15px;
  border-radius: 5px;
  label {
    cursor: pointer;
  }
}
</style>
