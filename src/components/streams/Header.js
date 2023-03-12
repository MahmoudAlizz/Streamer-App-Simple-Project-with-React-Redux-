import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import { signOut } from "../../actions";
import SignIn from "../Auth/SignIn";
import NewAccount from "../Auth/NewAccount";

export const Header = (props) => {
  const renderIfSigned = () => {
    if (!props.isSignedIn) {
      return (
        <div className="">
          <button
            className="btn btn-outline-light ml-4"
            id="btnsignin"
            data-toggle="modal"
            data-target="#signin"
          >
            Sign In
          </button>
          <button
            className="btn btn-outline-light ml-4"
            id="btnsignup"
            data-toggle="modal"
            data-target="#newaccount"
          >
            New Account
          </button>
        </div>
      );
    } else {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link onActive" to="/stream/new">
              New Stream
            </Link>
          </li>
          {renderAccountInformation()}
        </>
      );
    }
  };
  const renderAccountInformation = () => {
    if (props.isSignedIn) {
      return (
        <Fragment>
          <li className="nav item  dropdown" style={{cursor:'pointer'}}>
            <div
              className="d-flex align-items-center"
              data-toggle="dropdown"
              data-target="#dropdown1"
            >
              <i
                className=" fa fa-duotone fa-user fa-xg text-white mx-2"
                style={{ fontSize: "23px" }}
              ></i>
              <p className="text-white mb-0 ">{props.UserName}</p>
            </div>
            <div className="dropdown-menu" id="dropdown1">
              <a
                href="/"
                className=" dropdown-item"
                id="btnsignout"
                onClick={() => {
                  props.signOut();
                }}
              >
                Sign Out
              </a>
            </div>
          </li>
        </Fragment>
      );
    }
  };
  return (
    <Fragment>
      <SignIn />
      <NewAccount />
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">
            STREAMER
          </Link>
          <div
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navMain"
          >
            <span className="navbar-toggler-icon"></span>
          </div>
          <div className="collapse navbar-collapse " id="navMain">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link onActive" to="/">
                  All Stream
                </Link>
              </li>
              {renderIfSigned()}
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn, UserName: state.auth.userName };
};

const mapDispatchToProps = { signOut };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
