import firebase from '../../pages/config/fbConfig';
import { PATIENTDRAG } from "../types";
const databaseRef = firebase.firestore();
const ProfilesRef = databaseRef.collection("PatientDrags").get();

export const patientDragD = () => async (dispatch) => {

  try {
    const response = await ProfilesRef;

    const arr = [];
    response.docs.forEach(res => {
      arr.push([res.id, res.data()]);

    });
    // console.log(arr);

    dispatch({
      type: PATIENTDRAG,
      payload: arr
    })

  } catch (e) {

  }
};
