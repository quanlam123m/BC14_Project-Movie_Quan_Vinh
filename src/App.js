import "./App.css";
import "./index.css";
import { createBrowserHistory } from "history";
import { Route, Switch, withRouter } from "react-router-dom";
import { renderRouteHome, renderRouteAdmin } from "./routes";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader";
import ScrollToTop from "./components/ScrollToTop";
// import { actTryLogin } from "./containers/Home/LoginPage/modules/actions";
import { actTryLogin } from "./containers/Admin/AuthPage/modules/actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const history = createBrowserHistory();

function App(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actTryLogin(props.history));
  }, []);

  return (
    <Suspense
      fallback={
        <>
          <Loader />
        </>
      }
    >
      <ScrollToTop />
      <Switch>
        {renderRouteHome()}
        {renderRouteAdmin()}

        <Route
          path="/auth"
          exact
          component={lazy(() => import("./containers/Admin/AuthPage"))}
        />

        <Route
          path="/login"
          exact
          component={lazy(() => import("./containers/Home/LoginPage"))}
        />
        <Route
          path="/signup"
          exact
          component={lazy(() => import("./containers/Home/SignUpPage"))}
        />
        <Route
          path=""
          component={lazy(() => import("./containers/PagesNotFound"))}
        />
      </Switch>
    </Suspense>
  );
}

export default withRouter(App);
