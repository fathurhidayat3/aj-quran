import React from "react";
import { Route, Redirect, BrowserRouter, Switch } from "react-router-dom";

import Header from "../components/Header/Header";

import App from "../components/App/App";
import Hafalan from "../components/Hafalan/Hafalan";

const ReactRouter = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <div>
          <Header />

          <Switch>
            <Route exact path="/quran/:any" component={App} />
            {/* <Route exact path="/quran/:any/:any" component={App} /> */}
            <Route exact path="/hafalan" component={Hafalan} />
            {/* <Route path="/pengaturan" component={Hafalan} /> */}

            <Redirect from="/" to="/quran/1" />
            <Redirect from="/quran" to="/quran/1" />
          </Switch>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default ReactRouter;
