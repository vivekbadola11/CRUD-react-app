import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Employee from './components/employee';
import { Router, Route, Switch } from "react-router-dom";
import AddEmployeeForm from './components/addEmployeeForm';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <div className="App">
      <div><h2>CRUD with React</h2></div>
        <Router history={history}>
          <div>
          <Switch>
            <Route exact path="/" component={Employee} />
            <Route  path="/addEmployee" component={AddEmployeeForm} />
            <Route  path="/editEmployee" component={AddEmployeeForm} />
            <Route  path="/viewEmployee" component={AddEmployeeForm} />     
          </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
