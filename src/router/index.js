import Notify from "@/helpers/Notify";
import { createRouter, createWebHistory } from "vue-router";


const requireAuthRole = (to, from, next) => {
  let user = localStorage.getItem("user");
      user = JSON.parse(user);
      if (user.user_type == 'superAdmin' || user.user_type == 'branchManager') {
        next();
      } else {
        next({
          path: "/dashboard",
          query: { redirect: to.fullPath }
        });
      }
};
const requireSuperAdminAuthRole = (to, from, next) => {
  let user = localStorage.getItem("user");
      user = JSON.parse(user);
      if (user.user_type == 'superAdmin') {
        next();
      } else {
        next({
          path: "/dashboard",
          query: { redirect: to.fullPath }
        });
      }
};
const counselorAuthRole = (to, from, next) => {
  let user = localStorage.getItem("user");
      user = JSON.parse(user);
      if ((user.user_type == 'superAdmin') || (user.user_type == 'branchManager') || (user.user_type == 'counselor')) {
        next();
      } else {
        next({
          path: "/dashboard",
          query: { redirect: to.fullPath }
        });
      }
};
const frontOffierAuthRole = (to, from, next) => {
  let user = localStorage.getItem("user");
      user = JSON.parse(user);
      if (user.user_type == 'superAdmin' || user.user_type == 'branchManager' || user.user_type == 'counselor' || user.user_type == 'frontOfficer') {
        next();
      } else {
        next({
          path: "/dashboard",
          query: { redirect: to.fullPath }
        });
      }
};

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/views/auth/Login.vue"),
    meta: { guestOnly: true },
    redirect: "/login",
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/auth/Register.vue"),
    meta: { guestOnly: true }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/auth/Login.vue"),
    meta: { guestOnly: true }
  },
  {
    path: "/agent/invite/:id?",
    name: "AgentInvite",
    component: () => import("@/views/InviteAgent/Invite.vue"),
    //meta: { guestOnly: true }
  },
  {
    path: "/counselor/invite/:id?",
    name: "CounselorInvite",
    component: () => import("@/views/InviteAgent/CounselorInvite.vue"),
    //meta: { guestOnly: true }
  },
  {
    path: "/dynamic/filed",
    name: "DynamicFiled",
    component: () => import("@/views/InviteAgent/FildeAdd.vue"),
    //meta: { guestOnly: true }
  },
  {
    path: "/agent/success",
    name: "AgentSuccess",
    component: () => import("@/views/InviteAgent/AgentSuccess.vue"),
    //meta: { guestOnly: true }
  },
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Dashboard.vue"),
    meta: { authOnly: true },
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    name: "Dashbaord",
    component: () => import("@/views/Dashboard.vue"),
    props: true,
    meta: { authOnly: true },
  },
  {
    path: "/add-branch",
    name: "AddBranch",
    component: () => import("@/views/branch/AddBranch.vue"),
    meta: { authOnly: true },
    beforeEnter: requireSuperAdminAuthRole
  },
  {
    path: "/branches",
    name: "Branches",
    component: () => import("@/views/branch/Branch.vue"),
    meta: { authOnly: true },
    beforeEnter: counselorAuthRole
  },
  {
    path: "/branches/:slug",
    name: "EditBranch",
    component: () => import("@/views/branch/EditBranch.vue"),
    props: true,
    meta: { authOnly: true },
    beforeEnter: requireAuthRole
  },
  {
    path: "/add-counselor",
    name: "Add_Counselor",
    component: () => import("@/views/counselor/AddCounselor.vue"),
    meta: { authOnly: true },
    beforeEnter: requireAuthRole
    
  },
  {
    path: "/counselors",
    name: "Counselors",
    component: () => import("@/views/counselor/Counselor.vue"),
    meta: { authOnly: true },
    beforeEnter: counselorAuthRole
  },
  {
    path: "/counselor/:slug",
    name: "EditCounselor",
    component: () => import("@/views/counselor/EditCounselor.vue"),
    props: true,
    meta: { authOnly: true },
    beforeEnter: counselorAuthRole
  },
  {
    path: "/add-country",
    name: "Add_Country",
    component: () => import("@/views/country/AddCountry.vue"),
    meta: { authOnly: true },
    beforeEnter: requireAuthRole
  },
  {
    path: "/country/:slug",
    name: "Edit_Country",
    props: true,
    component: () => import("@/views/country/EditCountry.vue"),
    meta: { authOnly: true },
    beforeEnter: requireAuthRole
  },
  {
    path: "/country-view/:slug",
    name: "View_Country",
    props: true,
    component: () => import("@/components/CountryDetails.vue"),
    meta: { authOnly: true },
    beforeEnter: requireAuthRole
  },

  {
    path: "/countries",
    name: "Countries",
    component: () => import("@/views/country/Countries.vue"),
    meta: { authOnly: true }
  },
  {
    path: "/add-institute",
    name: "Add_Institute",
    component: () => import("@/views/institute/AddInstitute.vue"),
    meta: { authOnly: true },
    beforeEnter: requireAuthRole
  },
  {
    path: "/institute/:id",
    name: "Edit_Institute",
    component: () => import("@/views/institute/EditInstitute.vue"),
    meta: { authOnly: true },
    beforeEnter: requireAuthRole
  },
  {
    path: "/view-institute/:id",
    name: "View_Institute",
    component: () => import("@/components/institutes/InstituteDetailsComponent.vue"),
    meta: { authOnly: true },
    // beforeEnter: requireAuthRole
  },
  {
    path: "/institute",
    name: "Institutes",
    component: () => import("@/views/institute/Institute.vue"),
    meta: { authOnly: true }
  },
  {
    path: "/categories",
    name: "Categories",
    component: () => import("@/views/category/Categories.vue"),
    meta: { authOnly: true }
  },
  {
    path: "/course-level",
    name: "CourseLevel",
    component: () => import("@/views/course-level/CourseLevel.vue"),
    meta: { authOnly: true }
  },
  {
    path: "/add-course",
    name: "Add_Course",
    component: () => import("@/views/courses/AddCourse.vue"),
    meta: { authOnly: true },
    beforeEnter: requireAuthRole
  },
  {
    path: "/course/:id",
    name: "Edit_Course",
    component: () => import("@/views/courses/EditCourse.vue"),
    meta: { authOnly: true },
    beforeEnter: requireAuthRole
  },
  {
    path: "/courses",
    name: "Courses",
    component: () => import("@/views/courses/Courses.vue"),
    meta: { authOnly: true },
    beforeEnter: frontOffierAuthRole
  },
  {
    path: "/lead-source",
    name: "Lead_Source",
    component: () => import("@/views/leads/LeadSource.vue"),
    meta: { authOnly: true },
    beforeEnter: requireAuthRole
  },
  {
    path: "/add-lead",
    name: "Add_Lead",
    component: () => import("@/views/leads/AddLead.vue"),
    meta: { authOnly: true },
    // beforeEnter: requireAuthRole
  },
  {
    path: "/leads",
    name: "Leads",
    component: () => import("@/views/leads/Leads.vue"),
    meta: { authOnly: true },
    beforeEnter: frontOffierAuthRole
    // beforeEnter: requireAuthRole
  },
  {
    path: "/agent-leads",
    name: "AgentLeads",
    component: () => import("@/views/leads/AgentLeads.vue"),
    meta: { authOnly: true },
    // beforeEnter: requireAuthRole
  },
  {
    path: "/application-leads",
    name: "Application_Leads",
   component: () => import("@/views/leads/ApplicationLeads.vue"),
    meta: { authOnly: true },
    // beforeEnter: requireAuthRole
  },
  {
    path: "/leads/:id",
    name: "Edit_Lead",
    component: () => import("@/views/leads/EditLead.vue"),
    meta: { authOnly: true },
    // beforeEnter: requireAuthRole
  },
  {
    path: "/email-leads/:id",
    name: "Send_Application_Email",
    component: () => import("@/views/leads/SendApplicationEmail.vue"),
    meta: { authOnly: true },
    beforeEnter: counselorAuthRole
  },
  {
    path: "/lead-status",
    name: "Lead_Status",
    component: () => import("@/views/lead-status/LeadStatus.vue"),
    meta: { authOnly: true },
    beforeEnter: requireAuthRole
  },
  {
    path: "/application-lead-info/:id",
    name: "Application_Lead_Info",
    component: () => import("@/views/leads/ApplicationLeadInfo.vue"),
    meta: { authOnly: true },
    beforeEnter: counselorAuthRole
  },
  {
    path: "/add-front-office",
    name: "Add_Front_Office",
    component: () => import("@/views/front-office/AddFrontOffice.vue"),
    meta: { authOnly: true },
    beforeEnter: requireAuthRole
  },
  {
    path: "/front-offices",
    name: "Front_Offices",
    component: () => import("@/views/front-office/FrontOffices.vue"),
    meta: { authOnly: true },
    beforeEnter: counselorAuthRole
  },
  {
    path: "/front-offices/:slug",
    name: "Edit_Front_Offices",
    component: () => import("@/views/front-office/EditFrontOffice.vue"),
    meta: { authOnly: true },
    beforeEnter: frontOffierAuthRole
  },
  {
    path: "/add-agent",
    name: "Add_Agent",
    component: () => import("@/views/agent/AddAgent.vue"),
    meta: { authOnly: true },
    beforeEnter: requireAuthRole
  },
  {
    path: "/agents",
    name: "Agents",
    component: () => import("@/views/agent/Agents.vue"),
    meta: { authOnly: true },
    beforeEnter: counselorAuthRole
  },
  {
    path: "/agents/:slug",
    name: "Edit_Agent",
    component: () => import("@/views/agent/EditAgent.vue"),
    meta: { authOnly: true },
    // beforeEnter: requireAuthRole
  },
  {
    path: "/change-password/:id",
    name: "Change_Password",
    component: () => import("@/components/ChangePassword.vue"),
    meta: { authOnly: true },
  },
  {
    path: "/hubspot-api",
    name: "Hubspot_API",
    component: () => import("@/components/HubspotAPI.vue"),
    meta: { authOnly: true },
    beforeEnter: requireSuperAdminAuthRole
  },

  {
    path: "/import-institute",
    name: "Import_Institute",
    component: () => import("@/components/import/InstituteImport.vue"),
    meta: { authOnly: true },
  },
  {
    path: "/import-courses",
    name: "Import_Courses",
    component: () => import("@/components/import/CoursesImport.vue"),
    meta: { authOnly: true },
  },
  {
    path: "/import-leads",
    name: "Import_Leads",
    component: () => import("@/components/import/LeadsImport.vue"),
    meta: { authOnly: true },
  },
  {
    path: "/chat",
    name: "Chat",
    component: () => import("@/views/chat/Chat.vue"),
    meta: { authOnly: true },
    beforeEnter: frontOffierAuthRole
  },
  {
    path: "/permission_denied",
    name: "Not_Permission",
    component: () => import("@/components/NotPermission.vue"),
    meta: { authOnly: true },
  },
  {
    path: "/find-course",
    name: "Find_Course",
    component: () => import("@/views/counselor/FindCourse.vue"),
    meta: { authOnly: true },
    beforeEnter: counselorAuthRole
  },

  { path: "/:pathMatch(.*)*", name: "NotFound", component: () => import("@/views/NotFound.vue"), },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// function isLoggedIn() {
//   let user = localStorage.getItem("user");
//   if (user && typeof user == "string") {
//     try {
//       user = JSON.parse(user);
//     } catch (err) {
//       Notify.error("Invalid user data");
//       localStorage.removeItem("user");
//       localStorage.setItem("user",JSON.stringify({}))
//       return false;
//     }
//   } else {
//     localStorage.removeItem("user");
//     localStorage.setItem("user", JSON.stringify({}));
//     return false;
//   }
  

//   return !!user?.auth;
// }

// router.beforeEach((to, from, next) => {
  
//   if (to.matched.some(record => record.meta.authOnly)) {
//     // this route requires auth, check if logged in
//     // if not, redirect to login page.
//     if (!isLoggedIn()) {
//       next({
//         path: "/login",
//         query: { redirect: to.fullPath }
//       });
//     } else {
//       next();
//     }
//   } else if (to.matched.some(record => record.meta.guestOnly)) {
//     // this route requires auth, check if logged in
//     // if not, redirect to login page.
//     if (isLoggedIn()) {
//       next({
//         path: "/dashboard",
//         query: { redirect: to.fullPath }
//       });
//     } else {
//       next();
//     }
//   } else {
//     next(); // make sure to always call next()!
//   }
// });


// superAdmin_branchManger();

export default router;