export const authRoutes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Auth/Login.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Auth/Register.vue"),
    meta: { requiresAuth: false },
  },
];
