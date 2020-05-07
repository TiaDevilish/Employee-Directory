import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import Employees from "../Employee Card/employeeCard";
import NameSearch from "../Name Search/nameSearch";
import "./style.css";

class Directory extends React.Component {
  state = {
    employees: [],
    sortType: "nosort",
    startDate: "",
    endDate: "",
    name: "",
  };
  componentDidMount() {
    this.getEmployees();
  }
  getEmployees = () => {
    API.getEmployees()
      .then((res) => {
        this.setState({
          employees: res.data.results,
        });
      })
      .catch((err) => console.log(err));
  };
  handleSortState = () => {
    const selectElement = document.querySelector("#sortSelection");
    const output = selectElement.value;
    if (output === "name") {
      this.setState({ sortType: "name" });
      const sortedEmployees = this.state.employees;
      sortedEmployees.sort((a, b) => a.name.last.localeCompare(b.name.last));
      this.setState({ employees: sortedEmployees });
    }
    if (output === "dob") {
      this.setState({ sortType: "dob" });
      const sortedEmployees = this.state.employees;
      sortedEmployees.sort((a, b) => a.dob.date.localeCompare(b.dob.date));
      this.setState({ employees: sortedEmployees });
    }
  };
  handleNameInput = (event) => {
    event.preventDefault();
    const value = event.target.value;
    this.setState({
      name: value.toLowerCase(),
    });
  };
  filterFunction = (employee) => {
    const { startDate, endDate } = this.state;
    const firstName = employee.name.first
      .toLowerCase()
      .includes(this.state.name);
    const lastName = employee.name.last.toLowerCase().includes(this.state.name);
    const dob = employee.dob.date;
    if (startDate === "" && endDate !== "") {
      return (firstName || lastName) && dob <= this.state.endDate;
    } else if (startDate !== "" && endDate === "") {
      return (firstName || lastName) && this.state.startDate <= dob;
    } else if (startDate === "" && endDate === "") {
      return firstName || lastName;
    }
    return (
      (firstName || lastName) &&
      this.state.startDate <= dob &&
      dob <= this.state.endDate
    );
  };
  render() {
    return (
      <div>
        <div className="container">
          <h2 id="directory">Directory</h2>
          <p id="description">
            Search employees by name, or sort them by name or DOB.
          </p>
          <div className="container">
            <NameSearch handleNameInput={this.handleNameInput} value="name" />
            <div id="sortContainer">
              <select id="sortSelection" onChange={this.handleSortState}>
                <option value="nosort">No Sort</option>
                <option value="name">Sort by Name</option>
                <option value="dob">Sory by Date of Birth</option>
              </select>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>DOB</th>
              </tr>
            </thead>
            <Employees
              employees={this.state.employees.filter(this.filterFunction)}
            />
          </table>
        </div>
      </div>
    );
  }
}
export default Directory;