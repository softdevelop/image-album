import React from "react";
import { Switch, Route } from "react-router-dom";
import { ImagePage } from "../screens/PHOTOS";

const Routers = () => {
  return (
    <Switch>
      <Route path="/" exact component={ImagePage} />
    </Switch>
  );
};

export default Routers;
