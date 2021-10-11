import { ToastContainer } from "react-toastify";
import "./App.css";
import AddContact from "./components/AddContact";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import EditContact from "./components/EditContact";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div >
      <ToastContainer />
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/add" component={AddContact} />
        <Route path="/edit" component={EditContact} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </Router>
    </div>
  );
}

export default App;
