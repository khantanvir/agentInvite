<template>
  <div class="card no-outer-spacing">
    <div id="headingFour4" class="card-header">
      <section class="mb-0 mt-0">
        <div
          role="menu"
          class="collapsed"
          data-toggle="collapse"
          data-target="#withoutSpacingAccordionFour"
          aria-expanded="false"
          aria-controls="withoutSpacingAccordionFour"
        >
          Lead Status
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
      id="withoutSpacingAccordionFour"
      class="collapse"
      aria-labelledby="headingFour4"
      data-parent="#withoutSpacing"
    >
      <div class="card-body custom-card-body">
        <form @submit.prevent="handleLeadStatus">
          <div class="col col-md-12 p-0">
            <div class="form-group lead-drawer-form">
              <select
                v-model="lead_status"
                name="lead_staus"
                class="form-control"
                @change="setStatus($event)"
              >
                <option value="" disabled>Select a Lead Status</option>
                <option
                  v-for="leadStatus in leadStatuses"
                  :key="leadStatus.id"
                  :value="leadStatus.id"
                >
                  {{ leadStatus.status_name }}
                </option>
              </select>
            </div>
            <button class="btn badge badge-info btn-sm">
              Save
              <span v-if="lazyLoadStatus">
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
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue'
import Request from '@/apis/Request.js'
import Notify from '../../helpers/Notify'
import { useEmitter } from '@/composables/useEmitter'
import { useEventBus } from '@vueuse/core'

const emitter = useEmitter()
const leadBus = useEventBus('lead')

const props = defineProps({
  leadId: {
    type: String,
    required: true,
  },
  leadStatusId: {
    type: String,
    required: true,
  },
})
const lead_status = ref('')
const errors = ref({})
const leadStatuses = ref([])
const lazyLoadStatus = ref(false)
watch(
  () => props.leadId,
  () => {
    getLeadStatus()
  }
)

watch(
  () => props.leadStatusId,
  () => {
    lead_status.value = props.leadStatusId
  }
)

onMounted(() => {
  getLeadStatus()
})

function handleLeadStatus() {
  lazyLoadStatus.value = true
  let data = {
    lead_status_id: lead_status.value,
  }
  Request.POST_REQ(data, `/lead-status-change/${props.leadId}`)
    .then(() => {
      lazyLoadStatus.value = false
      emitter.emit('reloadStatus')
      emitter.emit('reloadLeadTb')
      leadBus.emit('reload')
      Notify.success('The Lead Successfully Created')
      errors.value = {}
    })
    .catch((err) => {
      errors.value = err.response.data.errors
      lazyLoadStatus.value = false
      errors.value.follow_up && Notify.error(errors.value.follow_up[0])
    })
}

function getLeadStatus() {
  Request.GET_REQ(`/active-lead-status`)
    .then((res) => {
      leadStatuses.value = res.data
    })
    .catch((err) => {
      Notify(err.res.data)
    })
}
function setStatus(event) {
  lead_status.value = event.target.value
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
</style>
