import axios from "axios";
import { ActionType } from "../contants/Action-Type";

export const AllUserData = () => async (dispatch) => {
  const response = await axios.get("http://localhost:5000/userData");
  dispatch({ type: ActionType.ALL_USER_DATA, payload: response.data });
};

export const SaveUserData = async (data) => {
  // console.log(data, "data====---+++");
  const response = await axios.post("http://localhost:5000/add", data);
  //   dispatch({ type: ActionType.SAVE_USER_DATA,payload:response.data});
};

export const EditUserData = async (data) => {
  // console.log(data, "iddd123456789");
  const response = await axios.put(`http://localhost:5000/${data.id}`, data);
  // console.log(response, "response 1321546");
};

export const DeleteUserData = async (_id) => {
  // console.log(_id);
  const response = await axios.delete(`http://localhost:5000/${_id}`);
  AllUserData();
};
