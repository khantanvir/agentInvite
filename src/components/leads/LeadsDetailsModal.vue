<template>
  <div
    id="lead-view-detail"
    class="modal fade lead-view-detail-modal-xl"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myExtraLargeModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="myExtraLargeModalLabel" class="modal-title">
            {{ lead.first_name }} {{ lead.last_name }}
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-x"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <div id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
            <div class="statbox widget box box-shadow">
              <div class="widget-content widget-content-area">
                <div class="row">
                  <div class="col col-md-6 mb-4">
                    <h5 class="pb-2">Personal Information</h5>
                    <div class="table-responsive">
                      <table class="table-bordered mb-4 table">
                        <tbody>
                          <tr>
                            <td colspan="2">
                              <img
                                v-if="lead.photo"
                                :src="baseURL + '/' + `${lead.photo}`"
                                alt="..."
                                width="100"
                              />
                              <img
                                v-else
                                src="@/assets/img/90x90.jpg"
                                class=""
                                alt="..."
                                width="90"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Name</td>
                            <td>{{ lead.first_name }} {{ lead.last_name }}</td>
                          </tr>
                          <tr>
                            <td>Phone</td>
                            <td>{{ lead.phone }}</td>
                          </tr>

                          <tr>
                            <td>Email</td>
                            <td>{{ lead.email }}</td>
                          </tr>
                          <tr>
                            <td>Alternate Phone</td>
                            <td>{{ lead.alternate_phone }}</td>
                          </tr>
                          <tr>
                            <td>Date of Birth</td>
                            <td>{{ lead.data_of_birth }}</td>
                          </tr>
                          <tr>
                            <td>Living Country</td>
                            <td>
                              {{ lead.living_country && lead.living_country.name }}
                            </td>
                          </tr>
                          <tr>
                            <td>Living City</td>
                            <td>{{ lead.p_address_city }}</td>
                          </tr>

                          <tr>
                            <td>Living State</td>
                            <td>{{ lead.p_address_state }}</td>
                          </tr>
                          <tr>
                            <td>Zip Code</td>
                            <td>{{ lead.p_address_zip }}</td>
                          </tr>
                          <tr>
                            <td>Living Address Details</td>
                            <td>{{ lead.p_address_details }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="col col-md-6 mb-4">
                    <h5 class="pb-2">Useful Information</h5>
                    <div class="table-responsive">
                      <table class="table-bordered mb-4 table">
                        <tbody>
                          <tr>
                            <td>Branch</td>
                            <td>
                              {{ lead.branch && lead.branch.branch_name }}
                            </td>
                          </tr>
                          <tr>
                            <td>Course Category</td>
                            <td>
                              {{ lead.category && lead.category.category_name }}
                            </td>
                          </tr>

                          <tr>
                            <td>Course Level</td>
                            <td>
                              {{ lead.course_level && lead.course_level.course_level_name }}
                            </td>
                          </tr>
                          <tr>
                            <td>Counselor</td>
                            <td>
                              {{ lead.counselor && lead.counselor.counselor_name }}
                            </td>
                          </tr>
                          <tr>
                            <td>Lead Source</td>
                            <td>
                              <div v-if="lead.lead_facebook_id">Hubspot</div>
                              <div v-else>
                                <div v-if="lead.agent && lead.agent.agent_name">
                                  {{ lead.agent.agent_name }}
                                </div>
                                <div v-else>
                                  {{ lead.lead_source && lead.lead_source.source_name }}
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Interested Country</td>
                            <td>
                              {{ lead.country && lead.country.country.name }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h5 class="pb-2">University Information</h5>
                    <div class="table-responsive">
                      <table class="table-bordered mb-4 table">
                        <thead>
                          <tr>
                            <th>Institute Name</th>
                            <th>Course Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="university in lead.universities" :key="university.id">
                            <td>
                              {{ university.course && university.course.institute.institute_name }}
                            </td>
                            <td>
                              {{ university.course && university.course.course_name }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="col col-md-12 mb-4">
                    <h5 class="pb-2">Application Document</h5>
                    <p v-if="files.length == 0">No File Uploaded Yet</p>
                    <ul class="documents-files">
                      <li v-for="(file, index) in files" :key="file.id">
                        <a :href="baseURL + '/' + file.file" download target="_blank"
                          >File - {{ index + 1 }}</a
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn" data-dismiss="modal"><i class="flaticon-cancel-12"></i> Back</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Request from '@/apis/Request'
import Notify from '../../helpers/Notify'
export default {
  props: {
    leadModalId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      lead: {},
      files: [],
    }
  },
  computed: {
    ...mapGetters(['user', 'pendingStatus']),
    ...mapState(['baseURL']),
  },
  watch: {
    leadModalId() {
      Request.GET_REQ(`/application-lead-info/${this.leadModalId}`)
        .then((res) => {
          this.lead = res.data
          this.isLoading = false
        })
        .catch((err) => {
          Notify(err.res.data)
        })

      Request.GET_REQ(`/application-lead-documents/${this.leadModalId}`)
        .then((res) => {
          this.files = res.data
        })
        .catch((err) => {
          Notify(err.res.data)
        })
    },
  },
}
</script>

<style></style>
