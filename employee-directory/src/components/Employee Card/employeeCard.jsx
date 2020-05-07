import React, { useEffect, useState } from "react";

function Employees(props) {
  return (
    <tbody>
      {props.employees.map((employee) => (
        <tr key={employee.id.value}>
          <td>
            <img alt="placeholder" src={employee.picture.thumbnail} />
          </td>
          <td>
            {employee.name.first} {employee.name.last}
          </td>
          <td>{employee.phone}</td>
          <td>{employee.email}</td>
          <td>{new Date(employee.dob.date).toLocaleDateString()}</td>
        </tr>
      ))}
    </tbody>
  );
}

export default Employees;