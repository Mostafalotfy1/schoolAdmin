import firebase from '../../pages/config/fbConfig';

import { CREATEPROFILE } from "../types";
const databaseRef = firebase.firestore();
// const ProfilesRef =   databaseRef.collection("Patients").get();
let arr = [];

const ProfilesRef = databaseRef.collection("Patients").onSnapshot((result) => {
  fetchData(result);
})
async function fetchData(data) {
  arr = [];
  await data.forEach((doc) => {
    arr.push([doc.id, doc.data()])
  })
 // console.log(arr)
}

export const createProfile = () => async (dispatch) => {

  try {
    const response = await ProfilesRef;

    // const arr = [];
    // response.docs.forEach(res => {
    //     arr.push([res.id,res.data() ]);

    // });
    // console.log(arr);

    dispatch({
      type: CREATEPROFILE,
      payload: arr
    })

  } catch (e) {

  }
};
