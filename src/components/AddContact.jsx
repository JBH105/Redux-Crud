import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { SaveUserData } from "../redux/actions/index";

function AddContact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setnumber] = useState("");

  const contacts = useSelector((state) => state.UserData.data);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();

    const chekEmail = contacts.find(
      (contact) => contact.email === email && email
    );

    const chekNumber = contacts.find(
      (contact) => contact.number === number && number
    );
    if (!name || !email || !number) {
      return toast.warning("Please fill in all fields!!");
    }
    if (chekEmail) {
      return toast.error("This email already Exists!");
    }
    if (chekNumber) {
      return toast.error("This Number already Exists!");
    }
    const data = {
      // id: contacts[contacts.length - 1].id + 1,
      name,
      email,
      number,
    };
    // console.log("-----------ABCD-----------", data);

    SaveUserData(data);
    // dispatch(SaveUserData(data));
    toast.success("added successfully!!");
    history.push("/");
  };

  //   console.log(contacts);
  return (
    <div className="container-fluid">
      <h1 className="text-center text-dark py-3 display-2">Add Post</h1>
      <div className="row">
        <div className="col-md-6 p-5 mx-auto shadow">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Full name"
                // value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="email"
                placeholder="Email"
                // value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="number"
                placeholder="number"
                // value={number}
                onChange={(e) => setnumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="btn btn-block btn-dark"
                type="submit"
                value="Add Student"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddContact;
