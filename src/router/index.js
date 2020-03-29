import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";

// Routes
import dashboard from "./dashboard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("user") == null) {
        next({ name: "Login" });
      } else {
        next({ name: "Dashboard" });
      }
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

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  // Check auth
  if (to.matched.some(record => record.meta.auth)) {
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
  const pageTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title).meta.title;
  if (pageTitle) document.title = `${pageTitle} | Hack for Good`;

  return next();
});

export default router;
