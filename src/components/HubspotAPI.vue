<template>
  <div class="layout-px-spacing">
    <form enctype="multipart/form-data" @submit.prevent="handleSubmit">
      <div class="row align-items-center">
        <div id="card_1" class="col-lg-6 offset-lg-3 layout-spacing layout-top-spacing">
          <div class="statbox widget box box-shadow">
            <div class="widget-content widget-content-area">
              <div class="col">
                <div class="form-group mb-4">
                  <label for="exampleFormControlInput1">Set up Hubspot API</label>
                  <br />
                  <small
                    >Go your Hubspot Admin panel -> <strong>Settings</strong> ->
                    <strong>Integrations</strong> -> <strong>API key</strong></small
                  >
                  <input v-model="hubspot_api" type="text" class="form-control" />
                  <small v-if="errors.hubspot_api" id="sh-text1" class="form-text text-danger">{{
                    errors.hubspot_api[0]
                  }}</small>
                </div>
              </div>
              <div class="col">
                <button type="button" class="btn btn-warning btn-sm mr-2">
                  <router-link to="/dashboard">Cancel</router-link>
                </button>
                <button type="submit" class="btn btn-primary btn-sm mr-2">Save</button>
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
import { useRouter } from 'vue-router'
import Request from '@/apis/Request'
import Notify from '../helpers/Notify'

const store = useStore()
const router = useRouter()
const user = computed(() => store.getters.user)

const hubspot_api = ref('')
const errors = ref({})
const isLoading = ref(false)

//methods
async function fetchPrimary() {
  isLoading.value = true
  await store.dispatch('user')
  if (user.value.user_type === 'superAdmin') {
    await getHubAPI()

    isLoading.value = false
  } else {
    router.push({ name: 'NotFound' })
    isLoading.value = false
  }
}

async function getHubAPI() {
  try {
    const res = await Request.GET_REQ(`/hubspot_api/${user.value.id}`)
    hubspot_api.value = res.data ? res.data : ''
  } catch (error) {
    Notify.error(error.message)
  }
}
async function handleSubmit() {
  const data = {
    hubspot_api: hubspot_api.value,
  }

  try {
    const res = await Request.POST_REQ(data, `/hubspot_api/${this.user.id}`)
    Notify.success(res.data.message)
    errors.value = {}
  } catch (error) {
    errors.value = error.response.data.errors
  }
}

// primary fetching
await fetchPrimary()
</script>
