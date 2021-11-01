import firebase from '../../pages/config/fbConfig';

const databaseRef = firebase.collection("Patients");

// const PatientRef =databaseRef.child("Patient");


const signUpAction = (
    pname,
    email,
    password
) => async dispatch => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(
        function (patient) {
            databaseRef.push().set({
                patientId: patient.user.uid,
                userName: pname
            });
            dispatch({
                type: "SIGNUP",
                payload: true
            })
        }
    )
        .catch(function (error) {
            alert(error)
        })
}
export default signUpAction;