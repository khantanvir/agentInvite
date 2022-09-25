<template>
  <div class="layout-px-spacing layout-top-spacing">
    <div class="text-right">
      <router-link
        v-if="
          (user && user.user_type == 'superAdmin') || (user && user.user_type == 'branchManager')
        "
        :to="{ name: 'Add_Lead' }"
      >
        <button class="btn btn-info btn-rounded mb-2 mr-4 inline-flex space-x-2">
          <span>Add Lead</span>
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

      <router-link
        v-if="
          (user && user.user_type == 'superAdmin') ||
          (user && user.user_type == 'branchManager') ||
          (user && user.user_type == 'counselor') ||
          (user && user.user_type == 'frontOfficer')
        "
        :to="{ name: 'Application_Leads' }"
      >
        <button class="btn btn-info btn-rounded mb-2 mr-4 inline-flex items-center space-x-2">
          <span>Application Lead</span>
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

      <button
        v-if="
          (user && user.user_type == 'branchManager') ||
          (user && user.user_type == 'counselor') ||
          (user && user.user_type == 'frontOfficer')
        "
        class="btn btn-primary btn-rounded mb-2 mr-4 inline-flex"
        @click="myLeads"
      >
        My Leads
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

      <button
        v-if="
          (user && user.user_type == 'branchManager') ||
          (user && user.user_type == 'counselor') ||
          (user && user.user_type == 'frontOfficer')
        "
        class="btn btn-secondary btn-rounded mb-2 mr-4 inline-flex"
        @click="myBranchLeads"
      >
        All Branch Leads
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
    </div>
    <div id="card_1" class="col-lg-12 layout-spacing layout-top-spacing">
      <div class="statbox widget box box-shadow">
        <div class="widget-content widget-content-area">
          <div class="grid grid-cols-12">
            <div class="col-span-12 grid grid-cols-2 content-center gap-2 md:gap-4">
              <div class="flex justify-between space-x-2 md:space-x-4">
                <select name="" id="" class="form-control" v-model="days">
                  <option value="">Choose Range</option>
                  <option value="3">Last 3 days</option>
                  <option value="7">Last 7 days</option>
                  <option value="15">Last 15 days</option>
                  <option value="30">Last 30 days</option>
                </select>

                <select name="" id="" class="form-control" v-model="current_lead_status">
                  <option value="">Choose Status</option>
                  <option
                    v-for="lead_status in activeLeadStatuses"
                    :key="lead_status.id"
                    :value="lead_status.id"
                  >
                    {{ lead_status.status_name }}
                  </option>
                </select>
              </div>
              <div class="form-group mb-4">
                <input
                  v-model="query"
                  type="text"
                  class="form-control rounded-md border-gray-300 focus:ring-blue-500"
                  placeholder="Search by First or Last Name, Email, Phone"
                  style="position: relative"
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
                  v-if="isSearching"
                  @click="resetSearch"
                  class="block w-full cursor-pointer text-right text-blue-500"
                  >Clear</span
                >
              </div>
            </div>
            <div v-if="isAssign" class="col-span-12">
              <div>
                <section class="flex items-center space-x-2 font-bold">
                  <span class="badge badge-secondary badge-pill">
                    {{ totalSelected }}
                  </span>
                  <span>Selected</span>
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
                    id="exampleModal"
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
                            <button type="submit" class="btn btn-sm btn-info !text-blue-500">
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

            <div class="col-span-12">
              <div class="row">
                <div class="col-md-12 d-flex pb-2">
                  <div v-if="user && user.user_type == 'superAdmin'" class="text-right">
                    <a :href="baseURL + 'api/export-leads'" download="files.xlsx" type="button">
                      <button class="btn btn-secondary btn-rounded mb-2 mr-4 inline-flex">
                        Export Leads

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
                          class="feather feather-file-text"
                        >
                          <path
                            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                          ></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                      </button>
                    </a>
                  </div>

                  <div v-if="user && user.user_type == 'superAdmin'" class="text-right">
                    <router-link to="/import-leads">
                      <button class="btn btn-primary btn-rounded mb-2 mr-4 inline-flex">
                        Import Leads
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
                          class="feather feather-upload-cloud"
                        >
                          <polyline points="16 16 12 12 8 16"></polyline>
                          <line x1="12" y1="12" x2="12" y2="21"></line>
                          <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                          <polyline points="16 16 12 12 8 16"></polyline>
                        </svg>
                      </button>
                    </router-link>
                  </div>

                  <div v-if="user && user.user_type == 'superAdmin'" class="text-right">
                    <a :href="baseURL + 'api/export-institute'" download="files.xlsx" type="button">
                      <button class="btn btn-info btn-rounded mb-2 mr-4 inline-flex">
                        Export App Leads

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
                          class="feather feather-file-text"
                        >
                          <path
                            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                          ></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-span-12">
              <div id="tableSimple" class="col-lg-12 col-12 p-0">
                <div class="table-responsive">
                  <table id="manage_app_process" class="table-bordered mb-4 table">
                    <thead>
                      <tr>
                        <th
                          v-if="
                            (user && user.user_type == 'branchManager') ||
                            (user && user.user_type == 'counselor') ||
                            (user && user.user_type == 'superAdmin')
                          "
                          class="checkbox-column"
                        >
                          <input v-model="selectAll" type="checkbox" @click="select" />
                        </th>
                        <th></th>
                        <th>Lead Status</th>
                        <th>Unique ID</th>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Branch</th>
                        <th>Assigned Counselor</th>

                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <h3 v-if="leads.length == 0" class="mt-4">No Data Found</h3>
                      <template v-for="(lead, index) in leads" :key="lead.id">
                        <tr class="lead-row">
                          <td
                            v-if="
                              (user && user.user_type == 'branchManager') ||
                              (user && user.user_type == 'counselor') ||
                              (user && user.user_type == 'superAdmin')
                            "
                          >
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
                              v-if="lead.lead_status && lead.lead_status.id == 1"
                              class="badge badge-pill badge-sm bg-warning"
                              >{{ lead.lead_status && lead.lead_status.status_name }}</span
                            >
                            <span
                              v-else-if="lead.lead_status && lead.lead_status.id == 2"
                              class="badge badge-pill badge-sm bg-primary"
                              >{{ lead.lead_status && lead.lead_status.status_name }}</span
                            >
                            <span
                              v-else-if="lead.lead_status && lead.lead_status.id == 3"
                              class="badge badge-pill badge-sm bg-danger"
                              >{{ lead.lead_status && lead.lead_status.status_name }}</span
                            >
                            <span
                              v-else-if="lead.lead_status && lead.lead_status.id == 4"
                              class="badge badge-pill badge-sm bg-info"
                              >{{ lead.lead_status && lead.lead_status.status_name }}</span
                            >
                            <span
                              v-else-if="lead.lead_status && lead.lead_status.id == 5"
                              class="badge badge-pill badge-sm bg-success"
                              >{{ lead.lead_status && lead.lead_status.status_name }}</span
                            >
                            <span v-else class="badge badge-pill badge-sm bg-info">{{
                              lead.lead_status && lead.lead_status.status_name
                            }}</span>
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
                          <td style="position: relative" @click="openDrawer(lead.id)">
                            {{ lead.first_name }}
                            {{ lead.last_name }}
                            <span class="preview-lead" @click="openDrawer(lead.id)">
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
                          <td>
                            {{ lead.counselor && lead.counselor.counselor_name }}
                          </td>
                          <td class="flex items-center space-x-1">
                            <router-link
                              v-if="
                                (user && user.user_type === 'superAdmin') ||
                                (user.user_type === 'branchManager' &&
                                  lead.branch_id === user.branch_id) ||
                                lead.counselor_id === user.counselor_id
                              "
                              :to="{
                                name: 'Edit_Lead',
                                params: { id: lead.id },
                              }"
                            >
                              <FeatherEdit3Svg />
                            </router-link>

                            <span @click="LeadOpenModal(lead.id)">
                              <FeatherEyeSvg />
                            </span>
                            <span @click="LeadSendToEmail(lead.id)">
                              <span class="ml-2">
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
                                  class="feather feather-mail"
                                >
                                  <path
                                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                                  ></path>
                                  <polyline points="22,6 12,13 2,6"></polyline></svg
                                ><br />
                              </span>
                            </span>
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
                          <th>Lead Status</th>
                          <th style="text-align: center">Applicant Ready</th>
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
                          <td>
                            {{ lead.lead_status && lead.lead_status.status_name }}
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
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-4 flex justify-between">
            <span> showing {{ total_leads }} results </span>
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
                  v-if="isSearching"
                  v-model="page"
                  :links="paginationLinks"
                  @paginate="search"
                />
                <base-pagination
                  v-else-if="isMyBranch"
                  v-model="page"
                  :links="paginationLinks"
                  @paginate="myBranchLeads"
                />
                <base-pagination
                  v-else-if="isMyLeads"
                  v-model="page"
                  :links="paginationLinks"
                  @paginate="myLeads"
                />
                <base-pagination
                  v-else
                  v-model="page"
                  :links="paginationLinks"
                  @paginate="all_leads"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <lead-drawer
        :drawer-active="drawerActive"
        :drawerLoading="false"
        :lead-id="leadId"
        :theme-mode-data="themeModeData"
        @close-drawer="closeDrawer"
        @all_leads="all_leads"
      />
      <LeadDetailsModal :lead-modal-id="LeadOpenModalId" />
      <LeadsSendMailModal :lead-modal-id="LeadSendMailModalId" />
    </div>
  </div>
</template>
<script setup>
import { ref, computed, watch, defineAsyncComponent } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useDebounceFn, useClipboard, useDateFormat, useEventBus } from '@vueuse/core'
import { useEmitter } from '@/composables/useEmitter'
import Request from '../../apis/Request'
import Notify from '../../helpers/Notify'

const FeatherEyeSvg = defineAsyncComponent(() => import('@/svg/FeeatherEyeSvg.vue'))
const FeatherEdit3Svg = defineAsyncComponent(() => import('@/svg/FeatherEdit3Svg.vue'))
const LeadsSendMailModal = defineAsyncComponent(() =>
  import('@/components/leads/LeadsSendMailModal.vue')
)
const LeadDetailsModal = defineAsyncComponent(() =>
  import('@/components/leads/LeadsDetailsModal.vue')
)
const LeadDrawer = defineAsyncComponent(() => import('@/views/leads/LeadDrawer.vue'))

defineProps({
  themeModeData: {
    type: Boolean,
    required: true,
  },
})

const store = useStore()
const route = useRoute()
const user = computed(() => store.getters.user)
const leadAssignTrigger = computed(() => store.getters.leadAssignTrigger)
const baseURL = ref(store.state.baseURL)

const emitter = useEmitter()
const leadBus = useEventBus('lead')

const leads = ref([])
const activeLeadStatuses = ref([])
const current_lead_status = ref('')
const paginationLinks = ref([])
const errors = ref({})
const isLoading = ref(false)
const drawerLoading = ref(false)
const page = ref(route.query.page || 1)
const perPage = ref(10)
const total_leads = ref(0)
const leadId = ref('bhe')
const drawerActive = ref(false)
const selected = ref([])
const selectAll = ref(false)
const isAssign = ref(false)
const lazyLoadAssign = ref(false)
const selectItems = ref('')
const selected_counselor = ref('')
const counselors = ref([])
const isOpen = ref(-1)
const query = ref('')
const isAllLeads = ref(true)
const isMyBranch = ref(false)
const isMyLeads = ref(false)
const isSearching = ref(false)
const searchLoading = ref(false)
const isSelectBranch = ref(false)
const activeBranches = ref([])
const selected_a_branch = ref('')
const LeadOpenModalId = ref(0)
const LeadSendMailModalId = ref(0)
const days = ref('')

const totalSelected = computed(() => selectItems.value)
const isOpenIndex = computed(() => isOpen.value)

const all_leads = async () => {
  isMyBranch.value = false
  isSearching.value = false
  let branchId = user.value?.branch_id
  if (days.value) {
    try {
      const res = await Request.GET_REQ(
        `/all-leads/${branchId}?lead_status_id=${current_lead_status.value}&days=${days.value}&per_page=${perPage.value}&page=${page.value}`
      )
      leads.value = res.data.data
      total_leads.value = res.data.total
      paginationLinks.value = res.data.links
    } catch (err) {
      errors.value = err.res.data.errors
    }
  } else {
    try {
      const res = await Request.GET_REQ(
        `/all-leads/${branchId}?lead_status_id=${current_lead_status.value}&per_page=${perPage.value}&page=${page.value}`
      )
      leads.value = res.data.data
      total_leads.value = res.data.total
      paginationLinks.value = res.data.links
    } catch (err) {
      errors.value = err.res.data.errors
    }
  }
}

async function leadStatus() {
  try {
    const res = await Request.GET_REQ('/active-lead-status')
    activeLeadStatuses.value = res.data
  } catch (err) {
    Notify.error(err.message)
  }
}

function copyToClipBoard(value) {
  const { copy, copied } = useClipboard(value)
  if (!copied.value) {
    copy(value)
  }
}

async function myLeads() {
  isSearching.value = false
  isMyBranch.value = false
  isMyLeads.value = true
  if (days.value) {
    try {
      const res = await Request.GET_REQ(
        `/leads/me?lead_status_id=${current_lead_status.value}&days=${days.value}&per_page=${perPage.value}&page=${page.value}`
      )
      paginationLinks.value = res.data.links
      total_leads.value = res.data.total
      leads.value = res.data.data
    } catch (err) {
      errors.value = err.res.data.errors
    }
  } else {
    try {
      const res = await Request.GET_REQ(
        `/leads/me?lead_status_id=${current_lead_status.value}&per_page=${perPage.value}&page=${page.value}`
      )
      paginationLinks.value = res.data.links
      total_leads.value = res.data.total
      leads.value = res.data.data
    } catch (err) {
      errors.value = err.res.data.errors
    }
  }
}
const myBranchLeads = async () => {
  isAllLeads.value = false
  isMyLeads.value = false
  isSearching.value = false
  isMyBranch.value = true
  const branchId = user.value?.branch_id

  if (!days.value) {
    try {
      const res = await Request.GET_REQ(
        `/my-branch-leads/${branchId}?lead_status_id=${current_lead_status.value}&per_page=${perPage.value}&page=${page.value}`
      )
      paginationLinks.value = res.data.links
      total_leads.value = res.data.total
      leads.value = res.data.data
    } catch (err) {
      errors.value = err.res.data.errors
    }
  } else {
    try {
      const res = await Request.GET_REQ(
        `/my-branch-leads/${branchId}?lead_status_id=${current_lead_status.value}&days=${days.value}&per_page=${perPage.value}&page=${page.value}`
      )
      paginationLinks.value = res.data.links
      total_leads.value = res.data.total
      leads.value = res.data.data
    } catch (err) {
      errors.value = err.res.data.errors
    }
  }

  emitter.on('reload', async () => {
    await all_leads()
  })

  emitter.on('reloadLeadTb', async () => {
    await all_leads()
  })
}

const openDrawer = (lId) => {
  leadId.value = lId
  drawerActive.value = true
  drawerLoading.value = true
}
const closeDrawer = () => {
  drawerActive.value = false
}

const select = () => {
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
const selectSingle = (leadId) => {
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
const getCounselor = async () => {
  if (user.value && user.value.user_type === 'superAdmin') {
    try {
      const res = await Request.GET_REQ(`/active-counselor`)
      counselors.value = res.data
    } catch (err) {
      Notify(err.res.data)
    }
  }
  if (
    (user.value && user.value.user_type === 'branchManager') ||
    (user.value && user.value.user_type === 'counselor')
  ) {
    try {
      const res = await Request.GET_REQ(`/active-counselor/${user.value && user.value.branch_id}`)
      counselors.value = res.data
    } catch (err) {
      Notify(err.res.data)
    }
  }
}
const handleAssignSubmit = async () => {
  lazyLoadAssign.value = true
  const data = {
    leadIds: selected.value,
    counselorId: selected_counselor.value,
    branchId: selected_a_branch.value || user.value?.branch_id,
    assignById: user.value && user.value.id,
  }

  try {
    const res = await Request.POST_REQ(data, `/lead-assign-counselor`)
    if (res.status === 200) {
      $('#exampleModal').modal('hide')
      selected.value = []
      selectAll.value = false
      isAssign.value = false
      emitter.emit('reloadLead')
      lazyLoadAssign.value = false
      Notify.success(res.data)
      errors.value = {}
    } else {
      Notify(res.data)
    }
  } catch (err) {
    errors.value = err.response.data.errors
  }
}
const assigntoCounselor = () => {
  $('#exampleModal').modal('show')
}
const getActiveBranch = async () => {
  try {
    const res = await Request.GET_REQ(`/active-branches`)
    activeBranches.value = res.data
  } catch (err) {
    Notify(err.res.data)
  }
}

const counselorId = (event) => {
  let counselorId = event.target.value
  selected_counselor.value = counselorId
}
const activeBranchId = (branchId) => {
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
const toggle = (index) => {
  if (index == isOpen.value) {
    isOpen.value = -1
  } else {
    isOpen.value = index
  }
}
// searching leads
async function search() {
  const branchId = user.value && user.value?.branch_id
  const counselorId = user.value && user.value?.counselor_id
  isSearching.value = true
  if (isMyLeads.value) {
    if (days.value) {
      try {
        const res = await Request.GET_REQ(
          `/leads/search?q=${query.value}&lead_status_id=${current_lead_status.value}&branch_id=${branchId}&counselor_id=${counselorId}&days=${days.value}&per_page=${perPage.value}&page=${page.value}`
        )
        leads.value = res.data.data
        total_leads.value = res.data.total
        paginationLinks.value = res.data.links
      } catch (err) {
        errors.value = err.res.data.errors
      }
    } else {
      try {
        const res = await Request.GET_REQ(
          `/leads/search?q=${query.value}&lead_status_id=${current_lead_status.value}&branch_id=${branchId}&counselor_id=${counselorId}&per_page=${perPage.value}&page=${page.value}`
        )
        leads.value = res.data.data
        total_leads.value = res.data.total
        paginationLinks.value = res.data.links
      } catch (err) {
        errors.value = err.res.data.errors
      }
    }
  } else if (isMyBranch.value) {
    if (days.value) {
      try {
        const res = await Request.GET_REQ(
          `/leads/search?q=${query.value}&lead_status_id=${current_lead_status.value}&branch_id=${branchId}&days=${days.value}&per_page=${perPage.value}&page=${page.value}`
        )
        leads.value = res.data.data
        total_leads.value = res.data.total
        paginationLinks.value = res.data.links
      } catch (err) {
        errors.value = err.res.data.errors
      }
    } else {
      try {
        const res = await Request.GET_REQ(
          `/leads/search?q=${query.value}&lead_status_id=${current_lead_status.value}&branch_id=${branchId}&per_page=${perPage.value}&page=${page.value}`
        )
        leads.value = res.data.data
        total_leads.value = res.data.total
        paginationLinks.value = res.data.links
      } catch (err) {
        errors.value = err.res.data.errors
      }
    }
  } else {
    if (days.value) {
      try {
        const res = await Request.GET_REQ(
          `/leads/search?q=${query.value}&lead_status_id=${current_lead_status.value}&days=${days.value}&per_page=${perPage.value}&page=${page.value}`
        )
        leads.value = res.data.data
        total_leads.value = res.data.total
        paginationLinks.value = res.data.links
      } catch (err) {
        errors.value = err.res.data.errors
      }
    } else {
      try {
        const res = await Request.GET_REQ(
          `/leads/search?q=${query.value}&lead_status_id=${current_lead_status.value}&per_page=${perPage.value}&page=${page.value}`
        )
        leads.value = res.data.data
        total_leads.value = res.data.total
        paginationLinks.value = res.data.links
      } catch (err) {
        errors.value = err.res.data.errors
      }
    }
  }
}

function resetSearch() {
  query.value = ''
  days.value = ''
  current_lead_status.value = ''
  isSearching.value = false
  isMyBranch.value = false
  isMyLeads.value = false
}

const LeadOpenModal = (leadId) => {
  LeadOpenModalId.value = leadId
  $('#lead-view-detail').modal('show')
}
const LeadSendToEmail = (leadId) => {
  LeadSendMailModalId.value = leadId
  $('#lead-send-email').modal('show')
}

watch(leadAssignTrigger, async () => {
  if (user.value.user_type === 'counselor') {
    if (user.value.counselor_id === leadAssignTrigger.value.counselorId) {
      await all_leads()
    }
  }
})

watch(query, useDebounceFn(search, 300))
watch([days, current_lead_status, perPage], async () => {
  if (isSearching.value) {
    await search()
  } else if (isMyBranch.value) {
    await myBranchLeads()
  } else if (isMyLeads.value) {
    await myLeads()
  } else {
    await all_leads()
  }
})

const fetchPrimary = async () => {
  window.Echo.channel(`new-lead`).listen('NewLeadEvent', async () => {
    await all_leads()
  })
  isLoading.value = true
  await all_leads()
  await leadStatus()
  await getCounselor()
  await getActiveBranch()

  emitter.on('reloadLead', async () => {
    await all_leads()
  })
  leadBus.on(async (event) => {
    if (event == 'reload') {
      if (isSearching.value) {
        await search()
      } else if (isMyLeads.value) {
        await myLeads()
      } else if (isMyBranch.value) {
        await myBranchLeads()
      } else {
        await all_leads()
      }
    }
  })
}
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
.lead-row:hover .preview-lead {
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
</style>
