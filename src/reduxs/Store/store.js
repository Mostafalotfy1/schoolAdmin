import { applyMiddleware,createStore } from "redux";
import thunk from "redux-thunk";
import Redusers from "../Reducers/CombineRed";


import { composeWithDevTools } from "redux-devtools-extension"



const store = createStore(
  Redusers,
  composeWithDevTools(applyMiddleware(thunk))
);


export default store;
