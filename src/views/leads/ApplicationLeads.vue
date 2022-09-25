<template>
  <div class="layout-px-spacing layout-top-spacing">
    <div
      v-if="(user && user.user_type == 'superAdmin') || (user && user.user_type == 'branchManager')"
      class="text-right"
    >
      <router-link :to="{ name: 'Add_Lead' }">
        <button class="btn btn-info btn-rounded mb-2 mr-4 inline-flex">
          Add Lead
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
      </router-link>

      <router-link :to="{ name: 'Leads' }">
        <button class="btn btn-info btn-rounded mb-2 mr-4 inline-flex">
          View Lead
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
            class="feather feather-eye"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </button>
      </router-link>
    </div>
    <div id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
      <div class="statbox widget box box-shadow">
        <div class="widget-content widget-content-area">
          <div class="row">
            <div class="col col-md-1 grid place-content-center">
              <button
                class="mb-4 rounded-md border bg-gray-200 p-2 dark:bg-transparent"
                @click="filterIsVisible = !filterIsVisible"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  class="h-4 w-4 dark:fill-white"
                >
                  <path
                    d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"
                  />
                </svg>
              </button>
            </div>
            <div class="col col-md-4">
              <select v-model="countryId" class="form-control" @change="setCountryStatuses">
                <option value="" disabled>Select Country</option>
                <option v-for="country in total_countries" :key="country.id" :value="country.id">
                  {{ country.country?.name }}
                </option>
              </select>
            </div>
            <div class="col col-md-3">
              <select v-model="countryStatusId" class="form-control" :disabled="LoadAppStatus">
                <option v-if="countrySearchStatues.length === 0" value="" disabled>
                  Before Select a Country
                </option>
                <option v-if="countrySearchStatues.length > 0" value="" disabled>
                  Search with Application Status
                </option>
                <option
                  v-for="countryStatus in countrySearchStatues"
                  :key="countryStatus.id"
                  :value="countryStatus.id"
                >
                  {{ countryStatus.status_name }}
                </option>
              </select>
            </div>
            <div class="col col-md-4">
              <div class="form-group mb-4">
                <input
                  v-model="query"
                  type="text"
                  class="form-control rounded-md border-gray-300 focus:ring-blue-300"
                  placeholder="Search by First or Last Name, Email, Phone"
                />
                <span v-if="searchLoading" class="search-icon">
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
                <span v-if="!searchLoading" class="search-icon">
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
                    class="feather feather-search"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </span>
                <span
                  v-if="isSearch"
                  @click="resetSearch"
                  class="block w-full cursor-pointer text-right text-blue-500"
                  >Clear</span
                >
              </div>
            </div>
            <div class="col col-md-4 mb-4" v-if="filterIsVisible">
              <select name="" id="" class="form-control" v-model="days">
                <option value="">Choose Range</option>
                <option value="3">Last 3 days</option>
                <option value="7">Last 7 days</option>
                <option value="15">Last 15 days</option>
                <option value="30">Last 30 days</option>
              </select>
            </div>
            <div v-if="isAssign" class="col col-md-12">
              <div>
                <section class="flex items-center space-x-2 font-bold">
                  <span class="badge badge-secondary badge-pill mr-2">
                    {{ totalSelected }}
                  </span>
                  Selected
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
                    class="feather feather-chevrons-right"
                  >
                    <polyline points="13 17 18 12 13 7"></polyline>
                    <polyline points="6 17 11 12 6 7"></polyline>
                  </svg>

                  <span class="assign-text" type="button" @click="assigntoCounselor"
                    >Assign to Counselor</span
                  >
                </section>

                <div class="text-center">
                  <!-- Modal -->
                  <div
                    id="counselorAssignModal"
                    class="modal fade"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog" role="document">
                      <form @submit.prevent="handleAssignSubmit">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 id="exampleModalLabel" class="modal-title">Assign to Counselor</h5>
                            <button
                              type="button"
                              class="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
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
                            <div v-if="user && user.user_type === 'superAdmin'">
                              <div class="form-group">
                                <label style="display: block; text-align: left"
                                  >Select Branch to assign Counselor</label
                                >
                                <select
                                  v-model="selected_a_branch"
                                  class="form-control"
                                  @change="activeBranchId($event.target.value)"
                                >
                                  <option value="" disabled>Choose Branch</option>
                                  <option
                                    v-for="branch in activeBranches"
                                    :key="branch.id"
                                    :value="branch.id"
                                  >
                                    {{ branch.branch_name }}
                                  </option>
                                </select>
                              </div>
                              <div v-if="isSelectBranch" class="form-group">
                                <label style="display: block; text-align: left"
                                  >Assign selected Items to counselor</label
                                >
                                <select
                                  v-model="selected_counselor"
                                  class="form-control"
                                  @change="counselorId($event)"
                                >
                                  <option value="" disabled>Choose Counselor</option>
                                  <option
                                    v-for="counselor in counselors"
                                    :key="counselor.id"
                                    :value="counselor.id"
                                  >
                                    {{ counselor.counselor_name }}
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div v-else>
                              <div class="form-group">
                                <label style="display: block; text-align: left"
                                  >Assign selected Items to counselor</label
                                >
                                <select
                                  v-model="selected_counselor"
                                  class="form-control"
                                  @change="counselorId($event)"
                                >
                                  <option value="" disabled>Choose Counselor</option>
                                  <option
                                    v-for="counselor in counselors"
                                    :key="counselor.id"
                                    :value="counselor.id"
                                  >
                                    {{ counselor.counselor_name }}
                                  </option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div class="modal-footer text-left">
                            <button class="btn btn-sm" data-dismiss="modal">Cancel</button>
                            <button type="submit" class="btn btn-sm btn-info">
                              Save
                              <span v-if="lazyLoadAssign">
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
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col col-md-12">
              <div id="tableSimple" class="col-lg-12 col-12 p-0">
                <div class="table-responsive">
                  <table id="manage_app_process" class="table-bordered mb-4 table">
                    <thead>
                      <tr>
                        <th class="checkbox-column">
                          <input v-model="selectAll" type="checkbox" @click="select" />
                        </th>
                        <th></th>
                        <th>App Status</th>
                        <th>Unique ID</th>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Branch</th>
                        <th style="text-align: center">Applicant Ready</th>
                        <th
                          v-if="
                            (user && user.user_type === 'superAdmin') ||
                            (user && user.user_type === 'branchManager') ||
                            (user && user.user_type === 'counselor')
                          "
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <template v-for="(lead, index) in leads" :key="lead.id">
                        <tr class="lead-row">
                          <td>
                            <input
                              v-model="selected"
                              type="checkbox"
                              :value="lead.id"
                              @click="selectSingle(lead.id)"
                            />
                          </td>
                          <td>
                            <span style="cursor: pointer" @click="toggle(index)">
                              <svg
                                :class="index == isOpenIndex ? 'plus-off' : ''"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-plus-square"
                              >
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="12" y1="8" x2="12" y2="16"></line>
                                <line x1="8" y1="12" x2="16" y2="12"></line>
                              </svg>

                              <svg
                                v-if="index == isOpenIndex"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-minus-square"
                              >
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="8" y1="12" x2="16" y2="12"></line>
                              </svg>
                            </span>
                          </td>
                          <td>
                            <span
                              class="badge badge-pill badge-sm text-white"
                              :style="{
                                background:
                                  lead.lead_application_status_id &&
                                  lead.application_status?.status_color
                                    ? lead.application_status?.status_color
                                    : '#1b55e2',
                              }"
                              style="position: relative"
                              @click="
                                ;(user && user.user_type === 'superAdmin') ||
                                (user && user.user_type === 'branchManager') ||
                                (user && user.user_type === 'counselor')
                                  ? changeAppStatus(
                                      lead.interested_country_id,
                                      lead.id,
                                      lead.lead_application_status_id
                                    )
                                  : ''
                              "
                            >
                              {{
                                lead.lead_application_status_id
                                  ? lead.application_status && lead.application_status?.status_name
                                  : 'Set Status'
                              }}
                              <span
                                v-if="
                                  (user && user.user_type === 'superAdmin') ||
                                  (user && user.user_type === 'branchManager') ||
                                  (user && user.user_type === 'counselor')
                                "
                                class="app-edit-visible"
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
                                  data-v-0920824e=""
                                >
                                  <path d="M12 20h9" data-v-0920824e=""></path>
                                  <path
                                    d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
                                    data-v-0920824e=""
                                  ></path>
                                </svg>
                              </span>
                            </span>
                          </td>
                          <td>
                            <span
                              class="cursor-pointer"
                              title="copy"
                              @click="copyToClipBoard(lead.id)"
                              >{{ lead.id }}</span
                            >
                          </td>
                          <td>
                            <span class="cursor-pointer">{{
                              useDateFormat(lead.created_at, 'DD-MM-YY').value
                            }}</span>
                          </td>
                          <td style="position: relative" @click="openAppLeadInfo(lead.id)">
                            {{ lead.first_name }}
                            {{ lead.last_name }}
                            <span class="preview-lead" @click="openAppLeadInfo(lead.id)">
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
                                class="feather feather-eye"
                                data-v-26430ed1=""
                              >
                                <path
                                  d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                                  data-v-26430ed1=""
                                ></path>
                                <circle cx="12" cy="12" r="3" data-v-26430ed1=""></circle>
                              </svg>
                            </span>
                          </td>

                          <td>
                            {{ lead.phone }}
                          </td>
                          <td>
                            {{ lead.email }}
                          </td>
                          <td>
                            {{ lead.branch && lead.branch.branch_name }}
                          </td>
                          <td style="text-align: center">
                            <span
                              :class="
                                lead.lead_application_status == 1
                                  ? 'badge badge-pill badge-success'
                                  : 'badge badge-pill badge-danger'
                              "
                            >
                              {{ lead.lead_application_status == 1 ? 'Yes' : 'No' }}
                            </span>
                          </td>

                          <td
                            v-if="
                              (user && user.user_type === 'superAdmin') ||
                              (user && user.user_type === 'branchManager') ||
                              (user && user.user_type === 'counselor')
                            "
                            class="flex items-center space-x-2"
                          >
                            <router-link
                              :to="{
                                name: 'Edit_Lead',
                                params: { id: lead.id },
                              }"
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
                                class="feather feather-edit-3 icon custom-edit-icon"
                              >
                                <path d="M12 20h9"></path>
                                <path
                                  d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
                                ></path>
                              </svg>
                            </router-link>
                            <router-link
                              :to="{
                                name: 'Send_Application_Email',
                                params: { id: lead.id },
                              }"
                            >
                              <span class="ml-2"
                                ><svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  class="feather feather-mail"
                                >
                                  <path
                                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                                  ></path>
                                  <polyline points="22,6 12,13 2,6"></polyline></svg
                                ><br />
                              </span>
                            </router-link>
                          </td>
                        </tr>
                        <tr v-if="index == isOpenIndex" class="sub-row-th">
                          <th></th>
                          <th></th>
                          <th></th>
                          <th>Category</th>
                          <th>Course Level</th>
                          <th>Intersted Country</th>
                          <th>Assigned Counselor</th>
                          <th>Lead Source</th>
                        </tr>
                        <tr v-if="index == isOpenIndex">
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>
                            {{ lead.category && lead.category.category_name }}
                          </td>
                          <td>
                            {{ lead.course_level && lead.course_level.course_level_name }}
                          </td>
                          <td>
                            {{ lead.country && lead.country.country.name }}
                          </td>

                          <td>
                            {{ lead.counselor && lead.counselor.counselor_name }}
                          </td>

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
                      </template>
                    </tbody>
                  </table>
                  <div class="text-center">
                    <!-- Modal -->
                    <div
                      id="applicationStatusModal"
                      class="modal fade"
                      tabindex="-1"
                      role="dialog"
                      aria-labelledby="applicationStatusLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog" role="document">
                        <form @submit.prevent="handleAppStatusSubmit">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 id="applicationStatusLabel" class="modal-title">
                                Choose Application Status
                              </h5>
                              <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                              >
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
                              <div class="form-group">
                                <label style="display: block; text-align: left"
                                  >Select Application Present Status
                                  <span v-if="LoadAppStatus">
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
                                    </svg> </span
                                ></label>
                                <select
                                  v-model="application_status"
                                  class="form-control"
                                  :disabled="LoadAppStatus"
                                  @change="onChangeAppStatusId($event)"
                                >
                                  <option value="" disabled>Choose Application Status</option>
                                  <option
                                    v-for="countryStatus in countryStatues"
                                    :key="countryStatus.id"
                                    :value="countryStatus.id"
                                  >
                                    {{ countryStatus.status_name }}
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div class="modal-footer text-left">
                              <button class="btn btn-sm" data-dismiss="modal">Cancel</button>
                              <button type="submit" class="btn btn-sm btn-info">
                                Save
                                <span v-if="lazyLoadApp">
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
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="my-4 flex justify-between">
            <span> showing {{ total_app_leads }} results </span>
            <div class="flex items-center justify-between space-x-2 md:space-x-4">
              <label for="per_page" class="inline-flex">Per page: </label>
              <select id="per_page" v-model="perPage" class="form-control">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="col col-md-12">
              <div class="lms-pagination">
                <base-pagination
                  v-if="isSearch"
                  v-model="page"
                  :links="pageLinks"
                  @paginate="search"
                />
                <base-pagination v-else v-model="page" :links="pageLinks" @paginate="app_leads" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <lead-drawer
        :drawer-active="drawerActive"
        :lead-id="leadId"
        :drawerLoading="drawerLoading"
        :themeModeData="themeModeData"
        @close-drawer="closeDrawer"
        @all_leads="all_app_leads"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, computed, watch, defineAsyncComponent } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { useDebounceFn, useClipboard, useDateFormat } from '@vueuse/core'
import { useEmitter } from '@/composables/useEmitter'
import Request from '../../apis/Request'
import Notify from '../../helpers/Notify'

const LeadDrawer = defineAsyncComponent(() => import('@/views/leads/LeadDrawer.vue'))

defineProps(['themeModeData'])

const store = useStore()
const router = useRouter()
const route = useRoute()
const emitter = useEmitter()
const user = computed(() => store.getters.user)
const leads = ref([])
const errors = ref({})
const isLoading = ref(false)
const drawerLoading = ref(false)
const page = ref(route.query.page ? parseInt(route.query.page) : 1)
const perPage = ref(10)
const pageLinks = ref([])
const total_app_leads = ref(0)
const leadId = ref('bhe')
const drawerActive = ref(false)
const selected = ref([])
const selectAll = ref(false)
const isAssign = ref(false)
const lazyLoadAssign = ref(false)
const lazyLoadApp = ref(false)
const LoadAppStatus = ref(false)
const selectItems = ref('')
const selected_counselor = ref('')
const counselors = ref([])
const countrySearchStatues = ref([])
const countryStatues = ref([])
const isOpen = ref(-1)
const application_status = ref('')
const app_lead_id = ref('')
const total_countries = ref([])
const isCountrySearch = ref(false)
const isCountryStatus = ref(false)
const searchLoading = ref(false)
const query = ref('')
const isSearch = ref(false)
const isSearchText = ref(false)
const notSearch = ref(true)
const countryId = ref('')
const countryStatusId = ref('')
const isSelectBranch = ref(false)
const activeBranches = ref([])
const selected_a_branch = ref('')
const days = ref('')
const filterIsVisible = ref(false)

const totalSelected = computed(() => selectItems.value)
const isOpenIndex = computed(() => isOpen.value)
//methods

async function fetchPrimary() {
  await getCounselor()
  await totalCountry()
  await getActiveBranch()
  await all_app_leads()

  emitter.on('application-reload-lead', async () => {
    await all_app_leads()
  })
}

function copyToClipBoard(value) {
  const { copy, copied } = useClipboard(value)
  if (!copied.value) {
    copy(value)
  }
}

async function all_app_leads() {
  const branchId = user.value?.branch_id

  try {
    const res = await Request.GET_REQ(
      `/all-application-leads/${branchId}?per_page=${perPage.value}&page=${page.value}`
    )
    leads.value = res.data.data
    total_app_leads.value = res.data.total
    pageLinks.value = res.data.links
    notSearch.value = true
    isCountrySearch.value = false
    isCountryStatus.value = false
    isSearchText.value = false
    searchLoading.value = false
  } catch (err) {
    errors.value = err.res.data.errors
  }
}
async function app_leads() {
  const branchId = user.value?.branch_id
  const queryString = days.value
    ? `days=${days.value}&per_page=${perPage.value}&page=${page.value}`
    : `per_page=${perPage.value}&page=${page.value}`
  try {
    const res = await Request.GET_REQ(`/all-application-leads/${branchId}?${queryString}`)
    leads.value = res.data.data
    total_app_leads.value = res.data.total
    pageLinks.value = res.data.links
  } catch (err) {
    errors.value = err.res.data.errors
  }
}
function openAppLeadInfo(leadId) {
  router.push({
    name: 'Application_Lead_Info',
    params: { id: leadId },
  })
}
function closeDrawer() {
  drawerActive.value = false
}
function select() {
  selected.value = []
  if (!selectAll.value) {
    for (let i in leads.value) {
      selected.value.push(leads.value[i].id)
    }
  }
  selectItems.value = selected.value.length

  if (selected.value.length) {
    isAssign.value = true
  } else {
    isAssign.value = false
  }
}
function selectSingle(leadId) {
  let arr = selected.value
  if (arr.includes(leadId)) {
    arr.splice(arr.indexOf(leadId), 1)
    selectItems.value = selected.value.length

    if (selected.value.length) {
      isAssign.value = true
    } else {
      isAssign.value = false
    }
    return
  }
  arr.push(leadId)
  selectItems.value = selected.value.length
  if (selected.value.length) {
    isAssign.value = true
  } else {
    isAssign.value = false
  }
}
async function getCounselor() {
  if (user.value?.user_type === 'superAdmin') {
    try {
      const res = await Request.GET_REQ(`/active-counselor`)
      counselors.value = res.data
    } catch (err) {
      Notify(err.res.data)
    }
  }
  if (user.value?.user_type === 'branchManager' || user.value?.user_type === 'counselor') {
    try {
      const res = await Request.GET_REQ(`/active-counselor/${user.value?.branch_id}`)
      counselors.value = res.data
    } catch (err) {
      Notify(err.res.data)
    }
  }
}
function handleAssignSubmit() {
  lazyLoadAssign.value = true
  let data = {
    leadIds: selected.value,
    counselorId: selected_counselor.value,
    branchId: selected_a_branch.value || user.value?.branch_id,
  }

  Request.POST_REQ(data, `/lead-assign-counselor`)
    .then(() => {
      $('#counselorAssignModal').modal('hide')
      selected.value = []
      selectAll.value = false
      isAssign.value = false
      emitter.emit('application-reload-lead')
      lazyLoadAssign.value = false
      Notify.success('Successfully Assigned to Counselor')
      errors.value = {}
    })
    .catch((err) => {
      errors.value = err.response.data.errors
    })
}
function assigntoCounselor() {
  $('#counselorAssignModal').modal('show')
}
async function getActiveBranch() {
  try {
    const res = await Request.GET_REQ(`/active-branches`)
    activeBranches.value = res.data
  } catch (err) {
    Notify(err.res.data)
  }
}
function counselorId(event) {
  let counselorId = event.target.value
  selected_counselor.value = counselorId
}
function activeBranchId(branchId) {
  selected_a_branch.value = branchId

  Request.GET_REQ(`/active-counselor/${branchId}`)
    .then((res) => {
      counselors.value = res.data
      isSelectBranch.value = true
    })
    .catch((err) => {
      Notify(err.res.data)
    })
}
function toggle(index) {
  if (index == isOpen.value) {
    isOpen.value = -1
  } else {
    isOpen.value = index
  }
}
function changeAppStatus(countryId, leadId, lead_app_status) {
  LoadAppStatus.value = true
  $('#applicationStatusModal').modal('show')
  app_lead_id.value = leadId

  Request.GET_REQ(`/active-application-status/${countryId}`)
    .then((res) => {
      countryStatues.value = res.data
      LoadAppStatus.value = false
      application_status.value = lead_app_status
    })
    .catch((err) => {
      Notify(err.res.data)
    })
}
function onChangeAppStatusId(event) {
  application_status.value = event.target.value
}
function handleAppStatusSubmit() {
  lazyLoadApp.value = true
  let data = {
    lead_application_status_id: application_status.value,
  }
  Request.POST_REQ(data, `/update-application-status/${app_lead_id.value}`)
    .then(() => {
      $('#applicationStatusModal').modal('hide')
      emitter.emit('application-reload-lead')
      lazyLoadApp.value = false
      Notify.success('Successfully Update Application Status')
      errors.value = {}
    })
    .catch((err) => {
      errors.value = err.response.data.errors
    })
}
async function totalCountry() {
  isLoading.value = true
  try {
    const res = await Request.GET_REQ('/total-represent-countries')
    total_countries.value = res.data.data
    isLoading.value = false
  } catch (err) {
    errors.value = err.res.data.errors
  }
}

async function setCountryStatuses() {
  try {
    const res = await Request.GET_REQ(`/search-active-application-status/${countryId.value}`)
    countrySearchStatues.value = res.data
  } catch (err) {
    Notify(err.res.data)
  }
}

// search application leads
async function search() {
  isSearch.value = true
  let queryString = '?q=' + query.value + '&per_page=' + perPage.value
  if (countryId.value) {
    queryString += '&interested_country_id=' + countryId.value
  }
  if (countryStatusId.value) {
    queryString += '&lead_application_status_id=' + countryStatusId.value
  }
  if (days.value) {
    queryString += '&days=' + days.value
  }
  if (page.value) {
    queryString += '&page=' + page.value
  }

  try {
    const res = await Request.GET_REQ(`/app-leads/search${queryString}`)
    leads.value = res.data.data
    total_app_leads.value = res.data.total
    pageLinks.value = res.data.links
  } catch (err) {
    errors.value = err.res.data.errors
  }
}

function resetSearch() {
  isSearch.value = false
  query.value = ''
  countryId.value = ''
  countryStatusId.value = ''
  days.value = ''
}

watch([countryId, countryStatusId, query], useDebounceFn(search, 300))
watch([days, perPage], async () => {
  if (isSearch.value) {
    await search()
  } else {
    await app_leads()
  }
})

await fetchPrimary()
</script>
<style scoped lang="scss">
.component-card_4 {
  width: auto;
  .user-info {
    width: 100%;
    padding: 5px 0 20px 0px;
  }
  .logo-title-wrap {
    img {
      border-radius: unset;
      height: 80px;
    }
  }
  .custom-btn-branch {
    margin-bottom: 0.5rem;
    margin-right: 0.5rem;
    cursor: pointer;
  }
  .custom-list-group-branch .list-group-item {
    background: transparent;
    padding: 0;
    border: unset;
    position: relative;
    margin: 7px 0;

    &::before {
      position: absolute;
      content: '';
      width: 100%;
      height: 1px;
      background: #e0e6ed;
      left: 0;
      bottom: -7px;
    }
    &::last-child::before {
      background: transparent !important;
      content: unset;
    }
    h6 {
      margin: 0;
      position: relative;
      padding-left: 20px;
      font-size: 14px;

      &::before {
        position: absolute;
        content: '';
        width: 16px;
        height: 16px;
        left: 0;
        border-radius: 3px;
      }
    }
    h6.count-primary {
      &::before {
        background: #1b55e2;
      }
    }
    h6.count-info {
      &::before {
        background: #2196f3;
      }
    }
    h6.count-success {
      &::before {
        background: #8dbf42;
      }
    }
    h6.count-warning {
      &::before {
        background: #e2a03f;
      }
    }
    h6.count-danger {
      &::before {
        background: #e7515a;
      }
    }
    h6.count-secondary {
      &::before {
        background: #5c1ac3;
      }
    }
  }
  .card-user_name {
    font-size: 24px;
  }
}

body.dark .component-card_4 {
  .custom-list-group-branch .list-group-item {
    &::before {
      background: #1b2e4b;
    }
  }
}

ul.list-group.custom-list-group-branch li:last-child:before {
  background: transparent !important;
}
.page-link {
  background-color: #0e1726 !important;
}
.lead-row {
  cursor: pointer;
}
body.dark tr.lead-row:hover {
  background-color: #060818;
}
tr.lead-row:hover {
  background-color: #fafafa;
}
.assign-text {
  text-decoration: underline;
  cursor: pointer;
}
.modal-footer {
  display: block !important;
  padding: 15px 25px 15px;
}
.preview-lead {
  display: none;
  position: absolute;
  right: 0;
  top: 30%;
}
.lead-row:hover .preview-lead,
.lead-row:hover .app-edit-visible {
  display: block;
}
.plus-off {
  display: none;
}
body.dark .sub-row-th th {
  color: #d3d3d3;
}
.sub-row-th th {
  text-transform: uppercase;
  color: #1b55e2;
  font-size: 12px;
}
.search-icon {
  position: absolute;
  right: 5%;
  top: 15%;
}
.app-edit-visible {
  position: absolute;
  right: -25px;
  display: none;
  top: 0;
}
</style>
