import { ActionType } from "../contants/Action-Type";

const initialState = [
  { id: 0, name: "Jaydeep", email: "jaydeep@gmail.com", number: 1234567890 },
  { id: 1, name: "Test", email: "test@test.com", number: 4567891230 },
];

const data = [];
export const UserData = (state = data, { type, payload }) => {
  switch (type) {
    case ActionType.ALL_USER_DATA:
      return { ...state, data: payload };

    default:
      return state;
  }
};
export const SaveUserData = (state = data, { type, payload }) => {
  switch (type) {
    case ActionType.SAVE_USER_DATA:
      return { ...state, data: payload };

      case ActionType.UPDATE_USER_DATA:
      return{...state,data:payload}
      
    default:
      break;
  }
};

export const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      state = [...state, action.payload];
      return state;

    // case ActionType.ALL_USER_DATA:
    //   state = [...state, action.payload];
    //   return state;

    case "UPDATE_CONTACT":
      const contactUpdate = state.filter((contact) =>
        contact.id === action.payload.id
          ? Object.assign(contact, action.payload)
          : contact
      );
      state = contactUpdate;
      return state;

    case "DELETE_CONTACT":
      const deleteContact = state.filter((contact) =>
        contact.id === action.payload ? null : contact
      );
      state = deleteContact;
      return state;

    case "SEARCH_CONTACT":
      const searchContact = state.filter((contact) =>
        contact.id === action.payload ? null : contact
      );
      state = searchContact;
      return state;
    default:
      return state;
  }
};
