import axios from "axios";
import { GETAPP} from "../types";

export const getApp = (uId) => {
    
    return (dispatch) => {
      axios
      .get(`https://abnaey-dashboard.herokuapp.com/api//application/${uId}`)
      .then((response) => {
        dispatch({
          type: GETAPP,
          payload: response.data,
        });
      })
      .catch((err) => console.log(err));
    };
  };
  