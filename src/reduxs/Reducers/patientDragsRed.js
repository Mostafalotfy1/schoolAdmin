import { PATIENTDRAG} from "../types";

const INITIAL_STATE = {
    patientDrag: [] ,
  };
  export default function Profile(state = INITIAL_STATE, action) {
  

    switch (action.type) {
      case PATIENTDRAG:
        return {
          ...state,
          fetching:true,
          patientDrag: action.payload,
          
        };
      default:
        return state;
    }
   
  }
 