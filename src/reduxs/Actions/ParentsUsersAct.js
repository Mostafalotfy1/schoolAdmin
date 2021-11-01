import axios from "axios";
import { GETPARENTS} from "../types";

export const getParents =() => {
    return  async (dispatch) => {
    await   axios
    .get(" https://abnaey-dashboard.herokuapp.com/api/users")
    .then((response) => {
        dispatch({
            type: GETPARENTS,
            payload: response.data,
          });
      })
      .catch((err) => console.log(err));
  };
}
