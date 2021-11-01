import { GETPARENTS} from "../types";

const INITIAL_STATE = {
    ParentList: [],
   
  };
  
  export default function ProductAct(state = INITIAL_STATE, action) {
    switch (action.type) {
      case GETPARENTS:
        return {
          ...state,
          ParentList: action.payload,
        };
     
      default:
        return state;
    }
  }