import { lazy } from "react";

import HomeTemplate from "../containers/Home";
import AdminTemplate from "../containers/Admin";
const routesHome = [
  {
    exact: true,
    path: "/",
    component: lazy(() => import("../containers/Home/HomePage")),
  },
  {
    exact: false,
    path: "/list-movie",
    component: lazy(() => import("../containers/Home/ListMoviePage")),
  },
  {
    exact: false,
    path: "/detail-movie/:id",
    component: lazy(() => import("../containers/Home/DetailMoviePage")),
  },
  {
    exact: false,
    path: "/booking/:id",
    component: lazy(() => import("../containers/Home/BookingTicketPage/")),
  },
  {
    exact: false,
    path: "/mypage",
    component: lazy(() => import("../containers/Home/MyPage/")),
  },
  {
    exact: false,
    path: "/list-cine",
    component: lazy(() => import("../containers/Home/ListCinePage")),
  },
  {
    exact: false,
    path: "/all-movie",
    component: lazy(() => import("../containers/Home/AllMoviePage")),
  },
  {
    exact: false,
    path: "/payment",
    component: lazy(() => import("../containers/Home/PaymentPage")),
  },
];
const routesAdmin = [
  {
    exact: false,
    path: "/dashboard",
    component: lazy(() => import("../containers/Admin/Dashboard")),
  },
  // {
  //   exact: false,
  //   path: "/dashboard/editfilm/:id",
  //   component: lazy(() => import("../containers/Admin/Film/EditFilm/EditFilm")),
  // },
  // {
  //   eaxct: false,
  //   path: "/dashboard/film",
  //   component: lazy(() => import("../containers/Admin/Film/film")),
  // },
  // {
  //   eaxct: false,
  //   path: "/dashboard/user",
  //   component: lazy(() => import("../containers/Admin/User")),
  // },
  // {
  //   eaxct: false,
  //   path: "/dashboard/adduser",
  //   component: lazy(() => import("../containers/Admin/User/AddUser")),
  // },
  // {
  //   eaxct: false,
  //   path: "/dashboard/show",
  //   component: lazy(() => import("../containers/Admin/Showtime")),
  // },
];

function renderRouteHome() {
  return routesHome.map((route, index) => {
    return (
      <HomeTemplate
        key={index}
        exact={route.exact}
        path={route.path}
        Component={route.component}
      />
    );
  });
}
function renderRouteAdmin() {
  return routesAdmin.map((route, index) => {
    return (
      <AdminTemplate
        key={index}
        exact={route.exact}
        path={route.path}
        Component={route.component}
      />
    );
  });
}

export { renderRouteHome, renderRouteAdmin };
