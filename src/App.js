import { ToastContainer } from "react-toastify";
import "./App.css";
import AddContact from "./components/AddContact";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import EditContact from "./components/EditContact";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Forgot_password from "./components/Password/Forgot_password";
// import Verify_Password from "./components/Password/Verify_Password";
import Verify_Password from "./components/Password/Verify_Password";
import { useHistory, useLocation } from "react-router";
import Table from './components/Table'
function App() {
  // const location = useLocation()
// console.log(location,"123");
  return (
    <div>
      <ToastContainer />
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/add" component={AddContact} />
        <Route path="/edit" component={EditContact} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/forgot" component={Forgot_password} />
        <Route path="/verify" component={Verify_Password} />
        <Route path="/table" component={Table} />
      </Router>
    </div>
  );
}

export default App;
