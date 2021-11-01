import firebase from '../../pages/config/fbConfig';

import { PATIENTDETAILS } from "../types";
const databaseRef = firebase.firestore();
const ProfilesRef = databaseRef.collection("PatientDrags").get();

export const getPatientDetials = () => async (dispatch) => {
  try {
    const response = await ProfilesRef;
    const arr = [];
    response.docs.forEach(res => {
      arr.push([res.id, res.data()]);
    });
    console.log(arr);
    dispatch({
      type: PATIENTDETAILS,
      payload: arr
    })
  } catch (e) {
  }
};
