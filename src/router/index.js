import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";

// Import routes
import dashboard from "./dashboard";

Vue.use(VueRouter);

// Main routes
const routes = [
  {
    path: "/",
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("user") == null) {
        return next({ path: "/login" });
      }
      return next({ path: "/dashboard" });
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login"
    }
  },
  {
    path: "/logout",
    meta: {
      title: "Desconectando..."
    },
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("user")) {
        Vue.toasted.show("Desconectado com sucesso");
        localStorage.removeItem("user");
      }
      return next({ path: "/login" });
    }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      title: "Painel Administrativo",
      auth: true
    },
    children: dashboard
  }
];

// VueRouter instance
const router = new VueRouter({
  routes
});

// Router before each
router.beforeEach((to, from, next) => {
  // Check for auth required
  if (to.matched.some(record => record.meta && record.meta.auth)) {
    // Authenticate
    if (!localStorage.getItem("user")) {
      Vue.toasted.show("Você precisa entrar para continuar", {
        icon: "mdi-alert-circle-outline",
        action: false,
        duration: 2000
      });
      return next({
        path: "/login",
        params: { nextUrl: to.fullPath }
      });
    }
  }

  // Set page title
  const pageWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title);
  if (pageWithTitle)
    document.title = `${pageWithTitle.meta.title} | Hack for Good`;

  // Transition name
  const lastToRoute = to.matched.slice().reverse()[0];
  if (lastToRoute) {
    lastToRoute.meta.transitionName = "scroll-y-transition";
    if (from.matched.length) {
      const lastFromRoute = from.matched.slice().reverse()[0];
      const toPathLength = lastToRoute.path.split("/").filter(s => s).length;
      const fromPathLength = lastFromRoute.path.split("/").filter(s => s)
        .length;

      if (fromPathLength > toPathLength) {
        lastToRoute.meta.transitionName = "scroll-y-reverse-transition";
      }
    }
  }

  // Continue
  return next();
});

export default router;
