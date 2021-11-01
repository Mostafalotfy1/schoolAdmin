import { DOCTORPROFILE} from "../types";

const INITIAL_STATE = {
    doctorprofile: [] ,
  };
  export default function DProfile(state = INITIAL_STATE, action) {
  

    switch (action.type) {
      case DOCTORPROFILE:
        return {
          ...state,
          fetching:true,
          doctorprofile: action.payload,
          
        };
      default:
        return state;
    }
   
  }
 