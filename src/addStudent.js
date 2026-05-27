import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import axios from "axios";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    age: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        age: formData.age === "" ? "" : Number(formData.age),
      };

      const response = await axios.post(
        "http://localhost:8081/addStudent",
        payload
      );

      alert("Student added successfully");
      console.log(response.data);
      setFormData({ name: "", department: "", age: "" });
    } catch (error) {
      alert("Error adding student");
      console.error(error);
    }
  };

  return (
    <div className="add-student">
      <h1>Add Student</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="studentName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Please enter your name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="studentDepartment">
          <Form.Label>Department</Form.Label>
          <Form.Control
            type="text"
            placeholder="Please enter your department"
            name="department"
            value={formData.department}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="studentAge">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Please enter your age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="0"
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddStudent;
