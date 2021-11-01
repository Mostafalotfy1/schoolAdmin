import { DEPARTMENTS} from "../types";

const INITIAL_STATE = {
    departmentsdata: [] ,
  };
  export default function Profile(state = INITIAL_STATE, action) {
  

    switch (action.type) {
      case DEPARTMENTS:
        return {
          ...state,
          fetching:true,
          departmentsdata: action.payload,
          
        };
      default:
        return state;
    }
   
  }
 