<template>
    <div class=" counselor-invite px-5">
        <div class="row">
            <div class="card-body">
                <h2 class="title text-2xl">Counselor Invitation Form</h2><br>

                <form method="POST" id="basic-form" @submit.prevent="submitForm" enctype="multipart/form-data">
                    <div class="row col-md-12 ml-1 mb-3">
                        <h4 class="text-xl invite-form">Basic Information</h4>
                    </div>
                    <div class="row col-md-12">
                        <input type="hidden" v-model="secret_code" />
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="pwd">Counselor Name</label>
                                <input v-model="counselor_name" type="text" class="form-control" placeholder="Counselor Name">
                                <small v-if="errors.counselor_name" id="sh-text1" class="form-text text-danger">{{
                                    errors.counselor_name[0]
                                }}</small>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="pwd">Counselor Email</label>
                                <input v-model="counselor_email" type="email" class="form-control" placeholder="Counselor Email">
                                <small v-if="errors.counselor_email" id="sh-text1" class="form-text text-danger">{{
                                    errors.counselor_email[0]
                                }}</small>
                            </div>
                        </div>
                  
                    </div>
                    <div class="row col-md-12">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="pwd">Counselor Phone</label>
                                    <input v-model="counselor_phone" type="text" class="form-control" placeholder="Counselor Phone">
                                    <small v-if="errors.counselor_phone" id="sh-text1" class="form-text text-danger">{{
                                        errors.counselor_phone[0]
                                    }}</small>
                                </div>
                            </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="pwd">Alternative Contact</label>
                                <input v-model="alternative_contact" type="text" class="form-control" placeholder="Alternative Contact">
                                <small v-if="errors.alternative_contact" id="sh-text1" class="form-text text-danger">{{
                                    errors.alternative_contact[0]
                                }}</small>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="pwd">National Id Or Passport</label>
                                <input v-model="nid_or_passport" type="text" class="form-control" placeholder="National Id Or Passport">
                                <small v-if="errors.nid_or_passport" id="sh-text1" class="form-text text-danger">{{
                                    errors.nid_or_passport[0]
                                }}</small>
                            </div> 
                        </div>
                    
                    </div>
                    <div class="row col-md-12">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="pwd">Country</label>
                                <select v-model="country" @change="getBranchesByCountry(country)" name="country"
                                    class="form-control" >
                                    <option value="">--Select Country--</option>
                                    <option v-for="(countryRow) in get_countries_for_branch" :key="countryRow.id">
                                        {{ countryRow.name }}
                                    </option>
                                </select>
                                <small v-if="errors.country" id="sh-text1" class="form-text text-danger">{{
                                    errors.country[0]
                                }}</small>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="pwd">Branch</label>
                                <select v-model="branch_id" class="form-control" >
                                    <option value="">--Select One--</option>
                                    <option v-for="(branch) in get_branches" :key="branch.id" :value="branch.id">
                                        {{ branch.branch_name }}
                                    </option>
                                </select>
                                <small v-if="errors.branch_id" id="sh-text1" class="form-text text-danger">{{
                                    errors.branch_id[0]
                                }}</small>
                            </div>
                        </div>
                    </div>
                    <div class="row col-md-12"> 
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="pwd">State</label>
                                <input v-model="state" type="text" class="form-control" placeholder="State">
                                <small v-if="errors.state" id="sh-text1" class="form-text text-danger">{{
                                    errors.state[0]
                                }}</small>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="pwd">City</label>
                                <input v-model="city" type="text" class="form-control" placeholder="City">
                                <small v-if="errors.city" id="sh-text1" class="form-text text-danger">{{
                                    errors.city[0]
                                }}</small>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="pwd">Nationality</label>
                                <input v-model="nationality" type="text" class="form-control" placeholder="Nationality">
                                <small v-if="errors.nationality" id="sh-text1" class="form-text text-danger">{{
                                    errors.nationality[0]
                                }}</small>
                            </div>
                        </div>
                    </div>
                   
                    <div class="row col-md-12">
                        <div class="col-md-8">
                            <div class="form-group">
                                <label for="pwd">Address in Details</label>
                                <textarea v-model="address" class="form-control" rows="3" placeholder="Address in Details"></textarea>
                                <small v-if="errors.address" id="sh-text1" class="form-text text-danger">{{
                                    errors.address[0]
                                }}</small>
                            </div>
                        </div>
                            <div class="col-md-4 mt-5">
                                <div class="form-group">
                                    <label for="pwd">Upload Counselor Photo</label>
                                    <input @change="onChangePhoto" type="file" class="form-control ">
                                    <small v-if="errors.photo" id="sh-text1" class="form-text text-danger">{{
                                        errors.photo[0]
                                    }}</small>
                                </div>
                            </div>
                    </div>
                     <h1 class="text-xl ml-2 mb-3 invite-form">Counselor Login Information</h1>
                        <div class="row col-md-12">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="pwd">Person Name</label>
                                        <input v-model="name" type="text" class="form-control" placeholder="Person name">
                                        <small v-if="errors.name" id="sh-text1" class="form-text text-danger">{{
                                            errors.name[0]
                                        }}</small>
                                    </div>
                                </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="pwd">Person Email</label>
                                    <input v-model="email" type="email" class="form-control" placeholder="Person Email">
                                    <small v-if="errors.email" id="sh-text1" class="form-text text-danger">{{
                                        errors.email[0]
                                    }}</small>
                                </div>
                            </div>
                      
                        </div>
                        <div class="row col-md-12">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="pwd">Password</label>
                                        <input v-model="password" type="password" class="form-control" placeholder="Password">
                                        <small v-if="errors.password" id="sh-text1" class="form-text text-danger">{{
                                            errors.password[0]
                                        }}</small>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="pwd">Confirm Password</label>
                                        <input v-model="password_confirmation" type="password" class="form-control" placeholder="Confirm Password">
                                        <small v-if="errors.password_confirmation" id="sh-text1" class="form-text text-danger">{{
                                            errors.password_confirmation[0]
                                        }}</small>
                                    </div>
                                </div>
                        </div>
                        <div class="row col-md-12 p-t-15 ml-2">
                            <button :disabled="isPending" id="submit" class="btn btn--radius-2 btn--blue">
                                <span v-if="!isPending">Submit</span>
                                <span v-else>wait..</span>
                            </button>
                        </div>
                </form>
            </div>
        </div>
    </div>

</template>
<script setup>
    import { ref, computed, watch, defineAsyncComponent } from 'vue'
    import { useStore } from 'vuex'
    import { useRoute } from 'vue-router'
    import { useRouter } from 'vue-router';
    import { useDebounceFn } from '@vueuse/core'
    import Request from '../../apis/Request'
    import Notify from '../../helpers/Notify'
    import { useEmitter } from '@/composables/useEmitter'
    import axios from "axios"

    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const isLoading = ref(false)
    const isPending = ref(false)
    const get_countries_for_branch = ref([])
    const get_branches = ref([])
    const errors = ref({})
    const secret_code = ref('')
    const branch_id = ref('')
    const counselor_name = ref('')
    const counselor_phone = ref('')
    const counselor_email = ref('')
    const country = ref('')
    const city = ref('')
    const state = ref('')
    const address = ref('')
    const photo = ref('')
    const alternative_contact = ref('')
    const nid_or_passport = ref('')
    const nationality = ref('')
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const password_confirmation = ref('')

    const submitForm = async()=>{
        isPending.value = true
        const data = new FormData()
        data.append('secret_code', secret_code.value)
        data.append('branch_id', branch_id.value)
        data.append('counselor_name', counselor_name.value)
        data.append('counselor_phone', counselor_phone.value)
        data.append('counselor_email', counselor_email.value)
        data.append('country', country.value)
        data.append('city', city.value)
        data.append('state', state.value)
        data.append('photo', photo.value)
        data.append('address', address.value)
        data.append('alternative_contact', alternative_contact.value)
        data.append('nid_or_passport', nid_or_passport.value)
        data.append('nationality', nationality.value)
        data.append('name', name.value)
        data.append('email', email.value)
        data.append('password', password.value)
        data.append('password_confirmation', password_confirmation.value)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios.post('http://127.0.0.1:8000/api/invite-counsellor',data,config)
            .then(res=> {
            if(res.data.result.key==101){
                Notify.error(res.data.result.val)
                isLoading.value = false
                isPending.value = false
            }
            if(res.data.result.key==200){
                isLoading.value = false
                Notify.success('Counselor Request Sent Successfully!')
                router.push({ name: 'AgentSuccess' })
                isPending.value = false
            }
            
            })
            .catch(error=> {
                isPending.value = false
                errors.value = error.response.data.errors
                console.log(errors.value)
                Notify.error(errors.value.counselor_name && error.response.data.errors.counselor_name[0])
                Notify.error(errors.value.counselor_email && error.response.data.errors.counselor_email[0])
                Notify.error(errors.value.email && error.response.data.errors.email[0])
                Notify.error(errors.value.password && error.response.data.errors.password[0])
                Notify.error(errors.value.password_confirmation && error.response.data.errors.password_confirmation[0])
            })
     }
    

    const getCountriesForBranch = async() =>{
            isLoading.value = true
            Request.GET_REQ('/get-country-list-for-became-agent')
                .then((res) => {
                console.log(res)
                if(res.data.result.key==101){
                    Notify.error(res.data.result.val)
                    isLoading.value = false
                }
                if(res.data.result.key==200){
                    console.log(res.data.result.val)
                    get_countries_for_branch.value = res.data.result.val
                    isLoading.value = false
                }
                })
                .catch((error) => {
                    errors.value = error
                })
        }
        //get branches by country 
        const getBranchesByCountry = async(country_name)=>{
            isLoading.value = true
            Request.GET_REQ('/get-branch-list-for-became_agent/'+country_name)
                .then((res) => {
                if(res.data.result.key==101){
                    Notify.error(res.data.result.val)
                    isLoading.value = false
                }
                if(res.data.result.key==200){
                    //console.log(res.data.result.val)
                    get_branches.value = res.data.result.val
                    isLoading.value = false
                }
                })
                .catch((err) => {
                errors.value = err
                })
        }
        function onChangePhoto(event){
            photo.value = event.target.files[0]
        }
        const getToken = async()=>{
            secret_code.value = route.params.id
        }
        await getCountriesForBranch()
        await getToken()
</script>


<style>
.counselor-invite{
    background-color: #e2e3e2;
    margin: 30px;
}
    
.invite-form{
    color: #bd2121;
}
.submit-button {
    font-size: 1rem;
    color: white;
}
.form-group label{
        font-size: 17px !important;
        color: #17181c !important;
        letter-spacing: 1px
    }

.text-danger{
    font-size: 15px !important;
}
</style>