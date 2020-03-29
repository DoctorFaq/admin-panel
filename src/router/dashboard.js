import DashboardHome from "../views/dashboard/Home";
import Requests from "../views/dashboard/Requests";

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
  }
];
