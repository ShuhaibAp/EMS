import React, { useState, useEffect } from "react";
import { GetEmployees,DeleteEmployees } from "../APIs/FetchApi"; // Import the API function
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Card, Button } from "react-bootstrap"; // Import Bootstrap components
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmsHome = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem("token");
    const headers = {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    };

    try {
      await DeleteEmployees(id, headers); // Call the delete API
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.id !== id)
      );
      toast.success("Employee deleted")
    } catch (error) {
      toast.error("Error deleting employee");
    }
  };
  // Fetch employees
  const fetchEmployees = async () => {
    const token = sessionStorage.getItem("token");
    const headers = {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await GetEmployees(headers);
      setEmployees(response.data);
    } catch (error) {
      setError("Error fetching employees"); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees(); 
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="/home">EmpNova</Navbar.Brand>
          <Nav className="ml-auto">
            <Link to='/form' className="btn btn-outline-light mr-2 mx-3">Add Employee</Link>
            
            <Link to='/profile' className="btn btn-outline-light">Profile</Link>
          </Nav>
          <Link to="/changepass" className="btn btn-outline-light">
              Change Password
          </Link>
        </Container>
      </Navbar>

      <div className="container">
        <h1 className="mb-4">Employees</h1>
        <div className="row">
          {employees.length > 0 ? (
            employees.map((employee) => (
              <div className="col-md-4 mb-4" key={employee.id}>
                <Card>
                  <Card.Body>
                    <Card.Title>Employee ID: {employee.id}</Card.Title>
                    <ul className="list-group list-group-flush">
                      {employee.field_data.map((field, index) => (
                        <li className="list-group-item" key={index}>
                          {field.value}
                        </li>
                      ))}
                    </ul>
                     <Button
                      variant="danger"
                      className="mt-3"
                      onClick={() => handleDelete(employee.id)}
                    >
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))
          ) : (
            <p>No employees found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default EmsHome;
