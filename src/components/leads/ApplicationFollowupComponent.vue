<template>
  <div class="card no-outer-spacing no-border-custom">
    <div class="card-header">
      <section class="mb-0 mt-0">
        <h5>Follow up</h5>
      </section>
    </div>
    <div class="application-follow-up-wrap">
      <div class="card-body custom-card-body p-0">
        <form @submit.prevent="editFollow == true ? handleUpdateFollowUp() : handleFollowUp()">
          <div class="col col-md-12 p-0">
            <div class="form-group lead-drawer-form">
              <label>Follow up Date</label>
              <v-date-picker
                v-if="themeModeData"
                v-model="follow_up_date_time"
                mode="dateTime"
                is-dark
              />
              <v-date-picker v-else v-model="follow_up_date_time" mode="dateTime" />
              <small
                v-if="errors.follow_up_date_time"
                id="sh-text1"
                class="form-text text-danger"
                >{{ errors.follow_up_date_time[0] }}</small
              >
            </div>
            <div class="form-group lead-drawer-form">
              <textarea
                v-model="follow_up"
                name="follow_up"
                cols="30"
                rows="3"
                placeholder="Follow up notes..."
                class="form-control"
              ></textarea>
              <small v-if="errors.follow_up" id="sh-text1" class="form-text text-danger">{{
                errors.follow_up[0]
              }}</small>
            </div>
            <button class="btn badge badge-info btn-sm">
              {{ editFollow == true ? 'Update' : 'Save' }}
              <span v-if="lazyLoadFollowup">
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
          </div>
          <hr />
          <div class="col col-md-12 p-0">
            <!-- Images -->
            <ul class="list-group list-group-media drawer-follow-up-list">
              <li
                v-for="followup in followUps"
                :key="followup.id"
                class="list-group-item list-group-item-action"
              >
                <div class="iconset-action">
                  <span
                    v-if="user.id == followup.user_id"
                    class="follow-edit-follow"
                    @click="editFollowup(followup.id)"
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
                    >
                      <path d="M12 20h9"></path>
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    </svg>
                  </span>
                  <button
                    class="button-custom-meeting"
                    :class="followup.is_follow_up_done ? 'b-green' : 'b-red'"
                    type="button"
                    @click="isFollowUpDone(followup.id)"
                  >
                    <span v-if="followup.is_follow_up_done">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
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
                        width="18"
                        height="18"
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
                </div>

                <div class="media custom-media-img">
                  <div class="mr-2">
                    <img
                      v-if="followup.user && followup.user.photo"
                      alt="avatar"
                      :src="baseURL + `${followup.user && followup.user.photo}`"
                      class="img-fluid rounded-circle"
                    />

                    <img
                      v-else
                      alt="avatar"
                      src="@/assets/img/90x90.jpg"
                      class="img-fluid rounded-circle"
                    />
                  </div>
                  <div class="media-body">
                    <h6 class="tx-inverse">
                      {{ followup.user && followup.user.name }}
                    </h6>
                    <p class="mg-b-0">{{ followup.follow_up }}</p>
                    <span>Follow up Date:</span>
                    <span
                      v-if="followup.follow_up_date_time"
                      class="mg-b-0 badge badge-pill badge-warning"
                    >
                      {{
                        followup.follow_up_date_time
                          ? isoDateFormat(followup.follow_up_date_time)
                          : ''
                      }}
                    </span>
                    <small class="text-left"> Created : {{ dateTime(followup.created_at) }} </small>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </form>
        <br />
        <div class="row">
          <div class="col col-md-12">
            <div class="lms-pagination">
              <pagination
                v-model="page"
                :records="totalFollowUps"
                :per-page="3"
                class="custom-pagination"
                @paginate="followUpInfo"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <FollowUpConfirmationComponent
      :title="`Have you Complete The Follow up ?`"
      @followUpComplete="followUpComplete"
    />
  </div>
</template>

<script>
import Request from '@/apis/Request.js'
import { mapGetters, mapState } from 'vuex'
import Notify from '../../helpers/Notify'
import moment from 'moment'
import FollowUpConfirmationComponent from '@/components/FollowUpConfirmationComponent.vue'
export default {
  name: 'FollowUpComponent',
  components: {
    FollowUpConfirmationComponent,
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
      follow_up: '',
      // follow_up_date: "",
      followup_id: '',
      page: 1,
      totalFollowUps: 0,
      errors: {},
      followUps: [],
      lazyLoadFollowup: false,
      editFollow: false,
      follow_up_date_time: new Date(),
      timezone: '',
      isFollowUpDoneId: '',
    }
  },
  computed: {
    ...mapGetters(['user', 'pendingStatus']),
    ...mapState(['baseURL']),
  },
  /* watch: {
    leadId: {
      handler() {
        this.followUpInfo();
        this.totalFollowup();
      }
    }
  }, */
  mounted() {
    // let slug = this.$route.params.id;
    if (this.leadId) {
      this.followUpInfo()
      this.totalFollowup()
    }
    this.emitter.on('appFollowupReload', () => {
      this.followUpInfo()
      this.totalFollowup()
    })
  },
  methods: {
    handleFollowUp() {
      this.lazyLoadFollowup = true
      let data = {
        lead_id: this.leadId,
        user_id: this.user.id,
        branch_id: this.user.branch_id,
        follow_up: this.follow_up,
        follow_up_date_time: this.follow_up_date_time,
      }
      Request.POST_REQ(data, '/add-follow-up')
        .then(() => {
          this.lazyLoadFollowup = false
          this.follow_up = ''
          this.emitter.emit('appFollowupReload')
          this.$store.dispatch('followUpLists')
          Notify.success('The Lead Successfully Created')
          this.errors = {}
        })
        .catch((err) => {
          this.errors = err.response.data.errors
          this.lazyLoadFollowup = false
          this.errors.follow_up && Notify.error(this.errors.follow_up[0])
        })
    },

    followUpInfo() {
      Request.GET_REQ(`/follow-up-info/${this.leadId}?page=${this.page}`)
        .then((res) => {
          this.followUps = res.data.data
        })
        .catch((err) => {
          Notify(err.res.data)
        })
    },
    totalFollowup() {
      Request.GET_REQ(`/follow-up-info-total/${this.leadId}`)
        .then((res) => {
          this.totalFollowUps = res.data.length
        })
        .catch((err) => {
          Notify(err.res.data)
        })
    },
    dateTime(value) {
      return moment(value).format('Do MMMM YYYY, h:mm:ss a')
    },
    isoDateFormat(value) {
      const newDate = new Date(value).toISOString()
      const mom = moment(newDate).format('Do MMMM YYYY, h:mm:ss a')
      return mom
    },
    editFollowup(id) {
      Request.GET_REQ(`/follow-up-info-edit/${id}`)
        .then((res) => {
          this.editFollow = true
          this.follow_up = res.data.follow_up
          this.followup_id = id
          this.follow_up_date_time = moment(res.data.follow_up_date_time).format()
        })
        .catch((err) => {
          Notify(err.res.data)
        })
    },
    handleUpdateFollowUp() {
      this.lazyLoadFollowup = true
      let data = {
        follow_up: this.follow_up,
        follow_up_date_time: new Date(this.follow_up_date_time).toISOString(),
      }
      Request.POST_REQ(data, `update-follow-up/${this.followup_id}`)
        .then(() => {
          this.lazyLoadFollowup = false
          this.follow_up = ''
          this.editFollow = false
          this.emitter.emit('appFollowupReload')
          this.$store.dispatch('followUpLists')
          Notify.success('The Lead Successfully Updated')
          this.errors = {}
        })
        .catch((err) => {
          this.errors = err.response.data.errors
          this.lazyLoadFollowup = false
          this.errors.follow_up && Notify.error(this.errors.follow_up[0])
        })
    },
    isFollowUpDone(followUpId) {
      $('#followupConfirmationModal').modal('show')
      this.isFollowUpDoneId = followUpId
    },
    followUpComplete(status) {
      Request.GET_REQ(`/follow-up-complete-status/${status}/${this.isFollowUpDoneId}`)
        .then(() => {
          this.emitter.emit('appFollowupReload')
          $('#followupConfirmationModal').modal('hide')
          this.$store.dispatch('followUpLists')
        })
        .catch((err) => {
          Notify(err.res.data)
        })
    },
  },
}
</script>

<style lang="scss">
.list-group.list-group-media.drawer-follow-up-list {
  .list-group-item .media .media-body {
    h6 {
      font-size: 12px;
      margin-bottom: 3px;
    }
    p {
      font-size: 11px;
      word-break: break-all;
    }
  }
}
.drawer-follow-up-list {
  small {
    display: block;
  }
}
/* span.follow-edit {
  position: absolute;
  right: 3px;
  top: 3px;
} */
.custom-media-img img {
  height: auto !important;
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
.iconset-action {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
