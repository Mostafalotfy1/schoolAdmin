import firebase from '../../pages/config/fbConfig';


const LoginAction =(
    email,
    password
)=>async dispatch =>{
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(function(user){
        dispatch({
            type:"LOGIN",
            payload:true,
        })
    })
   .catch(function(error){
       alert(error)
   })
}
export default LoginAction;