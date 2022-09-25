<template>
  <div
    id="view-course-detail"
    class="modal fade bd-example-modal-xl"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myExtraLargeModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="myExtraLargeModalLabel" class="modal-title">
            {{ course.course_name && course.course_name }}
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
          <div class="row">
            <div class="col">
              <label for="exampleFormControlInput1">Institute Name</label>
              <h6>
                {{ course.institute_limit && course.institute_limit.institute_name }}
              </h6>
            </div>

            <div class="col">
              <label for="exampleFormControlInput1">Course Name</label>
              <h6>{{ course.course_name && course.course_name }}</h6>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col">
              <p for="exampleFormControlInput1">Course Category</p>
              <label>
                {{ course.category && course.category.category_name }}
              </label>
            </div>

            <div class="col">
              <p for="exampleFormControlInput1">Course Level</p>
              <label>
                {{ course.course_level && course.course_level.course_level_name }}
              </label>
            </div>

            <div class="col">
              <p for="exampleFormControlInput1">Course Duration</p>
              <label>
                {{ course.course_duration }}
              </label>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col">
              <p for="exampleFormControlInput1">Course Fee</p>
              <label> {{ course.course_fee }} </label>
            </div>

            <div class="col">
              <p for="exampleFormControlInput1">Course Intake</p>
              <label>
                {{ course.course_intake }}
              </label>
            </div>

            <div class="col">
              <p for="exampleFormControlInput1">Campus Name</p>
              <label>
                {{ course && course.campus_name }}
              </label>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-4">
              <p for="exampleFormControlInput1">Langueage Mendatory</p>
              <label>
                {{ course.is_lang_mendatory }}
              </label>
            </div>

            <div class="col">
              <!-- <p for="exampleFormControlInput1">Part time work deatails</p> -->
              <div id="toggleAccordion">
                <div class="card">
                  <div id="headingOne1" class="card-header">
                    <section class="mb-0 mt-0">
                      <div
                        role="menu"
                        class="collapsed"
                        data-toggle="collapse"
                        :data-target="`#part-time-work-deatils-${course.id}`"
                        aria-expanded="true"
                        :aria-controls="`part-time-work-deatils-${course.id}`"
                      >
                        Part time work deatails
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
                    :id="`part-time-work-deatils-${course.id}`"
                    class="collapse"
                    aria-labelledby="headingOne1"
                    data-parent="#toggleAccordion"
                  >
                    <div class="card-body">
                      <p v-if="course.per_time_work_details" class="" style="text-align: justify">
                        {{ course.per_time_work_details }}
                      </p>
                      <p v-else>No Content</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-6">
              <div id="toggleAccordion">
                <div class="card">
                  <div id="headingOne1" class="card-header">
                    <section class="mb-0 mt-0">
                      <div
                        role="menu"
                        class="collapsed"
                        data-toggle="collapse"
                        :data-target="`#awarding-body-${course.id}`"
                        aria-expanded="true"
                        :aria-controls="`awarding-body-${course.id}`"
                      >
                        Awarding Body
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
                    :id="`awarding-body-${course.id}`"
                    class="collapse"
                    aria-labelledby="headingOne1"
                    data-parent="#toggleAccordion"
                  >
                    <div class="card-body">
                      <p v-if="course.awarding_body" class="" style="text-align: justify">
                        {{ course.awarding_body }}
                      </p>
                      <p v-else>No Content</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div id="toggleAccordion">
                <div class="card">
                  <div id="headingOne1" class="card-header">
                    <section class="mb-0 mt-0">
                      <div
                        role="menu"
                        class="collapsed"
                        data-toggle="collapse"
                        :data-target="`#defaultAccordion-${course.id}`"
                        aria-expanded="true"
                        :aria-controls="`defaultAccordion-${course.id}`"
                      >
                        Course Benifits
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
                    :id="`defaultAccordion-${course.id}`"
                    class="collapse"
                    aria-labelledby="headingOne1"
                    data-parent="#toggleAccordion"
                  >
                    <div class="card-body">
                      <p v-if="course.course_benifits" class="" style="text-align: justify">
                        {{ course.course_benifits }}
                      </p>
                      <p v-else>No Content</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-6">
              <div id="toggleAccordion">
                <div class="card">
                  <div id="headingOne1" class="card-header">
                    <section class="mb-0 mt-0">
                      <div
                        role="menu"
                        class="collapsed"
                        data-toggle="collapse"
                        :data-target="`#general-eligiblity-accordion-${course.id}`"
                        aria-expanded="true"
                        :aria-controls="`general-eligiblity-accordion-${course.id}`"
                      >
                        General Eligibility
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
                    :id="`general-eligiblity-accordion-${course.id}`"
                    class="collapse"
                    aria-labelledby="headingOne1"
                    data-parent="#toggleAccordion"
                  >
                    <div class="card-body">
                      <p v-if="course.general_eligibility" class="" style="text-align: justify">
                        {{ course.general_eligibility }}
                      </p>
                      <p v-else>No Content</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div id="toggleAccordion">
                <div class="card">
                  <div id="headingOne1" class="card-header">
                    <section class="mb-0 mt-0">
                      <div
                        role="menu"
                        class="collapsed"
                        data-toggle="collapse"
                        :data-target="`#lang-requirements-${course.id}`"
                        aria-expanded="true"
                        :aria-controls="`lang-requirements-${course.id}`"
                      >
                        Language Requirements
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
                    :id="`lang-requirements-${course.id}`"
                    class="collapse"
                    aria-labelledby="headingOne1"
                    data-parent="#toggleAccordion"
                  >
                    <div class="card-body">
                      <div v-if="course.lang_requirements">
                        <!-- eslint-disable vue/no-v-html -->
                        <p
                          style="text-align: justify"
                          v-html="course.lang_requirements && course.lang_requirements"
                        ></p>
                      </div>
                      <div v-else>
                        <p>No Content</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-6">
              <div id="toggleAccordion">
                <div class="card">
                  <div id="headingOne1" class="card-header">
                    <section class="mb-0 mt-0">
                      <div
                        role="menu"
                        class="collapsed"
                        data-toggle="collapse"
                        :data-target="`#key-modules-${course.id}`"
                        aria-expanded="true"
                        :aria-controls="`key-modules-${course.id}`"
                      >
                        Key Modules
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
                    :id="`key-modules-${course.id}`"
                    class="collapse"
                    aria-labelledby="headingOne1"
                    data-parent="#toggleAccordion"
                  >
                    <div class="card-body">
                      <div
                        v-if="course.key_modules && course.key_modules"
                        class=""
                        style="text-align: justify"
                      >
                        <div
                          v-for="key_module in course.key_modules"
                          :key="key_module.id"
                          class="key-modules-wrap"
                        >
                          <strong>{{ key_module.module_title }}</strong>
                          <article>
                            {{ key_module.module_description }}
                          </article>
                        </div>
                      </div>
                      <div v-else>No Content</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div id="toggleAccordion">
                <div class="card">
                  <div id="headingOne1" class="card-header">
                    <section class="mb-0 mt-0">
                      <div
                        role="menu"
                        class="collapsed"
                        data-toggle="collapse"
                        :data-target="`#additional-infos-${course.id}`"
                        aria-expanded="true"
                        :aria-controls="`additional-infos-${course.id}`"
                      >
                        Additional Information
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
                    :id="`additional-infos-${course.id}`"
                    class="collapse"
                    aria-labelledby="headingOne1"
                    data-parent="#toggleAccordion"
                  >
                    <div class="card-body">
                      <div
                        v-if="course.course_additional_infos"
                        class=""
                        style="text-align: justify"
                      >
                        <div
                          v-for="courseAddtionalInfo in course.course_additional_infos"
                          :key="courseAddtionalInfo.id"
                          class="key-modules-wrap"
                        >
                          <article>
                            {{ courseAddtionalInfo.course_additional_infos }}
                          </article>
                        </div>
                      </div>
                      <div v-else>No Content</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-4">
              <p for="exampleFormControlInput1">Course Prospectus</p>
              <div class="compare-content">
                <div v-if="course.course_prospectus">
                  <a
                    :href="baseURL + course.course_prospectus"
                    download
                    target="_blank"
                    style="display: block"
                    ><FeatherFileTextSvg /> Download Prospectus</a
                  >
                </div>
                <div v-else>No File</div>
              </div>
            </div>

            <div class="col-4">
              <p for="exampleFormControlInput1">Course Module</p>
              <div class="compare-content">
                <div v-if="course.course_module_pdf">
                  <a
                    :href="baseURL + course.course_module_pdf"
                    download
                    target="_blank"
                    style="display: block"
                    ><FeatherFileTextSvg /> Download Course Module</a
                  >
                </div>
                <div v-else>No File</div>
              </div>
            </div>

            <div class="col-4">
              <div id="toggleAccordion">
                <div class="card">
                  <div id="headingOne1" class="card-header">
                    <section class="mb-0 mt-0">
                      <div
                        role="menu"
                        class="collapsed"
                        data-toggle="collapse"
                        :data-target="`#coures-additional-files-${course.id}`"
                        aria-expanded="true"
                        :aria-controls="`coures-additional-files-${course.id}`"
                      >
                        Course Additional Files
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
                    :id="`coures-additional-files-${course.id}`"
                    class="collapse"
                    aria-labelledby="headingOne1"
                    data-parent="#toggleAccordion"
                  >
                    <div class="card-body">
                      <div class="compare-content">
                        <div v-if="course.additional_files && course.additional_files.length > 0">
                          <a
                            v-for="(file, index) in course.additional_files"
                            :key="file.id"
                            :href="baseURL + file.course_additional_files"
                            download
                            target="_blank"
                            style="display: block"
                            ><FeatherFileTextSvg /> Download File - {{ index + 1 }}</a
                          >
                        </div>
                        <div v-else>No File</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn" data-dismiss="modal"><i class="flaticon-cancel-12"></i> Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import FeatherFileTextSvg from '@/svg/FeatherFileTextSvg.vue'
import Request from '@/apis/Request'
import Notify from '../../helpers/Notify'
export default {
  name: 'CourseDeatailsModal',
  components: { FeatherFileTextSvg },
  props: {
    courseId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isLoading: '',
      course: '',
    }
  },
  computed: {
    ...mapGetters(['user', 'pendingStatus']),
    ...mapState(['baseURL']),
  },
  watch: {
    courseId() {
      this.isLoading = true
      Request.GET_REQ(`/course-detail/${this.courseId}`)
        .then((res) => {
          this.course = res.data
          this.isLoading = false
        })
        .catch((err) => {
          Notify(err.res.data)
        })
    },
  },
}
</script>

<style></style>
