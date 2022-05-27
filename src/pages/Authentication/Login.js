import React, { Component } from "react";
import axios from "../../axios";
import {
  Row,
  Col,
  Button,
  Alert,
  Container,
  Label,
  Input,
  FormGroup,
} from "reactstrap";

import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Formik, Field, Form } from "formik";
import {forgotPasswordValidator,loginValidator} from '../../utils/validators'
import  CustomInput from '../../components/Input'
import {permsiions} from '../../statics/constants'

// Redux
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// actions
import { checkLogin, apiError } from "../../store/actions";

// import images
import Logo from '../../assets/images/logo.png'


const  Login =  (props) => {
  
  const {location:{pathname}} = props;

   const handleForget = async (values) =>  {
   
    try {
      let { data } = await axios.post("/admin/forgotPassword", {
        email: values.email,
        
      });
      console.log(data)

      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      
    } catch (error) {
      // alert("some error");
      
      toast.error(`Please Enter the correct Credentials`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      
    }
  }

  


  
  const  handleSubmit = async (values) =>  {
    
   
    try {
      let { data } = await axios.post("/admin/login", {
        email: values.email,
        password: values.password,
      });
      console.log(data);

      Cookies.set("admin_access_token", data.data.access_token, {
        expires: 365,
      });

      Cookies.set("email", JSON.stringify(data.data.email), {
        expires: 365,
      });
      
      props.history.push("/dashboard");
    } catch (error) {
      
      // alert("some error");
      toast.error(`Please Enter the correct Credentials`, {
        position: toast.POSITION.TOP_RIGHT,
      });

      console.log(error);
    }
  }

  

  

  
    return (
      <React.Fragment>
        <div className="home-btn d-none d-sm-block">
          <Link to="/">
            <i className="mdi mdi-home-variant h2 text-white"></i>
          </Link>
        </div>

        <div>
          <Container fluid className="p-0">
            <Row className="no-gutters">
              <Col lg={4}>
                <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                  <div className="w-100">
                    <Row className="justify-content-center">
                      <Col lg={9}>
                        <div>
                          <div className="text-center">
                            <div>
                              <Link to="/" className="logo">
                                {/*<div height="100">
                                  Haydii
                                </div>*/}
                              </Link>
                            </div>
                            {pathname == '/login'?(
                            <>      
                            <h4 className="font-size-18 mt-4">
                              Welcome Back !
                            </h4>
                            <p className="text-muted">
                              Sign in to continue to L&T.
                            </p>
                            </>):(
                              <>      
                              <h4 className="font-size-18 mt-4">
                                Forgot Password
                              </h4>
                             
                              </>
                            )}
                          </div>

                         
                          {pathname == '/login'? (
                          <>
                          <div className="p-2 mt-5">
                          <Formik
                            enableReinitialize
                            initialValues={{
                              email: '',
                            }}
                            validate={(values) => loginValidator(values)}
                            validateOnChange
                            onSubmit={handleSubmit}
                          >
                             {(formikBag) => {
                              return (
                                <Form>
                              <FormGroup className="auth-form-group-custom mb-4">
                                <i className="ri-user-2-line auti-custom-input-icon"></i>
                                <Label htmlFor="username">Email </Label>
                                <CustomInput
                                  type="email"
                                  name="email"
                                  placeholder="Email ID"
                                  margin="0 0 30px 0"
                                  value={formikBag.values.email}
                                  onChange={e => {
                                    
                                    
                                    formikBag.setFieldValue(
                                      "email",
                                      e.target.value
                                    );
                                  }}
                                  error={
                                    formikBag.touched.email &&
                                    formikBag.errors.email
                                      ? formikBag.errors.email
                                      : null
                                  }
                                />
                              </FormGroup>

                              <FormGroup className="auth-form-group-custom mb-4">
                                <i className="ri-lock-2-line auti-custom-input-icon"></i>
                                <Label htmlFor="userpassword">Password</Label>
                                <CustomInput
                                  type="password"
                                  name="password"
                                  placeholder="Password"
                                  margin="0 0 30px 0"
                                  value={formikBag.values.password}
                                  onChange={e => {
                                    formikBag.setFieldValue(
                                      "password",
                                      e.target.value
                                    );
                                  }}
                                  error={
                                    formikBag.touched.password &&
                                    formikBag.errors.password
                                      ? formikBag.errors.password
                                      : null
                                  }
                                />
                              </FormGroup>

                              <div className="custom-control custom-checkbox">
                                <Input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="customControlInline"
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customControlInline"
                                >
                                  Remember me
                                </Label>
                              </div>

                              <div className="mt-4 text-center">
                                <Button
                                  color="primary"
                                  className="w-md waves-effect waves-light"
                                  type="submit"
                                >
                                  Log In
                                </Button>
                              </div>

                              <div className="mt-4 text-center">
                                <Link
                                  to="/forgot-password"
                                  className="text-muted"
                                >
                                  <i className="mdi mdi-lock mr-1"></i> Forgot
                                  your password?
                                </Link>
                              </div>
                              </Form>
                              );
                            }}
                            </Formik>
                          </div>
                            </>):(
                              <>
                              <Formik
                            enableReinitialize
                            initialValues={{
                              email: '',
                            }}
                            validate={(values) => forgotPasswordValidator(values)}
                            validateOnChange
                            onSubmit={handleForget}
                          >
                            {(formikBag) => {
                              return (
                                <Form>
                                  <Field name="email">
                              {({ field }) => (
                                <CustomInput
                                  {...field}
                                  type="email"
                                  name="email"
                                  placeholder="Email ID"
                                  margin="0 0 30px 0"
                                  value={formikBag.values.email}
                                  onChange={e => {
                                    
                                    
                                    formikBag.setFieldValue(
                                      "email",
                                      e.target.value
                                    );
                                  }}
                                  error={
                                    formikBag.touched.email &&
                                    formikBag.errors.email
                                      ? formikBag.errors.email
                                      : null
                                  }
                                />
                              )}
                            </Field>
                            <div className="mt-4 text-center">
                                <Button
                                  color="primary"
                                  className="w-md waves-effect waves-light"
                                  type="submit"
                                >
                                  Submit
                                </Button>
                                <div className="mt-4 text-center">
                                <Link
                                  to="/login"
                                  className="text-muted"
                                >
                                  Back to Login
                                </Link>
                              </div>
                              </div>
                                </Form>
                              );
                            }}
                            
                          </Formik>
                              </>
                            )}
                          <div className="mt-5 text-center">
                            {/* <p>Don't have an account ? <Link to="/register" className="font-weight-medium text-primary"> Register </Link> </p> */}
                            <p>© 2021 L&T.</p>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
              <Col lg={8}>
                <div className="authentication-bg">
                  <div className="bg-overlay"></div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  
}

const mapStatetoProps = (state) => {
  const { loginError } = state.Login;
  return { loginError };
};

export default withRouter(
  connect(mapStatetoProps, { checkLogin, apiError })(Login)
);
