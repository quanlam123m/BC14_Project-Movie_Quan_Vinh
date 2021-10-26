import React from "react";
import { Route } from "react-router-dom";
import HeaderComponent from "./_component/Header";
import Footer from "./_component/Footer";

function LayoutHome(props) {
  return (
    <>
      <HeaderComponent />
      {props.children}
      <Footer />
    </>
  );
}

export default function HomeTemplate(props) {
  const { exact, path, Component } = props;
  return (
    <LayoutHome>
      <Route exact={exact} path={path} component={Component} />
    </LayoutHome>
  );
}
