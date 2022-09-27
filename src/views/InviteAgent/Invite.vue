<template>
    <div class="max-width">
        <div class="custom-body row">
            <div class="card-body">
                <h2 class="custom-title">Agent Invitation Form</h2><br>
    
                <form enctype="multipart/form-data" @submit.prevent="createNewAgent">
                    
                    <div class="row col-md-12">
                        <h4 class="custom-title-info">Basic Information</h4>
                    </div>
                    <div class="row col-md-12">
                        <div class="col-md-6">
                            <input type="hidden" v-model="secret_code" />
                            <div class="form-group">
                                <label for="pwd">Agent Name</label>
                                <input v-model="agent_name" id="agent_name"  name="agent_name" type="text" class="form-control">
                                <small v-if="errors.agent_name" id="sh-text1" class="form-text text-danger">{{
                                    errors.agent_name[0]
                                }}</small>
                              </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="pwd">Agent Email</label>
                                <input v-model="agent_email" id="agent_email"  name="agent_email" type="email" class="form-control">
                                <small v-if="errors.agent_email" id="sh-text1" class="form-text text-danger">{{
                                    errors.agent_email[0]
                                }}</small>
                              </div>
                        </div>
                    </div>
                    <div class="row col-md-12">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="pwd">Agent Phone</label>
                                <input v-model="agent_phone" id="agent_phone" name="agent_phone" type="text" class="form-control" >
                                <small v-if="errors.agent_phone" id="sh-text1" class="form-text text-danger">{{
                                    errors.agent_phone[0]
                                }}</small>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="pwd">Alternative Contact</label>
                                <input v-model="alternative_contact" id="alternative_contact" name="alternative_contact" type="text" class="form-control" >
                                <small v-if="errors.alternative_contact" id="sh-text1" class="form-text text-danger">{{
                                    errors.alternative_contact[0]
                                }}</small>
                            </div>
                        </div>
                    </div>
                    <div class="row col-md-12">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="pwd">Select Country</label>
                                <select @change="getBranchesByCountry(country)" id="country" v-model="country" class="form-control" >
                                    <option value="">--Select One--</option>
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
                                <label for="pwd">Select Branch</label>
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
                                <input v-model="state" id="state" name="state" type="text" class="form-control" >
                                <small v-if="errors.state" id="sh-text1" class="form-text text-danger">{{
                                    errors.state[0]
                                }}</small>
                              </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="pwd">City</label>
                                <input v-model="city" id="city" name="city" type="text" class="form-control" >
                                <small v-if="errors.city" id="sh-text1" class="form-text text-danger">{{
                                    errors.city[0]
                                }}</small>
                              </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card">
                                <div class="card-body">
                                  <p style="color: rgb(136, 21, 21)" class="card-text">If you don,t find any branch in your country. Just select the Country UK and main branch of this country.</p>
                                </div>
                              </div>
                        </div>
                    </div>
                    <div class="row col-md-12">
                        <div class="col-md-8">
                            <div class="form-group">
                                <label for="pwd">Address</label>
                                <textarea v-model="address" id="address" class="form-control" name="address" rows="3" ></textarea>
                                <small v-if="errors.address" id="sh-text1" class="form-text text-danger">{{
                                    errors.address[0]
                                }}</small>
                              </div>
                        </div>
                    </div>
                    <div class="row col-md-12">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="pwd">Logo</label>
                                <input @change="onChangeLogo" type="file" class="form-control">
                              </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="pwd">Agent Background Color</label>
                                <input v-model="agent_bg_color" id="color" class="" type="color" >
                                <small v-if="errors.agent_bg_color" id="sh-text1" class="form-text text-danger">{{
                                    errors.agent_bg_color[0]
                                }}</small>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="pwd">Nationality</label>
                                <input v-model="nationality" id="nationality" class="form-control" type="text" name="nationality" >
                                <small v-if="errors.nationality" id="sh-text1" class="form-text text-danger">{{
                                    errors.nationality[0]
                                }}</small>
                            </div>
                        </div>
                    </div>
                    <div class="row col-md-12">
                        <div class="col-md-8">
                            <div class="form-group">
                                <label for="pwd">Nid or Passport</label>
                                <input v-model="nid_or_passport" id="nid_or_passport" class="form-control" type="text" name="nid_or_passport" >
                                <small v-if="errors.nid_or_passport" id="sh-text1" class="form-text text-danger">{{
                                    errors.nid_or_passport[0]
                                }}</small>
                            </div>
                        </div>
                    </div>
                    <div class="row col-md-12">
                        <h4 class="custom-title-info">Company Information</h4><br>
                    </div>
                    <div class="row col-md-12">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="pwd">Company Name</label>
                                <input v-model="company_name" id="company_name" class="form-control" type="text" name="company_name" >
                                <small v-if="errors.company_name" id="sh-text1" class="form-text text-danger">{{
                                    errors.company_name[0]
                                }}</small>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="pwd">Company Registration Number</label>
                                <input v-model="company_registration_number" id="company_registration_number" class="form-control" type="text" name="company_registration_number" >
                                <small v-if="errors.company_registration_number" id="sh-text1" class="form-text text-danger">{{
                                    errors.company_registration_number[0]
                                }}</small>
                            </div>
                        </div>
                    </div>
                    <div class="row col-md-12">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="pwd">Company Trade License</label>
                                <input @change="onChangeCompanyTradeLicense" id="company_trade_license" class="form-control" type="file" name="company_trade_license">
                                <small v-if="errors.company_trade_license" id="sh-text1" class="form-text text-danger">{{
                                    errors.company_trade_license[0]
                                }}</small>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="pwd">Company Trade License Number</label>
                                <input v-model="company_trade_license_number" id="company_trade_license_number" class="form-control" type="text" name="company_trade_license_number" >
                                <small v-if="errors.company_trade_license_number" id="sh-text1" class="form-text text-danger">{{
                                    errors.company_trade_license_number[0]
                                }}</small>
                            </div>
                        </div>
                    </div>
                    <div class="row col-md-12">
                        <div class="col-md-5">
                            <div class="form-group">
                                <label for="pwd">Company Establish Date</label>
                                <input v-model="company_establish_date" id="company_establish_date" class="form-control" type="date" name="company_establish_date" >
                                <small v-if="errors.company_establish_date" id="sh-text1" class="form-text text-danger">{{
                                    errors.company_establish_date[0]
                                }}</small>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="pwd">Company Number Of Employee</label>
                                <input v-model="company_number_of_employee" id="company_number_of_employee" class="form-control" type="text" name="company_number_of_employee" >
                                <small v-if="errors.company_number_of_employee" id="sh-text1" class="form-text text-danger">{{
                                    errors.company_number_of_employee[0]
                                }}</small>
                            </div>
                        </div>
                    </div>
                    <div class="row col-md-12">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="pwd">Company Email</label>
                                <input v-model="company_email" id="company_email" class="form-control" type="text" name="company_email" >
                                <small v-if="errors.company_email" id="sh-text1" class="form-text text-danger">{{
                                    errors.company_email[0]
                                }}</small>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="pwd">Company Phone</label>
                                <input v-model="company_phone" id="company_phone" class="form-control" type="text" name="company_phone" >
                                <small v-if="errors.company_phone" id="sh-text1" class="form-text text-danger">{{
                                    errors.company_phone[0]
                                }}</small>
                            </div>
                        </div>
                    </div>
                    <div class="row col-md-12">
                        <div class="col-md-7">
                            <div class="form-group">
                            <label for="pwd">Company Country</label>
                            <select v-model="company_country" name="company_country" class="form-control" id="company_country" >
                                <option value="">--Select One--</option>
                                <option v-for="(getcountry) in get_countries" :key="getcountry" :value="getcountry">
                                    {{ getcountry }}
                                </option>
                               
                            </select>
                            <small v-if="errors.company_country" id="sh-text1" class="form-text text-danger">{{
                                    errors.company_country[0]
                                }}</small>
                            </div>
                        </div>
                    </div>
                    <div class="row col-md-12">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="pwd">Company State</label>
                                <input v-model="company_state" id="company_state" class="form-control" type="text" name="company_state" >
                                <small v-if="errors.company_state" id="sh-text1" class="form-text text-danger">{{
                                    errors.company_state[0]
                                }}</small>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="pwd">Company City</label>
                                <input v-model="company_city" id="company_city" class="form-control" type="text" name="company_city" >
                                <small v-if="errors.company_city" id="sh-text1" class="form-text text-danger">{{
                                    errors.company_city[0]
                                }}</small>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="pwd">Company Zipcode</label>
                                <input v-model="company_zip_code" id="company_zip_code" class="form-control" type="text" name="company_zip_code" >
                                <small v-if="errors.company_zip_code" id="sh-text1" class="form-text text-danger">{{
                                    errors.company_zip_code[0]
                                }}</small>
                            </div>
                        </div>
                    </div>
                    <div class="row col-md-12">
                        <div class="col-md-8">
                            <div class="form-group">
                                <label for="pwd">Company Address</label>
                                <textarea v-model="company_address" id="company_address" class="form-control" name="company_address" rows="3" ></textarea>
                                <small v-if="errors.company_address" id="sh-text1" class="form-text text-danger">{{
                                    errors.company_address[0]
                                }}</small>
                            </div>
                        </div>
                    </div>
                <div class="row col-md-12">
                  <div class="col">
                    <div
                      v-for="(input, index) in additionals"
                      :key="index"
                      class=""
                    >
                      <div class="col col-md-8 pl-0">
                        <label for="exampleFormControlTextarea1">Additional Information</label>
                        <textarea
                          id="exampleFormControlTextarea1"
                          v-model="input.additional"
                          class="form-control"
                          rows="3"
                          spellcheck="false"
                        ></textarea>
                      </div>
                      <div class="row ml-4 mt-2">
                        <div v-show="index == additionals.length - 1">
                          <button
                            class="btn btn-warning btn-rounded mb-2 mr-2 mt-2 inline-flex"
                            @click.prevent="add"
                          >
                            Add More
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
                              class="feather feather-plus-circle"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <line x1="12" y1="8" x2="12" y2="16" />
                              <line x1="8" y1="12" x2="16" y2="12" />
                            </svg>
                          </button>
                        </div>
                        <div v-show="index || (!index && additionals.length > 1)">
                          <button class="btn btn-danger btn-rounded mb-2 mr-2 mt-2" @click.prevent="remove">
                            Remove
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
                          </button>
                        </div>
                      </div>
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
        //const user = computed(() => store.getters.user)
        //console.log(route.params.id)
        const isLoading = ref(false)
        const isPending = ref(false)
        const get_countries_for_branch = ref([])
        const get_branches = ref([])
        const get_countries = ref([])
        //post value
        const secret_code = ref('')
        const agent_name = ref('')
        const agent_email = ref('')
        const agent_phone = ref('')
        const alternative_contact = ref('')
        const country = ref('')
        const branch_id = ref('')
        const state = ref('')
        const city = ref('')
    
        const address = ref('')
        const agent_bg_color = ref('')
        const nationality = ref('')
        const nid_or_passport = ref('')
        const logo = ref('')
        const company_name = ref('')
        const company_registration_number = ref('')
        const company_trade_license = ref('')
        const company_trade_license_number = ref('')
        const company_establish_date = ref('')
        const company_number_of_employee = ref('')
        const company_email = ref('')
        const company_phone = ref('')
        const company_country = ref('')
        const company_state = ref('')
        const company_city = ref('')
        const company_zip_code = ref('')
        const company_address = ref('')
        const additionals = ref([
        {
            additional: '',
        },
        ])
        const errors = ref({})

        const getToken = async()=>{
            secret_code.value = route.params.id
        }
    
        const createNewAgent = async()=>{
            isLoading.value = true
            isPending.value = true
            const data = new FormData()
            data.append('branch_id', branch_id.value)
            data.append('secret_code', secret_code.value)
            data.append('agent_name', agent_name.value)
            data.append('agent_phone', agent_phone.value)
            data.append('agent_email', agent_email.value)
            data.append('country', country.value)
            data.append('city', city.value)
            data.append('state', state.value)
            data.append('alternative_contact', alternative_contact.value)
            data.append('address', address.value)
            data.append('agent_bg_color', agent_bg_color.value)
            data.append('nationality', nationality.value)
            data.append('nid_or_passport', nid_or_passport.value)
            data.append('logo', logo.value)
            data.append('company_name', company_name.value)
            data.append('company_registration_number', company_registration_number.value)
            data.append('company_trade_license', company_trade_license.value)
            data.append('company_trade_license_number', company_trade_license_number.value)
            data.append('company_establish_date', company_establish_date.value)
            data.append('company_number_of_employee', company_number_of_employee.value)
            data.append('company_email', company_email.value)
            data.append('company_phone', company_phone.value)
            data.append('company_country', company_country.value)
            data.append('company_state', company_state.value)
            data.append('company_city', company_city.value)
            data.append('company_zip_code', company_zip_code.value)
            data.append('company_address', company_address.value)
            data.append('addtional_info', additionals.value)
            console.log(additionals.value)
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            axios.post('http://127.0.0.1:8000/api/became-an-agent',data,config)
                .then(res=> {
                console.log(res)
                // alert('called')
                // if(res.data.result.key==101){
                //     Notify.error(res.data.result.val)
                //     isLoading.value = false
                //     isPending.value = false
                // }
                // if(res.data.result.key==200){
                //     alert('success called')
                //     isLoading.value = false
                //     Notify.success('Agent Request Sent Successfully!')
                //     router.push({ name: 'AgentSuccess' })
                //     isPending.value = false
                // }
                
                // })
                // .catch(error=> {
                //     isPending.value = false
                //     alert('error called')
                //     //console
                //     errors.value = error.response.data.errors
                //     Notify.error(errors.value.agent_name && error.response.data.errors.agent_name[0])
                //     Notify.error(errors.value.agent_email && error.response.data.errors.agent_email[0])
                //     Notify.error(errors.value.agent_phone && error.response.data.errors.agent_phone[0])
                //     Notify.error(errors.value.country && error.response.data.errors.country[0])
                //     Notify.error(errors.value.city && error.response.data.errors.city[0])
                //     Notify.error(errors.value.address && error.response.data.errors.address[0])
                //     Notify.error(errors.value.alternative_contact && error.response.data.errors.alternative_contact[0])
                //     Notify.error(errors.value.nid_or_passport && error.response.data.errors.nid_or_passport[0])
                //     Notify.error(errors.value.nationality && error.response.data.errors.nationality[0])
                //     Notify.error(errors.value.logo && error.response.data.errors.logo[0])
                //     Notify.error(errors.value.agent_bg_color && error.response.data.errors.agent_bg_color[0])
                //     Notify.error(errors.value.company_name && error.response.data.errors.company_name[0])
                //     Notify.error(errors.value.company_registration_number && error.response.data.errors.company_registration_number[0])
                //     Notify.error(errors.value.company_trade_license && error.response.data.errors.company_trade_license[0])
                //     Notify.error(errors.value.company_trade_license_number && error.response.data.errors.company_trade_license_number[0])
                //     Notify.error(errors.value.company_establish_date && error.response.data.errors.company_establish_date[0])
                //     Notify.error(errors.value.company_number_of_employee && error.response.data.errors.company_number_of_employee[0])
                //     Notify.error(errors.value.company_phone && error.response.data.errors.company_phone[0])
                //     Notify.error(errors.value.company_email && error.response.data.errors.company_email[0])
                //     Notify.error(errors.value.company_address && error.response.data.errors.company_address[0])
                //     Notify.error(errors.value.company_zip_code && error.response.data.errors.company_zip_code[0])
                //     Notify.error(errors.value.company_city && error.response.data.errors.company_city[0])
                //     Notify.error(errors.value.company_state && error.response.data.errors.company_state[0])
                //     Notify.error(errors.value.company_country && error.response.data.errors.company_country[0])
                })
            }
        const getCountriesForBranch = async() =>{
            isLoading.value = true
            Request.GET_REQ('/get-country-list-for-became-agent')
                .then((res) => {
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
        //get all countries
        const getAllCountries = async()=>{
            isLoading.value = true
            Request.GET_REQ('/get-all-countries')
            .then((res) => {
            if(res.data.result.key==101){
                Notify.error(res.data.result.val)
                isLoading.value = false
            }
            if(res.data.result.key==200){
                console.log(res.data.result.val)
                get_countries.value = res.data.result.val
                isLoading.value = false
            }
            })
            .catch((error) => {
                isPending.value = false
                errors.value = error.response.data.errors
            //console.log(error.response.data.errors.email[0])
            
            })
        }
        function onChangeLogo(event){
            logo.value = event.target.files[0]
        }
        
        function onChangeCompanyTradeLicense(event){
            company_trade_license.value = event.target.files[0]
        }
        const add = async()=> {
            additionals.value.push({ additional:'' })
        }
        const remove = async(index)=> {
        additionals.value.splice(index, 1)
        }
    
        await getCountriesForBranch()
        await getAllCountries()
        await getToken()
    
    </script>
    
    <style scoped lang="scss">
        .max-width{
            background-color: #ffffff;
        }
        .custom-body{
            margin: 30px;
            background-color: #e2e3e2;
        }
        .form-group label, label{
            font-size: 17px !important;
            color: #17181c !important;
            letter-spacing: 1px
        }
        .custom-title{
            font-size: 25px !important;
        }
        .custom-title-info{
            font-size: 20px;
            margin: 10px;
            color:#bd2121;
        }
        .text-danger{
            font-size: 15px !important;
        }
    </style>