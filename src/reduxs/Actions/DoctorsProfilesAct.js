import firebase from '../../pages/config/fbConfig';
import { DOCTORPROFILE } from "../types";
const databaseRef = firebase.firestore();
const DoctorRef = databaseRef.collection("Doctors").get();

export const DoctorProfiler = () => async (dispatch) => {

  try {
    const response = await DoctorRef;

    const arr = [];
    response.docs.forEach(res => {
      arr.push([res.id, res.data()]);

    });
    // console.log(arr);

    dispatch({
      type: DOCTORPROFILE,
      payload: arr
    })

  } catch (e) {

  }
};
