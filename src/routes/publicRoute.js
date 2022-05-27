import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

const AppRoute = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => {
  const token = Cookies.get("admin_access_token");

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthProtected && !token) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }

        return (
          <Layout>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
};

export default AppRoute;
