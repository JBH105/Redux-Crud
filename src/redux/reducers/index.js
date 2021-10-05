import { combineReducers } from "redux";
import {contactReducer, UserData} from './contactRedux'

export const reducer = combineReducers({
    allData:contactReducer,
    UserData:UserData
});