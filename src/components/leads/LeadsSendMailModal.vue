<template>
  <div v-if="pendingStatus || isLoading">
    <Loader />
  </div>
  <div
    id="lead-send-email"
    class="modal fade lead-send-email-modal-xl"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myExtraLargeModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="myExtraLargeModalLabel" class="modal-title">
            Student Name:
            {{ lead && lead.first_name + ' ' + lead && lead.last_name }}
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
          <div id="card_1" class="col-lg-12 layout-spacing">
            <div class="statbox widget box box-shadow">
              <div class="widget-content">
                <div class="row">
                  <div class="col-md-12">
                    <form @submit.prevent="handleSubmit">
                      <div class="row">
                        <div class="col col-md-6">
                          <label for="to">Send To:</label>
                          <input
                            v-model="send_to"
                            type="email"
                            class="form-control"
                            placeholder="Email Address"
                            disabled
                          />
                          <small
                            v-if="errors.send_to"
                            id="sh-text1"
                            type="text"
                            class="form-text text-danger"
                            >{{ errors.send_to[0] }}</small
                          >
                        </div>
                        <div class="col col-md-6">
                          <label for="to">Subject</label>
                          <input v-model="subject" class="form-control" placeholder="Subject" />
                          <small
                            v-if="errors.subject"
                            id="sh-text1"
                            class="form-text text-danger"
                            >{{ errors.subject[0] }}</small
                          >
                        </div>
                        <div class="col col-md-12 mt-2">
                          <label for="exampleFormControlTextarea1">Body</label>
                          <textarea
                            id="exampleFormControlTextarea1"
                            v-model="mail_body"
                            class="form-control"
                            rows="5"
                            spellcheck="false"
                          ></textarea>
                          <small
                            v-if="errors.mail_body"
                            id="sh-text1"
                            class="form-text text-danger"
                            >{{ errors.mail_body[0] }}</small
                          >
                        </div>
                        <div class="col col-md-12 mt-2">
                          <button type="submit" class="btn btn-primary">Send Email</button>
                        </div>
                      </div>
                    </form>
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
import Notify from '@/helpers/Notify'
import Request from '@/apis/Request'
import Loader from '@/components/Loader.vue'
export default {
  components: { Loader },
  props: {
    leadModalId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      send_to: '',
      subject: '',
      mail_body: `
      Hi Dear,
      
      Hope You are fine. We got your information please keep patience we will reach you shortly. 
      
      Thanks`,
      errors: {},
      application: '',
      leadId: '',
      lead: {},
      isLoading: false,
    }
  },
  computed: {
    ...mapGetters(['user', 'pendingStatus']),
    ...mapState(['baseURL']),
  },
  watch: {
    leadModalId() {
      this.isLoading = true
      Request.GET_REQ(`/lead-info/${this.leadModalId}`)
        .then((res) => {
          this.lead = res.data
          this.send_to = res.data.email
          this.isLoading = false
        })
        .catch((err) => {
          Notify(err.res.data)
        })
    },
  },
  methods: {
    handleSubmit() {
      this.isLoading = true
      let data = {
        send_to: this.send_to,
        subject: this.subject,
        mail_body: this.mail_body,
      }

      Request.POST_REQ(data, `/greeting-email-sender/${this.leadModalId}`)
        .then((res) => {
          if (res.status === 200) {
            this.isLoading = false
            $('#lead-send-email').modal('hide')
            Notify.success('Email Has sent Successfully')
          }
        })
        .catch((err) => {
          this.errors = err.response.data.errors
        })
    },
  },
}
</script>

<style></style>
