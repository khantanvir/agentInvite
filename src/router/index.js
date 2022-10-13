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