import React, { Component } from 'react'
import { Button, FormControl } from "react-bootstrap";

export default class EmployeeHandler extends Component {
    constructor() {
        super()
        this.state = {
            empSearchValue: ''
        }
    }
    render() {
        return (
            <div className="col-md-12 row padding-0 margin-0">
                <div className="col-md-6 left padding-0 margin-0 margin-bottom-10">
                    <FormControl id="searchHandlerId" type="text" placeholder="Search Employee by Name..." value={this.state.empSearchValue} onChange={this.onChangeHandler.bind(this)} />
                </div>
                <div className="col-md-6 right padding-0 margin-0">
                    <Button className="margin-left-5 margin-bottom-10" bsStyle="success"
                        onClick={this.addEmployeeHandler.bind(this)}>Add Employee</Button>
                </div>
            </div>
        )
    }


    addEmployeeHandler() {
        this.props.grandParentProps.history.push('/addEmployee');
    }

    onChangeHandler(e) {
        this.setState({ empSearchValue: e.target.value });
        this.props.onSearchChangeData(e.target.value)
    }


}
