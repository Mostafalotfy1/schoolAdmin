import firebase from '../../pages/config/fbConfig';

import { DEPARTMENTS} from "../types";
const databaseRef = firebase.firestore();
const DepartmentsData =   databaseRef.collection("Departments").get();
 
export const Departmentsred =()=> async (dispatch)   => {
 
  try {
    const response = await DepartmentsData;

    const arr = [];
    response.docs.forEach(res => {
        arr.push([res.id,res.data() ]);
       
    });
    //console.log(arr);

    dispatch({
      type:DEPARTMENTS,
      payload : arr
    })
  
}catch(e){

}
};
