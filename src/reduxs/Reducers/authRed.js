const INITIAL_STATE = {
    NEWUSER: {} ,
  };
  
  export default function Profile(state = INITIAL_STATE, action) {
    switch (action.type) {
      case "SIGNUP":
        return {
          ...state,
          NEWUSER: action.payload,
        };
        case "LOGIN":
            return {
              ...state,
              NEWUSER: action.payload,
            };
      default:
        return state;
    }
  }
  