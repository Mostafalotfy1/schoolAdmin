import { MESSAGES} from "../types";

const INITIAL_STATE = {
    MessagesP: [] ,
  };
  export default function Profile(state = INITIAL_STATE, action) {
  

    switch (action.type) {
      case MESSAGES:
        return {
          ...state,
          fetching:true,
          MessagesP: action.payload,
          
        };
      default:
        return state;
    }
   
  }
 