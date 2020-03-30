import DashboardHome from "../views/dashboard/Home";
import Requests from "../views/dashboard/Requests";
import ViewRequest from "../views/dashboard/ViewRequest";

export default [
  {
    path: "",
    name: "DashboardHome",
    component: DashboardHome
  },
  {
    path: "requests",
    name: "Requests",
    component: Requests,
    meta: {
      title: "Validação de Cadastros"
    }
  },
  {
    path: "requests/:id",
    name: "ViewRequest",
    component: ViewRequest,
    meta: {
      title: "Cadastro"
    }
  }
];
