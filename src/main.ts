// @ts-ignore: allow side-effect import of CSS without type declarations
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import "./assets/main.css";
import App from "./App.vue";
import LandingPage from "./pages/LandingPage.vue";
import LoginPage from "./pages/auth/Login.vue";
import SignupPage from "./pages/auth/Signup.vue";
import DashboardPage from "./pages/Dashboard.vue";
import TicketsPage from "./pages/TicketsPage.vue";
import { isAuthenticated } from "./utils/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: LandingPage,
      name: "home",
    },
    {
      path: "/auth/login",
      component: LoginPage,
      name: "login",
    },
    {
      path: "/auth/signup",
      component: SignupPage,
      name: "signup",
    },
    {
      path: "/dashboard",
      component: DashboardPage,
      name: "dashboard",
      meta: { requiresAuth: true },
    },
    {
      path: "/tickets",
      component: TicketsPage,
      name: "tickets",
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: "login" });
  } else {
    next();
  }
});

const app = createApp(App);
app.use(router);
app.mount("#app");
