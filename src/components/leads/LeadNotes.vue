<template>
  <div class="card no-outer-spacing">
    <div id="headingTwo5" class="card-header">
      <section class="mb-0 mt-0">
        <div
          role="menu"
          class="collapsed"
          data-toggle="collapse"
          data-target="#withoutSpacingAccordionFive"
          aria-expanded="false"
          aria-controls="withoutSpacingAccordionFive"
        >
          Lead Notes
          <div class="icons">
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
          </div>
        </div>
      </section>
    </div>
    <div
      id="withoutSpacingAccordionFive"
      class="collapse"
      aria-labelledby="headingTwo2"
      data-parent="#withoutSpacing"
    >
      <div class="card-body custom-card-body">
        <form @submit.prevent="editNotes == true ? handleUpdateNotes() : handleNotes()">
          <div class="col col-md-12 p-0">
            <div class="form-group lead-drawer-form">
              <textarea
                v-model="add_notes"
                name="add_notes"
                cols="30"
                rows="3"
                placeholder="Type Lead Notes here..."
                class="form-control"
              ></textarea>
              <small v-if="errors.notes" id="sh-text1" class="form-text text-danger">{{
                errors.notes[0]
              }}</small>
            </div>
            <button class="btn badge badge-info btn-sm">
              {{ editNotes == true ? 'Update' : 'Save' }}
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
                v-for="note in notes"
                :key="note.id"
                class="list-group-item list-group-item-action"
              >
                <span
                  v-if="user.id == note.user_id"
                  class="follow-edit"
                  @click="editFollowup(note.id)"
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
                <div class="media custom-media-img">
                  <div class="mr-2">
                    <img
                      v-if="note.user && note.user.photo"
                      alt="avatar"
                      :src="baseURL + `${note.user && note.user.photo}`"
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
                      {{ note.user && note.user.name }}
                    </h6>
                    <p class="mg-b-0">{{ note.notes }}</p>
                    <small class="text-left"> Created : {{ dateTime(note.created_at) }} </small>
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
              <base-pagination simple v-model="page" :links="pageLinks" @paginate="noteUpInfo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import Request from '@/apis/Request.js'
import { useStore } from 'vuex'
import Notify from '../../helpers/Notify'
import moment from 'moment'
import { useEmitter } from '@/composables/useEmitter'

const store = useStore()
const emitter = useEmitter()
const props = defineProps({
  leadId: {
    type: String,
    required: true,
  },
})
const pageLinks = ref([])
watch(
  () => props.leadId,
  () => {
    noteUpInfo()
  }
)

onMounted(async () => {
  // await noteUpInfo()
  emitter.on('followupReload', async () => {
    await noteUpInfo()
    // totalnotes()
  })
})

const user = computed(() => store.getters.user)

const add_notes = ref('')
const page = ref(1)
const totalNotesCount = ref(0)
const errors = ref({})
const notes = ref([])
const lazyLoadFollowup = ref(false)
const editNotes = ref(false)
const notesId = ref('')

//methods
function handleNotes() {
  lazyLoadFollowup.value = true
  const data = {
    lead_id: props.leadId,
    user_id: user.value.id,
    notes: add_notes.value,
  }
  Request.POST_REQ(data, '/add-notes')
    .then(() => {
      lazyLoadFollowup.value = false
      add_notes.value = ''
      emitter.emit('followupReload')
      Notify.success('The Lead Note Successfully Created')
      errors.value = {}
    })
    .catch((err) => {
      errors.value = err.response.data.errors
      lazyLoadFollowup.value = false
      errors.value.notes && Notify.error(errors.value.notes[0])
    })
}
function totalnotes() {
  Request.GET_REQ(`/follow-up-info-total/${props.leadId}`)
    .then((res) => {
      totalNotesCount.value = res.data.length
    })
    .catch((err) => {
      Notify(err.res.data)
    })
}
async function noteUpInfo() {
  try {
    const res = await Request.GET_REQ(`/lead-notes/${props.leadId}?page=${page.value}`)
    notes.value = res.data.data
    pageLinks.value = res.data.links
    totalNotesCount.value = res.data.total
  } catch (error) {
    Notify.error(error.res.data)
  }
}
function dateTime(value) {
  return moment(value).format('Do MMMM YYYY, h:mm:ss a')
}
function isoDateFormat(value) {
  const newDate = new Date(value).toISOString()
  const mom = moment(newDate).format('Do MMMM YYYY')
  return mom
}
function editFollowup(id) {
  Request.GET_REQ(`/edit-lead-notes/${id}`)
    .then((res) => {
      editNotes.value = true
      add_notes.value = res.data.notes
      notesId.value = id
    })
    .catch((err) => {
      Notify(err.res.data)
    })
}
function handleUpdateNotes() {
  lazyLoadFollowup.value = true
  let data = {
    notes: add_notes.value,
  }
  Request.POST_REQ(data, `update-lead-note/${notesId.value}`)
    .then(() => {
      lazyLoadFollowup.value = false
      add_notes.value = ''
      editNotes.value = false
      emitter.emit('followupReload')
      Notify.success('The Lead Note Successfully Updated')
      errors.value = {}
    })
    .catch((err) => {
      errors.value = err.response.data.errors
      lazyLoadFollowup.value = false
      errors.value.notes && Notify.error(errors.value.notes[0])
    })
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
span.follow-edit {
  position: absolute;
  right: 3px;
  top: 3px;
}
.custom-media-img img {
  height: auto !important;
}
</style>
