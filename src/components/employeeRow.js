import React, { Component } from 'react'
import * as employeeService from '../services/employeeService';
import { Button } from 'react-bootstrap';

export default class EmployeeRow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employeeData: [{ "id": "719", "employee_name": "Vivek", "employee_salary": "123", "employee_age": "23", "profile_image": "" }]
        }
    }

    componentWillMount() {
        this.loadEmployee();
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.state.employeeData.map(function (employee) {
                        return <tr id={employee.id} key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.employee_name}</td>
                            <td>{employee.employee_salary}</td>
                            <td>{employee.employee_age}</td>
                            <td>
                                <Button className="margin-left-5" button-id={employee.id} bsStyle="success"
                                    onClick={this.viewButtonHandler.bind(this)}>View
                                    </Button>
                                <Button button-id={employee.id} className="margin-left-5" bsStyle="primary"
                                    onClick={this.editButtonHandler.bind(this)}>Edit
                                    </Button>
                                <Button button-id={employee.id} className="margin-left-5" bsStyle="danger"
                                    onClick={this.deleteButtonHandler.bind(this)}>Delete
                                    </Button>
                            </td>
                        </tr>
                    }.bind(this))
                }
            </React.Fragment>
        )
    }

    mapEmployeeFields(event) {
        let employeeData = {};
        let button_id = event.target.getAttribute("button-id");
        if (button_id) {
            let dataRow = document.getElementById(button_id);
            if (dataRow && dataRow.childElementCount > 0) {
                employeeData.id = dataRow.childNodes[0].textContent;
                employeeData.name = dataRow.childNodes[1].textContent;
                employeeData.salary = dataRow.childNodes[2].textContent;
                employeeData.age = dataRow.childNodes[3].textContent;
                return employeeData;
            }
        }
    }

    viewButtonHandler = (e) => {
        let employeeData = this.mapEmployeeFields(e);
        if (employeeData)
            this.props.grandParentProps.history.push('/viewEmployee', employeeData);
    }

    editButtonHandler = (e) => {
        let employeeData = this.mapEmployeeFields(e);
        if (employeeData)
            this.props.grandParentProps.history.push('/editEmployee', employeeData);
    }

    deleteButtonHandler = (e) => {
        if (!window.confirm("Do you want to delete record?")) {
            return;
        }
        let button_id = e.target.getAttribute("button-id");
        if (button_id) {
            let dataRow = document.getElementById(button_id);
            if (dataRow && dataRow.childElementCount > 0) {
                let employeeId = dataRow.childNodes[0].textContent;
                employeeService.deleteEmployee(employeeId)
                    .then(response => {
                        if (response) {
                            document.getElementById("searchHandlerId").value = "";
                            this.loadEmployee();
                            alert("Data Deleted Succesfully");
                        }
                    })
                    .catch(error => alert(error))
            }
        }
    }

    employeeData = [];
    loadEmployee = () => {
        employeeService.getAllEmployees().then(function (employees) {
            this.employeeData = employees;
            this.setState((pervState, props) => ({
                employeeData: employees
            }))
        }.bind(this))
            .catch(error => alert(error))
    }

    componentWillReceiveProps(props, state) {
        this.onSearchChangeHandler(props.onSearchChangeValue)
    }
    onSearchChangeHandler = (value) => {
        debugger;
        let filteredEmployee = this.employeeData.filter(employee => {
            if (employee.employee_name.toLowerCase().includes(value.toLowerCase())) {
                return employee;
            }
            else
                return false;
        })
        this.setState({ employeeData: filteredEmployee })
    }

}


