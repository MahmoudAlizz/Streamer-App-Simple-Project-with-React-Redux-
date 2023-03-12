import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StreamCreate from "./streams/StreamCreate";
import StreamDelete from "./streams/StreamDelete";
import StreamEdit from "./streams/StreamEdit";
import StreamShow from "./streams/StreamShow";
import StreamList from "./streams/StreamList";
import Header from "./streams/Header";
import { connect } from "react-redux";

export const App = (props) => {
  const renderRoute = () => {
    if (props.isSignIn) {
      return (
        <>
          <Route path="/stream/new" element={<StreamCreate />} />
          <Route path="/stream/edit/:id" element={<StreamEdit />} />
          <Route path="/stream/delete/:id" element={<StreamDelete />} />
        </>
      );
    }
  };
  return (
    <Fragment>
      <BrowserRouter>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<StreamList />} />

            <Route path="/stream/show/:id" element={<StreamShow />} />

            {renderRoute()}
          </Routes>
        </div>
      </BrowserRouter>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({ isSignIn: state.auth.isSignedIn });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
