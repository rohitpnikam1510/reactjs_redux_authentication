import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate  } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { login } from "../actions/auth";

import './styles/style.css';

import search from "../images/search.png";
import facebook from "../images/facebook.png";
import apple from "../images/apple.png";
import Saly1 from "../images/Saly-1.png";
import Saly2 from "../images/Saly-2.png";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector(state => state.auth);
  const { userList } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(username, password, userList))
        .then(() => {
          navigate("/profile");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  }

  return (

    <div className="row row-login">
        <div className="col-md-6 div-login-left">
            <h4>Your Logo</h4>
            <img className="saly-2" src={Saly2} alt="" srcSet="" />
            <div className="div-login-form-container">
                <div className="row row-1 mb-4">
                    <div className="col-8 col-md-8 div-welcome">
                        <span>Welcome to <span className="orangeColor">Lorem</span></span>
                        <h3>Sign In</h3>
                    </div>
                    <div className="col-4 col-md-4 div-no-account">
                        <span>No Account?<br />
                        <a href="/register">Sign Up</a></span>
                    </div>
                </div>

                <Form onSubmit={handleLogin} ref={form}>
                  <div className="row row-2">
                      <div className="col-md-12">
                          <div className="mb-4">
                              <div className="form-group">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Enter your username or email address</label>
                                <Input 
                                  type="text"
                                  className="form-control form-control-lg"
                                  id="exampleFormControlInput1"
                                  placeholder="Username or email address"
                                  name="username"
                                  value={username}
                                  onChange={onChangeUsername}
                                  validations={[required]}
                                />
                              </div>
                          </div>
                          <div className="mb-3">
                            <div className="form-group">
                              <label htmlFor="exampleFormControlInput2" className="form-label">Enter your Password</label>
                              <Input
                                type="password"
                                className="form-control form-control-lg"
                                id="exampleFormControlInput2"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={onChangePassword}
                                validations={[required]}
                                />
                            </div>
                          </div>
                      </div>
                  </div>

                  <div className="row row-3">
                      <div className="col-md-12 text-end forgot-password">
                          <a href="http://" target="_blank" rel="noopener noreferrer">Forgot Password</a>
                      </div>
                  </div>

                  <div className="row row-4 mt-4">
                      <div className="col-md-12">
                          <div className="d-grid gap-2">
                              <button className="btn btn-primary btn-custom" type="submit" disabled={loading}>
                                {loading && (
                                  <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Sign In</span>
                              </button>
                          </div>
                      </div>
                  </div>

                  {message && (
                    <div className="form-group">
                      <div className="alert alert-danger" role="alert">
                        {message}
                      </div>
                    </div>
                  )}
                  <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>

                <div className="row row-5 mt-4 mb-4">
                    <div className="col-md-12 text-center">
                        <span>OR</span>
                    </div>
                </div>

                <div className="row row-6">
                    <div className="col-8 col-md-8">
                        <div className="d-grid gap-2">
                            <button className="btn btn-primary btn-google" type="button"><img src={search} alt="" srcSet="" /> Sign in with Google</button>
                        </div>
                    </div>
                    <div className="col-2 col-md-2">
                        <div className="d-grid gap-2">
                            <button className="btn btn-primary btn-fb" type="button"><img src={facebook} alt="" srcSet="" /></button>
                        </div>
                    </div>
                    <div className="col-2 col-md-2">
                        <div className="d-grid gap-2">
                            <button className="btn btn-primary btn-apple" type="button"><img src={apple} alt="" srcSet="" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-md-6 div-login-right">
            <img className="saly-1" src={Saly1} alt="" srcSet="" />
        </div>
    </div>

  );
};

export default Login;