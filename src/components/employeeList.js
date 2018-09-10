import React, { Component } from 'react';
import EmployeeRow from './employeeRow';
import { Table } from 'react-bootstrap';
import EmployeeHandler from './employeeHandler';

class EmployeeList extends Component {
    constructor(props){
        super(props)
        this.state={
            onSearchChangeValue:''
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="table-class">
                <h4>Employee Records</h4>
                <EmployeeHandler grandParentProps={this.props.parentProps} onSearchChangeData={this.onSearchChangeData.bind(this)}/>
                    <Table  striped bordered responsive condensed hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Salary</th>
                                <th>Age</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <EmployeeRow grandParentProps={this.props.parentProps} onSearchChangeValue={this.state.onSearchChangeValue}  />
                        </tbody>
                    </Table>
                </div>
            </React.Fragment>
        )
    }   
    onSearchChangeData(value){
        this.setState({onSearchChangeValue:value});
    }
}

export default EmployeeList;
