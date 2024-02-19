import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get('/api/employees')
            .then(response => setEmployees(response.data))
            .catch(error => console.error('Error fetching data: ', error));
    }, []);

    return (
        <div>
            <h1>Employee Management System</h1>
            <ul>
                {employees.map(employee => (
                    <li key={employee._id}>
                        <p>Name: {employee.name}</p>
                        <p>Designation: {employee.designation}</p>
                        <p>Salary: {employee.salary}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
