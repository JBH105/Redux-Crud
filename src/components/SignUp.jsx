import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

const SignUp = () => {
  const history = useHistory();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tokenOTP, setTokenOTP] = useState("");
  const [error, setError] = useState([]);
  const [show, setshow] = useState(false);
  const signupdata = {
    username,
    email,
    password,
  };

  const handleSignup = (e) => {
    if (!username || !email | !password) {
      return toast.warning("Fill the details");
    } else {
      axios.post("http://localhost:5000/signup", signupdata).then((result) => {
        if (result.data.error) {
          toast.error(result.data.error);
        } else {
          setshow(!show);
          toast.success("Send OTP Successfully");
        }
      });
    }
  };
  const handleOTP = () => {
    const data = { tokenOTP, email };
    axios.post("http://localhost:5000/verifyotp", data).then((d) => {
      console.log(d);
      if (d.data) {
        console.log(d.data);
        localStorage.setItem("email", email);
        history.push("/");
        toast.success("Success SignUp");
      } else {
        return toast.error("Invalid OTP!!");
      }
    });
  };
  return (
    <div>
      <Card
        style={{
          width: "18rem",
          margin: "0px auto",
          margin: "0px auto",
          marginTop: "10%",
          display: "flex",
        }}
      >
        <Card.Body>
          <Card.Title>Signup Page</Card.Title>
          <span>Username</span>
          <input
            type="text"
            name="username"
            id="username"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
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
          <Button variant="primary" onClick={() => handleSignup()}>
            SendOTP
          </Button>
          <br />
          <br />
          {show ? (
            <div className="">
              <span>OTP</span>
              <input
                type="otp"
                name="otp"
                id="otp"
                onChange={(e) => {
                  setTokenOTP(e.target.value);
                }}
              />{" "}
              <br />
              <br />
              <Button variant="primary" onClick={() => handleOTP()}>
                VerifyOTP
              </Button>
            </div>
          ) : (
            ""
          )}
        </Card.Body>
        <Card.Footer>
          <small className="text-muted" onClick={() => history.push("/login")}>
            Login !!
          </small>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default SignUp;
