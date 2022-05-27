import React from "react";
import { Redirect } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import AuthLockScreen from "../pages/Authentication/AuthLockScreen";



// Dashboard
import Dashboard from "../pages/Dashboard/index";
import UserManagement from "../pages/UserManagement/UserManagement";
import AccountManagement from "../pages/AccountManagement/Account_Management";
import AccountDetails from "../pages/AccountManagement/Account_Details";
import changePassword from "../pages/Authentication/changePasword";



const authProtectedRoutes = [

	{ path: "/dashboard", component: Dashboard },
	
	//new routes
	{ path: "/user-managment", component: UserManagement },
	{ path: "/account-managment", component: AccountManagement },
	{ path: "/account-details", component: AccountDetails },
	{ path: "/changePassword", component: changePassword },
	{ path: "*", component: Dashboard },

	
	
	
	
	
	
];



const publicRoutes = [
	{ path: "/login", component: Login },
	{ path: "/forgot-password", component: ForgetPwd },
	{ path: "/register", component: Register },
	{ path: "/auth-lock-screen", component: AuthLockScreen },
	
	
];

export { authProtectedRoutes, publicRoutes };