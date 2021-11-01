import { PATIENTDETAILS } from "../types";


const INITIAL_STATE = {
  patientDetials: [],
};
export default function Profile(state = INITIAL_STATE, action) {

  switch (action.type) {
    case PATIENTDETAILS:
      return {
        ...state,
        fetching: true,
        patientDetials: action.payload,
      };
    default:
      return state;
  }

}
