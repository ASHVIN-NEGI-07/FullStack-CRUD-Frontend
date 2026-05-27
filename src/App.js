import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'; 
import AddStudent from './addStudent';
import ViewStudent from './viewStudent';

function App() {
  return (
    <BrowserRouter>
    <h1>CRUD Application</h1>
    <Routes>
      <Route path="/addStudent" element = {<AddStudent/>} />
      <Route path="/viewStudent" element = {<ViewStudent/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
