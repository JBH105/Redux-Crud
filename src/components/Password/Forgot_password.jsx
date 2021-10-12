import axios from "axios";
import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

function Forgot_password() {
  const [email, setemail] = useState("");
  const [tokenOTP, setTokenOTP] = useState("");
  const [show, setshow] = useState(false);
  const history = useHistory();

  const handelForgot = async () => {
    await axios
      .post("http://localhost:5000/forgot/password", { email })
      .then((result) => {
        // console.log(result.data);
        // localStorage.setItem("id",result.data._id)
        setshow(!show);
      });
  };

  const handleOTP = async () => {
    const data = { tokenOTP, email };
    axios.post("http://localhost:5000/verifyotp", data).then((d) => {
      console.log(d, "fgh");
      if (d.data) {
        console.log(d.data);
        // localStorage.setItem("email", email);
        toast.success("Success");
        history.push({ pathname: "/verify", state: { email: email } });
      } else {
        return toast.error("Invalid OTP!!");
      }
    });
  };
  return (
    <div
      style={{
        justifyContent: "center",
        margin: "0px auto",
        marginTop: "15%",
        display: "flex",
      }}
    >
      <Card style={{ width: "20rem" }}>
        <Card.Body>
          <Card.Title>Forgot Password</Card.Title>
          <span>Email</span>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setemail(e.target.value)}
          />
          <br />
          <br />
          <Button onClick={() => handelForgot()}>Send OTP</Button>
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
      </Card>
    </div>
  );
}

export default Forgot_password;
