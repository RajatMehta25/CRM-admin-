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
        // if (!token) {
        //   return (
        //     <Redirect
        //       to={{ pathname: "/login", state: { from: props.location } }}
        //     />
        //   );
        // }
        

        return (
          <Layout>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
};


export const PrivateRoute = ({
  disableLayout,
  enableUserDetails,
  layout: Layout,
  component: Component,
  customClass,
  ...rest
}) => {

  

  const token = Cookies.get("admin_access_token");

  
  if (token) {
    
      return (
        <Route
      {...rest}
      render={(props) => {
       
        return (
          <Layout>
            <Component {...props} />
          </Layout>
        );
      }}
    />
      );
    
  } else {
    return <Redirect to="/login" />;
  }
};


export const PublicOnlyRoute = ({ component: Component, ...rest }) => {
  const token = Cookies.get("admin_access_token");
  if (token) {
    return <Redirect to="/dashboard" />
  } else{
    return <Route {...rest} render={props => <Component {...props} />} />;
  }
};
    
export default AppRoute;
