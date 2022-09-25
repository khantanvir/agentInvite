<template>
  <div
    id="app-email-sent-history"
    class="modal fade app-email-sent-history-modal-xl"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myExtraLargeModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="myExtraLargeModalLabel" class="modal-title">View Email Sent History</h5>
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
                  <div class="col col-md-12 mb-4">
                    <h5 class="pb-2">Email Sent History</h5>
                    <div class="table-responsive">
                      <table class="table table-bordered mb-4">
                        <thead>
                          <tr>
                            <th>Email</th>
                            <th>Subject</th>
                            <th>Body</th>
                            <th>Sent Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="email in emails" :key="email.id">
                            <td>{{ email.send_to }}</td>
                            <td>{{ email.subject }}</td>
                            <td>{{ email.body }}</td>
                            <td>
                              {{ dateTime(email.created_at && email.created_at) }}
                            </td>
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
import moment from 'moment'
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
      emails: [],
    }
  },
  computed: {
    ...mapGetters(['user', 'pendingStatus']),
    ...mapState(['baseURL']),
  },
  watch: {
    leadModalId() {
      Request.GET_REQ(`/application-lead-sent-email-history/${this.leadModalId}`)
        .then((res) => {
          this.emails = res.data
          this.isLoading = false
        })
        .catch((err) => {
          Notify(err.res.data)
        })
    },
  },
  methods: {
    dateTime(value) {
      return moment(value).format('Do MMMM YYYY, h:mm:ss a')
    },
  },
}
</script>

<style></style>
