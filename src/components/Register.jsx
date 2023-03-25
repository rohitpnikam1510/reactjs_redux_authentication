import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate  } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { register } from "../actions/auth";

import './styles/style.css';

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

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const vContact = (value) => {
  const contactRegEx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  if (!contactRegEx.test(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid contact number.
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector(state => state.message);
  const { userList } = useSelector(state => state.auth);
  const { isLoggedIn } = useSelector(state => state.auth);
  console.log("userList");
  console.log(userList);
  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeContactNumber = (e) => {
    const contact = e.target.value;
    setContact(contact);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);
    console.log("Rohity");

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
        dispatch(register(username, email, contact, password, userList))
          .then(() => {
            setSuccessful(true);
          })
          .catch(() => {
            setSuccessful(false);
          });
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
              <h3>Sign Up</h3>
            </div>
            <div className="col-4 col-md-4 div-no-account">
              <span>Have an Account?<br />
                <a href="/">Sign In</a></span>
            </div>
          </div>

          <Form onSubmit={handleRegister} ref={form}>
            {!successful && (
              <React.Fragment>
                <div className="row row-2">
                  <div className="col-md-12">
                    <div className="mb-4">
                      <div className="form-group">
                        <label htmlFor="userName" className="form-label">Enter your username or email address</label>
                        <Input 
                          type="email" 
                          className="form-control form-control-lg" 
                          id="userName" 
                          placeholder="Username or email address"
                          name="email"
                          value={email}
                          onChange={onChangeEmail}
                          validations={[required, validEmail]}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-6">
                    <div className="mb-4">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput2" className="form-label">Username</label>
                        <Input 
                          type="text" 
                          className="form-control form-control-lg"
                          id="exampleFormControlInput2"
                          placeholder="User Name"
                          name="username"
                          value={username}
                          onChange={onChangeUsername}
                          validations={[required, vusername]}
                          />
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-6">
                    <div className="mb-4">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput3" className="form-label">Contact Number</label>
                        <Input
                          type="text"
                          className="form-control form-control-lg"
                          id="exampleFormControlInput3"
                          placeholder="Contact Number"
                          name="contact"
                          value={contact}
                          onChange={onChangeContactNumber}
                          validations={[required, vContact]}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-4">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInpu4" className="form-label">Enter Your Password</label>
                        <Input
                          type="password"
                          className="form-control form-control-lg"
                          id="exampleFormControlInpu4"
                          placeholder="Password"
                          name="password"
                          value={password}
                          onChange={onChangePassword}
                          validations={[required, vpassword]}
                          />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row row-4 mt-4">
                  <div className="col-md-12">
                    <div className="d-grid gap-2">
                      <button className="btn btn-primary btn-custom" type="submit">Sign up</button>
                    </div>
                  </div>
                </div>
              </React.Fragment> 
            )}
            {message && (
              <div className="form-group">
                <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>

        </div>
      </div>
      <div className="col-md-6 div-login-right">
        <img className="saly-1" src={Saly1} alt="" srcSet="" />
      </div>
    </div>
  );
};

export default Register;