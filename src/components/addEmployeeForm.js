import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FormGroup, Button, FormControl, ControlLabel } from "react-bootstrap";
import * as employeeService from "../services/employeeService";

export default class AddEmployeeForm extends Component {
  isEditable = false;
  constructor(props, context) {
    super(props, context);
    this.state = {
      empName: '',
      empSalary: '',
      empAge: '',
      location: '',
      isFieldDisabled: true
    };
  }

  componentWillMount() {
    debugger;
    let location = this.props.history.location;
    if (location.pathname.indexOf("viewEmployee") != -1) {
      let stateData = location.state;
      this.setState({
        empId: stateData.id,
        empName: stateData.name,
        empSalary: stateData.salary,
        empAge: stateData.age,
        location: location.pathname,
        isFieldDisabled: true
      })
    }
    else if (location.pathname.indexOf("editEmployee") != -1) {
      let stateData = location.state;
      this.setState({
        empId: stateData.id,
        empName: stateData.name,
        empSalary: stateData.salary,
        empAge: stateData.age,
        location: location.pathname,
        isFieldDisabled: false
      })
    }
    else {
      this.setState({
        location: location.pathname,
        isFieldDisabled: false
      })
    }
  }

  render() {
    return (
      <form className="col-md-4">
        <FormGroup controlId="formBasicText">
          {/* validationState={} */}
          <ControlLabel>Employee Details</ControlLabel>

          {(this.state.location == "/editEmployee" || this.state.location == "/viewEmployee") ? <FormControl className="margin-bottom-15"
            type="text"
            value={this.state.empId}
            disabled
          /> : null}

          <FormControl className="margin-bottom-15"
            inputRef={ref => { this.empNameNode = ref; }}
            type="text"
            value={this.state.empName}
            placeholder="Enter Name"
            autoComplete="off"
            onChange={this.handleChange.bind(this, "Name")}
            onKeyUp={this.onkeyupHandler.bind(this, "Name")}
            disabled={this.state.isFieldDisabled}
          />
          <FormControl className="margin-bottom-15"
            inputRef={ref => { this.empSalaryNode = ref; }}
            type="text"
            value={this.state.empSalary}
            placeholder="Enter Salary"
            autoComplete="off"
            onChange={this.handleChange.bind(this, "Salary")}
            onKeyUp={this.onkeyupHandler.bind(this, "Salary")}
            disabled={this.state.isFieldDisabled}
          />
          <FormControl className="margin-bottom-15"
            inputRef={ref => { this.empAgeNode = ref; }}
            type="text"
            value={this.state.empAge}
            placeholder="Enter Age"
            autoComplete="off"
            onChange={this.handleChange.bind(this, "Age")}
            onKeyUp={this.onkeyupHandler.bind(this, "Age")}
            disabled={this.state.isFieldDisabled}
          />
        </FormGroup>

        {this.state.location == "/addEmployee" ? <Button ref={(button) => { this.saveButtonNode = ReactDOM.findDOMNode(button) }} bsStyle="success"
          onClick={this.saveHandler.bind(this)}>Save
        </Button> : null}
        {(this.state.location == "/editEmployee" || this.isEditable) ? <Button ref={(button) => { this.saveButtonNode = ReactDOM.findDOMNode(button) }} bsStyle="success"
          onClick={this.updateHandler.bind(this)}>Update
        </Button> : null}
        {(this.state.location == "/viewEmployee" && !this.isEditable) ? <Button ref={(button) => { this.saveButtonNode = ReactDOM.findDOMNode(button) }} bsStyle="primary"
          onClick={this.editHandler.bind(this)}>Edit
        </Button> : null}
      </form>
    )
  }

  saveHandler() {
    if (!(this.state.empName && this.state.empSalary && this.state.empAge)) {
      alert("Please fill all fields carefully");
      return;
    }

    let employee = {
      name: this.state.empName,
      salary: this.state.empSalary,
      age: this.state.empAge
    }

    employeeService.createEmployee(employee).then((response) => {
      if (response.id && response.id > 0) {
        alert("Employee Added Sucessfully");
        this.props.history.push("/");
      }
      console.log(response);
    })
    .catch(error=>alert(error))
  }


  editHandler() {
    this.isEditable = true;
    this.setState(
      { isFieldDisabled: false }
    )
  }


  updateHandler() {
    if (!(this.state.empName && this.state.empSalary && this.state.empAge)) {
      alert("Please fill all fields carefully");
      return;
    }

    let employee = {
      name: this.state.empName,
      salary: this.state.empSalary,
      age: this.state.empAge
    }
    let employeeId = this.state.empId;
    employeeService.updateEmployee(employee, employeeId).then((response) => {
      debugger;
      if (response) {
        alert("Employee Updated Sucessfully");
        this.props.history.push("/");
      }
      console.log(response);
    })
    .catch(error=>alert(error))
  }

  onkeyupHandler(controlName, e) {
    if (e.which != 13)
      return;
    switch (controlName) {
      case "Name":
        this.empSalaryNode.focus();
        break;
      case "Salary":
        this.empAgeNode.focus();
        break;
      case "Age":
        debugger;
        this.saveButtonNode.focus();
        break;
    }
  }

  handleChange(controlName, e) {
    switch (controlName) {
      case "Name":
        this.setState({ empName: e.target.value });
        break;
      case "Salary":
        this.setState({ empSalary: e.target.value });
        break;
      case "Age":
        this.setState({ empAge: e.target.value });
        break;
      default:
        break;
    }
  }
}
