import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import { logout } from "../actions/auth";  

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container-fluid">
      <div className="row row-profile">
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Your Logo
          </Link>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
            </div>
          )}
        </nav>
      </div>

      <div className="row">
        <div className="col-md-12">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Contact Number:</strong> {currentUser.contact}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        </div>
      </div>

    </div>
  );
};

export default Profile;