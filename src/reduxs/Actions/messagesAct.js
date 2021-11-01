import firebase from '../../pages/config/fbConfig';
import { MESSAGES } from "../types";
const databaseRef = firebase.firestore();
// const ProfilesRef = databaseRef.collection("massages").get();
let arr = [];

const ProfilesRef = databaseRef.collection("massages").onSnapshot((result) => {
  fetchData(result);
})
async function fetchData(data) {
  arr=[];
  await data.forEach((doc) => {
    arr.push([doc.id, doc.data()])
  })
  //console.log(arr)
}

export const MessagepSend = () => async (dispatch) => {

  try {
    // const response = await ProfilesRef;

    // const arr = [];
    // response.docs.forEach(res => {
    //   arr.push([res.id, res.data()]);
    // });
    // console.log(arr);

    dispatch({
      type: MESSAGES,
      payload: arr
    })

  } catch (e) {

  }
};
