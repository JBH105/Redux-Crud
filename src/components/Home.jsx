import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { AllUserData, DeleteUserData } from "../redux/actions";

function Home() {
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.allData);
  const userData = useSelector((state) => state.UserData.data);
  console.log("<<== userData ==>> ", userData);
  const [Updateddata, setUpdatedData] = useState();
  const [Searchvalue, setSearchvalue] = useState();
  const [select, setselect] = useState([]);

  var AllData = data.concat(userData);

  useEffect(() => {
    const Token = localStorage.getItem("token");
    console.log(Token, "home page");
    if (Token) {
      history.push("/");
    } else {
      history.push("/login");
    }
  }, []);
  const logout = () => {
    localStorage.clear();
    history.push("/login");
  };
  useEffect(() => {
    dispatch(AllUserData());
  }, [AllUserData]);

  const deleteContact = (id) => {
    DeleteUserData(id);
    // dispatch({ type: "DELETE_CONTACT", payload: id });
    dispatch(AllUserData());
    toast.success("Contact delete successfully!!");
  };

  const DeleteMull = () => {
    console.log(select, "=====>>>=====");
  };
  const SearchData = (e) => {
    setSearchvalue(e.target.value);
    const userData = {
      AllData: AllData.filter((item) => {
        if (e.target.value === "") {
          return item;
        } else if (
          item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.email.toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          return item;
        }
      }),
    };
    setUpdatedData(userData);
  };

  return (
    <>
      <Button
        style={{ display: "flex", marginLeft: "auto", padding: "revert" }}
        onClick={() => logout()}
      >
        Logout
      </Button>
      <div className="container">
        <div className="row d-flex flex-column">
          <Link to="/add" className="btn btn-outline-dark my-5 ml-auto ">
            Add Contact
          </Link>
          <input
            className="col-md-5 mx-auto"
            type="search"
            placeholder="Search.."
            onChange={SearchData}
          />
          <div className="col-md-10 mx-auto my-4">
            <table className="table table-hover">
              <thead className="table-header bg-dark text-white">
                <tr>
                  {/* <th scope="col">
              <button onClick={()=>DeleteMull()}>Delete</button></th> */}
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">number</th>
                  <th scope="col"></th>
                </tr>
              </thead>

              <tbody>
                {Searchvalue ? (
                  <>
                    {Object.values(Updateddata.AllData).map((contact, id) => (
                      <tr key={id}>
                        <input
                          type="checkbox"
                          onClick={(e) => setselect(e.target.value)}
                        />
                        <td>{id}</td>
                        <td>{contact?.name}</td>
                        <td>{contact?.email}</td>
                        <td>{contact?.number}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary mr-1"
                            onClick={() =>
                              history.push("/edit", { params: contact._id })
                            }
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteContact(contact._id)}
                            className="btn btn-sm btn-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <>
                    {AllData &&
                      AllData.map((contact, id) => (
                        <tr key={id}>
                          {/* <input type="checkbox" checked={contact?._id} /> */}
                          <td>{id}</td>
                          <td>{contact?.name}</td>
                          <td>{contact?.email}</td>
                          <td>{contact?.number}</td>

                          <td>
                            <button
                              className="btn btn-sm btn-primary mr-1"
                              onClick={() =>
                                history.push("/edit", { params: contact._id })
                              }
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteContact(contact._id)}
                              className="btn btn-sm btn-danger"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
