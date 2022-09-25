<template>
  <div
    id="course-compare-modal"
    class="modal fade bd-example-modal-xl"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myExtraLargeModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="myExtraLargeModalLabel" class="modal-title">Compare Courses</h5>
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
        <div class="modal-body" v-if="courses.length">
          <div class="row">
            <div
              v-for="course in courses"
              :key="course.id"
              :class="courses.length == 2 ? 'col-6' : 'col-4'"
            >
              <div class="course-wrapper">
                <div class="items course-item">
                  <h6>{{ course.course_name }}</h6>
                  <span style="color: #fff; cursor: pointer" @click="removeCourseItem(course.id)">
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
                      class="feather feather-x-octagon"
                    >
                      <polygon
                        points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"
                      ></polygon>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                      <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                  </span>
                </div>
                <div class="items d-flex align-items-center">
                  <img
                    v-if="course.institute && course.institute.institute_logo"
                    :src="baseURL + course.institute.institute_logo"
                    class="uni-logo"
                    alt="..."
                    width="80"
                  />
                  <img v-else src="@/assets/img/no-image.png" class="" alt="..." width="80" />
                  <h6>
                    {{ course.institute && course.institute.institute_name }}
                  </h6>
                </div>
                <div class="items">
                  <div class="col-12 text-center">
                    <span class="compare-title">Course Category </span>
                  </div>
                  <div class="compare-content">
                    <p>
                      {{ course.category && course.category.category_name }}
                    </p>
                  </div>
                </div>
                <div class="items">
                  <div class="col-12 text-center">
                    <span class="compare-title">Course Level</span>
                  </div>
                  <div class="compare-content">
                    <p>
                      {{ course.course_level && course.course_level.course_level_name }}
                    </p>
                  </div>
                </div>

                <div class="items">
                  <div class="col-12 text-center">
                    <span class="compare-title">Course Duration</span>
                  </div>
                  <div class="compare-content">
                    <p>
                      {{ course.course_duration }}
                    </p>
                  </div>
                </div>

                <div class="items">
                  <div class="col-12 text-center">
                    <span class="compare-title">Course Fee</span>
                  </div>
                  <div class="compare-content">
                    <p>
                      {{ course.course_fee }}
                    </p>
                  </div>
                </div>

                <div class="items">
                  <div class="col-12 text-center">
                    <span class="compare-title">Course Intake</span>
                  </div>
                  <div class="compare-content">
                    <p>
                      {{ course.course_intake }}
                    </p>
                  </div>
                </div>

                <div class="items">
                  <div class="col-12 text-center">
                    <span class="compare-title">Campus Name</span>
                  </div>
                  <div class="compare-content">
                    <p>
                      {{ course && course.campus_name }}
                    </p>
                  </div>
                </div>

                <div class="items">
                  <div class="col-12 text-center">
                    <span class="compare-title">Langueage Mendatory</span>
                  </div>
                  <div class="compare-content">
                    <p>
                      {{ course.is_lang_mendatory }}
                    </p>
                  </div>
                </div>

                <div class="items">
                  <div class="col-12 text-center">
                    <span class="compare-title">Part time work deatails</span>
                  </div>
                  <div class="compare-content">
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
                            <p
                              v-if="course.per_time_work_details"
                              class=""
                              style="text-align: justify"
                            >
                              {{ course.per_time_work_details }}
                            </p>
                            <p v-else>No Content</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="items">
                  <div class="col-12 text-center">
                    <span class="compare-title">Awarding Body</span>
                  </div>
                  <div class="compare-content">
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
                </div>

                <div class="items">
                  <div class="col-12 text-center">
                    <span class="compare-title">Course Benifits</span>
                  </div>
                  <div class="compare-content">
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

                <div class="items">
                  <div class="col-12 text-center">
                    <span class="compare-title">General Eligibility</span>
                  </div>
                  <div class="compare-content">
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
                            <p
                              v-if="course.general_eligibility"
                              class=""
                              style="text-align: justify"
                            >
                              {{ course.general_eligibility }}
                            </p>
                            <p v-else>No Content</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="items">
                  <div class="col-12 text-center">
                    <span class="compare-title">Language Requirements</span>
                  </div>
                  <div class="compare-content">
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
                            <p v-if="course.lang_requirements" class="" style="text-align: justify">
                              {{ course.lang_requirements }}
                            </p>
                            <p v-else>No Content</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="items">
                  <div class="col-12 text-center">
                    <span class="compare-title">Key Modules</span>
                  </div>
                  <div class="compare-content">
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
                </div>

                <div class="items">
                  <div class="col-12 text-center">
                    <span class="compare-title">Additional Information</span>
                  </div>
                  <div class="compare-content">
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

                <div class="items">
                  <div class="col-12 text-center">
                    <span class="compare-title">Course Prospectus</span>
                  </div>
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

                <div class="items">
                  <div class="col-12 text-center">
                    <span class="compare-title">Course Module</span>
                  </div>
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

                <div class="items">
                  <div class="col-12 text-center">
                    <span class="compare-title">Course Additional Files</span>
                  </div>
                  <div class="compare-content">
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
                              <div v-if="course.additional_files?.length > 0">
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
            </div>
          </div>
        </div>
        <div class="modal-body" v-else>
          <p class="text-center text-xl md:text-2xl">No courses to compare!</p>
        </div>
        <div class="modal-footer">
          <button class="btn !border-orange-500" data-dismiss="modal">
            <i class="flaticon-cancel-12"></i> Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import FeatherFileTextSvg from '@/svg/FeatherFileTextSvg.vue'

defineProps({
  courses: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['removeCourse'])

function removeCourseItem(courseId) {
  emit('removeCourse', courseId)
}
</script>

<style>
body.dark .course-wrapper {
  border: 1px solid #191e3a;
  margin-bottom: 10px;
}
.course-wrapper {
  border: 1px solid #e0e6ed;
  margin-bottom: 10px;
  border-top-left-radius: 15px;
  overflow: hidden;
  border-top-right-radius: 15px;
}
img.uni-logo {
  border-radius: 50%;
  padding: 10px;
}
.items {
  border-bottom: 1px solid #e0e6ed;
  padding: 0 5px;
  text-align: center;
}
body.dark .items {
  border-bottom: 1px solid #191e3a;
}
.items.course-item {
  background: #2196f3;
  min-height: 60px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  justify-content: space-between;
}
.compare-title {
  position: relative;
  z-index: 30;
  color: #fff;
  background: #2196f3;
  padding: 0 7px;
  font-size: 12px;
}
.compare-title:before {
  color: #fff;
  border-bottom: 18px solid #2196f3;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  height: 0;
  width: auto;
  position: absolute;
  content: '';
  left: -7px;
}
.compare-title:after {
  color: #fff;
  border-bottom: 18px solid #2196f3;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  height: 0;
  width: auto;
  position: absolute;
  content: '';
  right: -7px;
}
.compare-content {
  padding: 10px 0;
}
.compare-content p:before {
  position: absolute;
  content: '';
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #2196f3;
  left: -15px;
  top: 7px;
}

.compare-content p {
  position: relative;
  display: inline-block;
}
.items.course-item h6 {
  color: #fff !important;
}
.key-modules-wrap {
  border-bottom: 1px solid #e0e6ed;
  padding: 10px 0;
}
body.dark .key-modules-wrap {
  border-bottom: 1px solid #191e3a;
}
</style>
