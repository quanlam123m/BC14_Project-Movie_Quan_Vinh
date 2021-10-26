import React from "react";
import { Route, Redirect } from "react-router-dom";
import Sidebar from "./_component/sidebar";
function LayoutAdmin(props) {
  return (
    <>
      <Sidebar />
      {props.children}
    </>
  );
}

export default function AdminTemplate({ Component, ...props }) {
  return (
    <Route
      {...props}
      render={(propsRoute) => {
        if (localStorage.getItem("UserAdmin")) {
          return (
            <LayoutAdmin>
              <Component {...propsRoute} />
            </LayoutAdmin>
          );
        }
        return <Redirect to="/auth" />;
      }}
    />
  );
}
