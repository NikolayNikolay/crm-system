import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import record from "@/store/record";

const routes = [
  {
    path: "/login",
    name: "login",
    meta: { layout: "Empty" },
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/categories",
    name: "categories",
    meta: { layout: "Main", auth: true },
    component: () => import("../views/Categories.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: { layout: "Empty" },
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/record",
    name: "record",
    meta: { layout: "Main", auth: true },
    component: () => import("../views/Record.vue"),
  },
  {
    path: "/planning",
    name: "planning",
    meta: { layout: "Main", auth: true },
    component: () => import("../views/Planning.vue"),
  },
  {
    path: "/",
    name: "houme",
    meta: { layout: "Main", auth: true },
    component: () => import("../views/Houme.vue"),
  },
  {
    path: "/history",
    name: "history",
    meta: { layout: "Main", auth: true },
    component: () => import("../views/History.vue"),
  },
  {
    path: "/detail/:id",
    name: "detail",
    meta: { layout: "Main", auth: true },
    component: () => import("../views/DetailRecord.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some((record) => record.meta.auth);
  onAuthStateChanged(getAuth(), (user) => {
    if (requireAuth && !user) {
      next("/login?message=login");
    } else {
      next();
    }
  });
});

export default router;
