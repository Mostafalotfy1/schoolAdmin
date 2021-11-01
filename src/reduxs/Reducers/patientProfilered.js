import { CREATEPROFILE} from "../types";

const INITIAL_STATE = {
    patientProfile: [] ,
  };
  export default function Profile(state = INITIAL_STATE, action) {
  

    switch (action.type) {
      case CREATEPROFILE:
        return {
          ...state,
          fetching:true,
          patientProfile: action.payload,
          
        };
      default:
        return state;
    }
   
  }
 