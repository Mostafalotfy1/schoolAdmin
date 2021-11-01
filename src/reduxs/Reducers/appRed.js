import { GETAPP} from "../types";

const INITIAL_STATE = {
    applistP: [],
   
  };
  
  export default function ProductAct(state = INITIAL_STATE, action) {
    switch (action.type) {
      case GETAPP:
        return {
          ...state,
          applistP: action.payload,
        };
     
      default:
        return state;
    }
  }