import React from "react";
import "./App.css";
import AddCourse from "./components/addCourse";
import Home from "./components/home";
import { Route, Switch } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <h1 style={{ textAlign: "center" }}>Instructor</h1>

        <Switch>
          <Route path="/" component={Home} exact></Route>
          <Route path="/add" component={AddCourse} exact></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
