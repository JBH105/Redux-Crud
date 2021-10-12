import axios from "axios";
import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import { toast } from "react-toastify";

function Verify_Password() {
  const history = useHistory();
  const location = useLocation();
  const [password, setpassword] = useState("");
  const [confiemPass, setconfiemPass] = useState("");

  const handelSave = () => {
    console.log(password, confiemPass);

    if (password === confiemPass) {
      axios.put(
        `http://localhost:5000/verify/password/${location.state.email}`,
        { password }
      );
      toast.success("Password Save Successfully");
      history.push("/login");
    } else {
      return toast.warning("Password and confirmation password does not match");
    }
  };
  return (
    <div>
      <Card
        style={{
          width: "18rem",
          margin: "0px auto",
          marginTop: "15%",
          display: "flex",
        }}
      >
        <Card.Body>
          <span>Password</span>
          <input
            type="password"
            name="password"
            onChange={(e) => setpassword(e.target.value)}
          />
          <br />
          <br />
          <span>Confirm Password</span>
          <input
            type="password"
            name="password"
            onChange={(e) => setconfiemPass(e.target.value)}
          />

          <br />
          <br />
          <Button onClick={() => handelSave()}>Save</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Verify_Password;
