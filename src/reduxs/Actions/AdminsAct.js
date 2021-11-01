import firebase from '../../pages/config/fbConfig';
import { ADMINS } from "../types";
const databaseRef = firebase.firestore();
// const ProfilesRef = databaseRef.collection("admins").get()
let arr = [];

const ProfilesRef = databaseRef.collection("admins").onSnapshot((result) => {
  fetchData(result);
})
async function fetchData(data) {
  arr=[];
  await data.forEach((doc) => {
    arr.push([doc.id, doc.data()])
  })
  //console.log(arr)
}


export const AdminProfile = () => async (dispatch) => {

  try {
    // const response = await ProfilesRef;

    // const arr = [];
    // response.docs.forEach(res => {
    //   arr.push([res.id, res.data()]);

    // });
    //console.log(arr);

    dispatch({
      type: ADMINS,
      payload: arr
    })

  } catch (e) {

  }
};
