import axios from "axios";
import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const logindata = { email, password };
  const history = useHistory("");
  const handleLogin = () => {
    if (!email || !password) {
      return toast.warning("Fill the details");
    } else {
      
      axios.post("http://localhost:5000/login", logindata).then((result) => {
        if (result.data.token) {
          localStorage.setItem("token", result.data.token);
          // console.log(result);
          history.push({
            pathname: "/",
            state: result.data.email,
          });
          toast.success("Success Login");
        } else {
          toast.error("invalid credential");
        }
      });
    }
  };
  return (
    <div>
      <Card style={{ width: "18rem", margin: "0px auto" }}>
        <Card.Body>
          <Card.Title>Login Page</Card.Title>
          <span>Email</span>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <span>Password</span>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br /> <br />
          <Button variant="primary" onClick={() => handleLogin()}>
            Login
          </Button>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted" onClick={() => history.push("/signup")}>
            Create new account !! SignUp{" "}
          </small>
        </Card.Footer>
      </Card>
     
    </div>
  );
};

export default Login;
