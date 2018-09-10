import React, { Component } from 'react';
import EmployeeList from './employeeList';
import './employeeStyle.css';

class Employee extends Component {
    render() {
        return (
            <div>
                <EmployeeList parentProps={this.props} />
            </div>
            
        )
    }
}

export default Employee;