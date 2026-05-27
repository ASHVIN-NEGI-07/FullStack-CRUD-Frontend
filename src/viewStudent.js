import { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";

const ViewStudent = () => {
  const [selectedStudent, setSelectedStudent] = useState({
    id: "",
    name: "",
    age: "",
    department: "",
  });

  const [students, setStudents] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:8081/getStudents");

      setStudents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      const baseUrl = `http://localhost:8081/deleteStudent/${id}`;

      await axios.delete(baseUrl);

      fetchStudents();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (student) => {
    setSelectedStudent(student);

    setIsFormOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSelectedStudent({ ...selectedStudent, [name]: value });
  };

  const updateStudent = async (e) => {
    e.preventDefault();

    try {
      const baseUrl = `http://localhost:8081/updateStudent`;

      await axios.put(baseUrl, selectedStudent);

      setIsFormOpen(false);

      fetchStudents();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="view-student">
      <h1>These are your students</h1>

      <table border="1">
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>age</th>
            <th>department</th>
            <th>delete</th>
            <th>update</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.department}</td>

              <td>
                <button onClick={() => deleteStudent(student.id)}>
                  delete
                </button>
              </td>

              <td>
                <button onClick={() => handleUpdate(student)}>update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isFormOpen && (
        <Form onSubmit={updateStudent}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>

            <Form.Control
              type="text"
              placeholder="Please enter your name"
              name="name"
              value={selectedStudent.name}
              onChange={handleChange}
            />
          </Form.Group>

          <br />

          <Form.Group className="mb-3">
            <Form.Label>Department</Form.Label>

            <Form.Control
              type="text"
              placeholder="Please enter your department"
              name="department"
              value={selectedStudent.department}
              onChange={handleChange}
            />
          </Form.Group>

          <br />

          <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>

            <Form.Control
              type="number"
              placeholder="Please enter your age"
              name="age"
              value={selectedStudent.age}
              onChange={handleChange}
            />
          </Form.Group>

          <br />

          <Form.Group className="mb-3">
            <Form.Control type="submit" value="update student" />
          </Form.Group>
        </Form>
      )}
    </div>
  );
};

export default ViewStudent;
