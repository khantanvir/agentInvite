<template>
  <div class="card no-outer-spacing">
    <div id="headingThree3" class="card-header">
      <section class="mb-0 mt-0">
        <h5>Meeting</h5>
      </section>
    </div>
    <div>
      <div class="card-body custom-card-body p-0">
        <div v-if="isMeeting" class="col-col-md-12" @click="addNewMeeting">
          <button class="btn btn-secondary meeting-button">
            Make a Meeting
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
              class="feather feather-calendar"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </button>
        </div>
        <br />
        <form
          v-if="isMeeting == false"
          @submit.prevent="editMeetingNote == true ? handleUpdate() : handleSubmit()"
        >
          <div class="col col-md-12 p-0">
            <div class="form-group lead-drawer-form text-center">
              <label>Pick Meeting Time</label>
              <!-- <v-date-picker v-model="dateEx" mode="dateTime" is-dark /> -->
              <v-date-picker
                v-if="themeModeData"
                v-model="meeting_date_time"
                mode="dateTime"
                is-dark
              />
              <v-date-picker v-else v-model="meeting_date_time" mode="dateTime" />

              <!-- <input v-model="meeting_date_time" type="time" class="form-control" /> -->
              <small v-if="errors.meeting_date_time" id="sh-text1" class="form-text text-danger">{{
                errors.meeting_date_time[0]
              }}</small>
            </div>
            <div
              v-if="
                (user && user.user_type === 'superAdmin') ||
                (user && user.user_type === 'branchManager')
              "
              class="form-group lead-drawer-form"
            >
              <label>Counselor</label>
              <select v-model="counselor_id" class="form-control">
                <option value="" disabled>Select Counselor</option>
                <option v-for="counselor in counselors" :key="counselor.id" :value="counselor.id">
                  {{ counselor.counselor_name }}
                </option>
              </select>
              <small v-if="errors.counselor_id" id="sh-text1" class="form-text text-danger">{{
                errors.counselor_id[0]
              }}</small>
            </div>
            <div class="form-group lead-drawer-form">
              <label>Meeting Notes</label>
              <textarea
                v-model="meeting_notes"
                name="meeting_notes"
                cols="30"
                rows="3"
                placeholder="Type here..."
                class="form-control"
              ></textarea>
              <small v-if="errors.meeting_notes" id="sh-text1" class="form-text text-danger">{{
                errors.meeting_notes[0]
              }}</small>
            </div>

            <button class="btn badge badge-info btn-sm">
              {{ editMeetingNote == true ? 'Update' : 'Save' }}
              <span v-if="lazyLoadMeeting">
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
            </button>
            <button class="btn badge badge-warning btn-sm ml-2" @click="isMeeting = true">
              Cancel
            </button>
          </div>
        </form>
        <div class="col col-md-12 p-0">
          <div id="tableSimple" class="col-lg-12 col-12 p-0">
            <label style="font-size: 12px">Meeting schedule</label>
            <div class="table-responsive meeting-table">
              <table id="manage_app_process" class="table table-bordered mb-4">
                <thead>
                  <tr>
                    <th>Date Time</th>
                    <th>Done</th>
                    <th style="text-center"></th>
                  </tr>
                </thead>

                <tbody>
                  <template
                    v-for="(leadMeetingInfo, index) in leadMeetings"
                    :key="leadMeetingInfo.id"
                  >
                    <tr>
                      <td>
                        <p>
                          {{ isoDateFormat(leadMeetingInfo.meeting_date_time) }}
                          <span
                            v-if="leadMeetingInfo.user_id == user.id"
                            @click="editLeadMeeting(leadMeetingInfo.id)"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              class="feather feather-edit-3 icon custom-edit-icon"
                              data-v-28fa2955=""
                            >
                              <path d="M12 20h9" data-v-28fa2955=""></path>
                              <path
                                d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
                                data-v-28fa2955=""
                              ></path>
                            </svg>
                          </span>
                        </p>
                      </td>
                      <td>
                        <button
                          class="button-custom-meeting"
                          :class="leadMeetingInfo.is_meeting_done ? 'b-green' : 'b-red'"
                          @click="isMeetingDone(leadMeetingInfo.id)"
                        >
                          <span v-if="leadMeetingInfo.is_meeting_done">
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
                              class="feather feather-check-circle"
                            >
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                              <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                          </span>
                          <span v-else>
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
                          </span>
                        </button>
                      </td>

                      <td style="text-center">
                        <span
                          style="cursor: pointer"
                          :class="opened ? 'opened' : ''"
                          @click="toggle(index)"
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
                            class="feather feather-chevron-down"
                          >
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </span>
                      </td>
                    </tr>
                    <tr v-if="index == isOpenIndex">
                      <td colspan="3">
                        <p class="meeting-info-style">
                          <strong> Meeting Create By: </strong>
                          {{ leadMeetingInfo.user.name }}
                        </p>
                        <p class="meeting-info-style">
                          <strong> Assigned Counselor: </strong>
                          {{
                            leadMeetingInfo.counselor_id
                              ? leadMeetingInfo.counselor.counselor_name
                              : 'No Counselor'
                          }}
                        </p>
                        <p class="meeting-info-style">
                          {{ leadMeetingInfo.meeting_notes }}
                        </p>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <ConfirmationComponent
          :title="`Have you Complete The Meeting ?`"
          @meetingComplete="meetingComplete"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Notify from '../../helpers/Notify'
import Request from '@/apis/Request.js'
import ConfirmationComponent from '@/components/ConfirmationComponent.vue'
import moment from 'moment'
export default {
  name: 'AppMeetingComponent',
  components: {
    ConfirmationComponent,
  },
  props: {
    leadId: {
      type: Number,
      required: true,
    },
    themeModeData: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      meeting_date: '',
      meeting_date_time: new Date(),
      meeting_notes: '',
      counselor_id: '',
      editMeetingNote: false,
      lazyLoadMeeting: false,
      isOpen: -1,
      isMeeting: true,
      errors: {},
      counselors: [],
      leadMeetings: [],
      leadMeetingId: '',
      timezone: '',
      isMeetingDoneId: '',
      getLeadId: '',
    }
  },
  computed: {
    ...mapGetters(['user', 'pendingStatus']),
    isOpenIndex() {
      return this.isOpen
    },
  },
  /* watch: {
    leadId: {
      handler() {
        this.getCounselor();
        this.leadMeeting();
      }
    }
  }, */
  mounted() {
    if (this.leadId) {
      this.getCounselor()
      this.leadMeeting()
    }
    this.emitter.on('meetingReload', () => {
      this.leadMeeting()
    })
  },
  methods: {
    handleSubmit() {
      this.lazyLoadMeeting = true
      let data = {
        lead_id: this.leadId,
        user_id: this.user.id,
        branch_id: this.user.branch_id,
        meeting_date: this.meeting_date,
        meeting_date_time: this.meeting_date_time,
        counselor_id: this.user.counselor_id || this.counselor_id,
        meeting_notes: this.meeting_notes,
      }
      Request.POST_REQ(data, '/add-meeting')
        .then(() => {
          this.lazyLoadMeeting = false
          this.isMeeting = true
          this.editMeetingNote = ''
          this.meeting_date = ''
          this.counselor_id = ''
          this.meeting_notes = ''
          this.emitter.emit('meetingReload')
          this.$store.dispatch('meetingLists')
          Notify.success('The Meeting Successfully Created')
          this.errors = {}
        })
        .catch((err) => {
          this.errors = err.response.data.errors
          this.lazyLoadMeeting = false
          this.errors.meeting_notes && Notify.error(this.errors.meeting_notes[0])
          this.errors.meeting_date && Notify.error(this.errors.meeting_date[0])
          this.errors.meeting_date_time && Notify.error(this.errors.meeting_date_time[0])
        })
    },
    handleUpdate() {
      this.lazyLoadMeeting = true
      let data = {
        lead_id: this.leadId,
        user_id: this.user.id,
        meeting_date: this.meeting_date,
        meeting_date_time: new Date(this.meeting_date_time).toISOString(),
        counselor_id: this.counselor_id,
        meeting_notes: this.meeting_notes,
      }
      Request.POST_REQ(data, `/update-meeting/${this.leadMeetingId}`)
        .then(() => {
          this.lazyLoadMeeting = false
          this.isMeeting = true
          this.editMeetingNote = ''
          this.meeting_date = ''
          this.counselor_id = ''
          this.meeting_notes = ''
          this.emitter.emit('meetingReload')
          this.$store.dispatch('meetingLists')
          Notify.success('The Meeting Successfully Updated')
          this.errors = {}
        })
        .catch((err) => {
          this.errors = err.response.data.errors
          this.lazyLoadMeeting = false
          this.errors.meeting_notes && Notify.error(this.errors.meeting_notes[0])
          this.errors.meeting_date && Notify.error(this.errors.meeting_date[0])
          this.errors.meeting_date_time && Notify.error(this.errors.meeting_date_time[0])
        })
    },
    getCounselor() {
      if (this.user && this.user.user_type === 'superAdmin') {
        Request.GET_REQ(`/active-counselor`)
          .then((res) => {
            this.counselors = res.data
          })
          .catch((err) => {
            Notify(err.res.data)
          })
      }
      if (
        this.user &&
        (this.user.user_type === 'counselor' ||
          this.user.user_type === 'branchManager' ||
          this.user.user_type === 'frontOfficer')
      ) {
        Request.GET_REQ(`/active-counselor/${this.user.branch_id}`)
          .then((res) => {
            this.counselors = res.data
          })
          .catch((err) => {
            Notify(err.res.data)
          })
      }
    },
    leadMeeting() {
      Request.GET_REQ(`/lead-meeting/${this.leadId}`)
        .then((res) => {
          this.leadMeetings = res.data
        })
        .catch((err) => {
          Notify(err.res.data)
        })
    },
    dateTime(value) {
      return moment(value).format('Do MMMM YYYY')
    },
    isoDateFormat(value) {
      const newDate = new Date(value).toISOString()
      const mom = moment(newDate).format('Do MMMM YYYY, h:mm:ss a')
      return mom
    },
    toggle(index) {
      if (index == this.isOpen) {
        this.isOpen = -1
      } else {
        this.isOpen = index
      }
    },
    editLeadMeeting(id) {
      Request.GET_REQ(`/get-lead-meeting/${id}`)
        .then((res) => {
          this.editMeetingNote = true
          this.isMeeting = false
          this.meeting_date = res.data.meeting_date
          this.meeting_date_time = moment(res.data.meeting_date_time).format()
          this.counselor_id = res.data.counselor_id
          this.meeting_notes = res.data.meeting_notes
          this.leadMeetingId = id
        })
        .catch((err) => {
          Notify(err.res.data)
        })
    },
    addNewMeeting() {
      this.isMeeting = false
      this.editMeetingNote = ''
      this.meeting_date = ''
      this.counselor_id = ''
      this.meeting_notes = ''
    },
    isMeetingDone(meetingId) {
      $('#confirmationModal').modal('show')
      this.isMeetingDoneId = meetingId
    },
    meetingComplete(status) {
      Request.GET_REQ(`/meeting-complete-status/${status}/${this.isMeetingDoneId}`)
        .then(() => {
          this.emitter.emit('meetingReload')
          $('#confirmationModal').modal('hide')
          this.$store.dispatch('meetingLists')
        })
        .catch((err) => {
          Notify(err.res.data)
        })
    },
  },
}
</script>

<style lang="scss">
.meeting-button {
  width: 100%;
  font-size: 13px;
}
.table-responsive.meeting-table {
  td,
  th {
    font-size: 11px;
  }
}
p.meeting-info-style {
  font-size: 11px !important;
}
button.button-custom-meeting {
  background: transparent;
  border: none;
}
button.button-custom-meeting.b-red {
  color: red;
}
button.button-custom-meeting.b-green {
  color: greenyellow;
}
</style>
