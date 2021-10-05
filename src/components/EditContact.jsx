import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import { toast } from "react-toastify";
import { EditUserData } from "../redux/actions";

function EditContact() {
  const contacts = useSelector((state) => state.UserData.data);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const id = location.state.params;
  // console.log("ID123 :", id);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setnumber] = useState("");

  //   const { id } = useParams();
  // console.log(contacts,"xcvbhnjomkpl");
  const currentContact = contacts.find((contact) => contact._id === id);

  // console.log(currentContact, "23456789");

  useEffect(() => {
    setName(currentContact.name);
    setEmail(currentContact.email);
    setnumber(currentContact.number);
  }, [currentContact,contacts]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const chekEmail = contacts.find((contact) =>
      contact.email === email && contact.id !== currentContact.id
        ? contact
        : null
    );

    const chekNumber = contacts.find((contact) =>
      contact.number === number && contact.id !== currentContact.id
        ? contact
        : null
    );
    if (!name || !email || !number) {
      return toast.warning("Please fill in all fields!!");
    }
    if (chekEmail) {
      return toast.error("This email already exists!!");
    }
    if (chekNumber) {
      return toast.error("This number number already exists!!");
    }

    // dispatch(EditUserData(id));
    toast.success("Update Successfully!!");
    history.push("/");
  };
  const data = {
    name,
    email,
    number,
    id,
  };
  EditUserData(data);
  return (
    <div className="container">
      <div className="row d-flex flex-column">
        <button
          className="btn btn-dark ml-auto my-5"
          onClick={() => history.push("/")}
        >
          Go back
        </button>
        <div className="col-md-6 mx-auto shadow p-5">
          {currentContact ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  value={name}
                  placeholder={"Name"}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="email"
                  value={email}
                  placeholder={"Email"}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="number"
                  value={number}
                  placeholder={"number"}
                  onChange={(e) => setnumber(e.target.value)}
                />
              </div>
              <div className="form-group d-flex align-items-center justify-content-between my-2">
                <button type="submit" className="btn btn-primary">
                  Update Contact
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => history.push("/")}
                >
                  cancel
                </button>
              </div>
            </form>
          ) : (
            {}
          )}
        </div>
      </div>
    </div>
  );
}

export default EditContact;
