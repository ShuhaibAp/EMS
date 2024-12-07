import React, { useState } from "react";
import { CreateForm, CreateField, SubmitEmployeeData } from "../APIs/FetchApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Navbar, Container, Nav, Button, Form, Row, Col } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const EmployeeForm = () => {
  const [formName, setFormName] = useState("");
  const [fields, setFields] = useState([]);
  const [employeeData, setEmployeeData] = useState({});
  const [formId, setFormId] = useState(null);

  const navigate = useNavigate();

  // Add a new field
  const handleAddField = () => {
    setFields([...fields, { id: null, label: "", input_type: "text" }]);
  };

  // Submit the form
  const handleSubmitForm = async () => {
    const token = sessionStorage.getItem("token");
    const headers = {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    };

    try {
      // Step 1: Create the form
      const formPayload = { fname: formName };
      const formResponse = await CreateForm(formPayload, headers);
      const createdFormId = formResponse.data.id;
      setFormId(createdFormId);

      // Step 2: Add fields to the form
      const fieldsPayload = fields.map((field, index) => ({
        label: field.label,
        input_type: field.input_type,
        order: index + 1,
      }));
      const fieldResponse = await CreateField(createdFormId, fieldsPayload, headers);

      // Update fields with the returned IDs
      const updatedFields = fields.map((field, index) => ({
        ...field,
        id: fieldResponse.data[index].id,
      }));
      setFields(updatedFields);

      // Step 3: Submit employee data using field IDs
      const employeeFieldData = updatedFields.map((field) => ({
        field_id: field.id,
        value: employeeData[field.label] || "",
      }));

      const employeePayload = { fields: employeeFieldData };
      await SubmitEmployeeData(createdFormId, employeePayload, headers);

      toast.success("Form and employee created successfully!");
      navigate("/home");
    } catch (error) {
      toast.error("Failed to create form or add employee.");
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="/home">EmpNova</Navbar.Brand>
          <Nav className="ml-auto">
            <Link to="/home" className="btn btn-outline-light mr-2 mx-3">
              Home
            </Link>
            <Link to="/profile" className="btn btn-outline-light">
              Profile
            </Link>
          </Nav>
        </Container>
      </Navbar>

      <Container>
        <h2 className="text-center mb-4">Create Employee Form</h2>
        <Form>
          {/* Form Name */}
          <Form.Group className="mb-3">
            <Form.Label>Form Name</Form.Label>
            <Form.Control
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="Enter Form Name"
            />
          </Form.Group>

          {/* Add Fields Section */}
          <h5>Fields</h5>
          {fields.map((field, index) => (
            <Row key={index} className="mb-3">
              <Col md={6}>
                <Form.Control
                  type="text"
                  value={field.label}
                  onChange={(e) =>
                    setFields((prevFields) => {const updatedFields = [...prevFields];
                      updatedFields[index].label = e.target.value;
                      return updatedFields;
                    })
                  }
                  placeholder="Field Label"
                />
              </Col>
              <Col md={4}>
                <Form.Select
                  value={field.input_type}
                  onChange={(e) =>
                    setFields((prevFields) => {
                      const updatedFields = [...prevFields];
                      updatedFields[index].input_type = e.target.value;
                      return updatedFields;
                    })
                  }
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="date">Date</option>
                  <option value="password">Password</option>
                </Form.Select>
              </Col>
            </Row>
          ))}
          <Button variant="secondary" onClick={handleAddField}>
            Add Field
          </Button>

          {/* Employee Data Section */}
          <h5 className="mt-4">Employee Data</h5>
          {fields.map((field, index) => (
            <Form.Group key={`employee-${index}`} className="mb-3">
              <Form.Label>{field.label}</Form.Label>
              <Form.Control
                type={field.input_type}
                onChange={(e) =>
                  setEmployeeData((prevData) => ({
                    ...prevData,
                    [field.label]: e.target.value,
                  }))
                }
                placeholder={`Enter ${field.label}`}
              />
            </Form.Group>
          ))}

          <Button variant="primary" onClick={handleSubmitForm}>
            Submit Form and Employee
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default EmployeeForm;
