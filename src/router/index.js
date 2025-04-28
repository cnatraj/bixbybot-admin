import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "@/lib/supabaseClient";
import { authRoutes } from "./authRoutes";
import { appRoutes } from "./appRoutes";

const router = createRouter({
  history: createWebHistory(),
  routes: [...authRoutes, ...appRoutes],
});

router.beforeEach(async (to, from, next) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !session) {
    next("/login");
  } else if (to.path === "/login" && session) {
    next("/");
  } else {
    next();
  }
});

export default router;
