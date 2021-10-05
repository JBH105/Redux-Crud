import { ToastContainer } from "react-toastify";
import "./App.css";
import AddContact from "./components/AddContact";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import EditContact from "./components/EditContact";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/add" component={AddContact} />
        <Route path="/edit" component={EditContact} />
      </Router>
    </div>
  );
}

export default App;
