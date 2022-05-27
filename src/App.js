import React from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { API_URL } from "./statics/constants";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import Routes
import { authProtectedRoutes, publicRoutes } from "./routes/";
import AppRoute,{PrivateRoute,PublicOnlyRoute} from "./routes/route";

// layouts
import VerticalLayout from "./components/VerticalLayout/";
import HorizontalLayout from "./components/HorizontalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";

// Import scss
import "./theme.scss";





const App = (props) => {


  const prmessions = ['user']
  /**
   * Returns the layout
   */
  axios.defaults.baseURL = API_URL;
  const getLayout = () => {
    let layoutCls = VerticalLayout;

    switch (props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout;
        break;
      default:
        layoutCls = VerticalLayout;
        break;
    }
    return layoutCls;
  };
  const Layout = getLayout();

  return (
    <React.Fragment>
      <Router basename="/adminPanel">
        <Switch>
          {publicRoutes.map((route, idx) => (
            <PublicOnlyRoute
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
            />
          ))}

          {authProtectedRoutes.map((route, idx) => (
            <PrivateRoute
              path={route.path}
              layout={Layout}
              component={route.component}
              key={idx}
              isAuthProtected={true}
            />
          ))}
        </Switch>
      </Router>
      <ToastContainer />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    layout: state.Layout,
  };
};

export default connect(mapStateToProps, null)(App);
