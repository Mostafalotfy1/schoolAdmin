import { ADMINS} from "../types";

const INITIAL_STATE = {
    AdminProfile: [] ,
  };
  export default function Profile(state = INITIAL_STATE, action) {
  

    switch (action.type) {
      case ADMINS:
        return {
          ...state,
          fetching:true,
          AdminProfile: action.payload,
          
        };
      default:
        return state;
    }
   
  }
 