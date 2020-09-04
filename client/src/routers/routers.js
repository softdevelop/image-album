import React from "react";
import {  
  Switch,
  Route,
} from "react-router-dom";
import { Demo } from '../screens/DEMO'


const Routers = () => {
  return (
    <Switch>
      <Route path="/demo" component={Demo} />

      <Route path="/users" />

      <Route path="/" />

    </Switch>
  )
}

export default Routers