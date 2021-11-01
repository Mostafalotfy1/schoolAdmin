import { combineReducers } from "redux";

import PatientProfile from "./patientProfilered";
import PatientDetails from "./patientDetailsRed";
import DepartmentsData from "./DepartmentsRed"
import adminsProfiles from './AdminsRed'
import DoctorProfile from "./DoctorsRed"
import authreduce from './authRed'
import patientDrags from './patientDragsRed'
import messagesRP from './messagesRed'
import Parents from './ParetnsRed'
import Applistc from './appRed'
export default combineReducers({
    authreduce,
    PatientProfile,
    PatientDetails,
    DepartmentsData,
    adminsProfiles,
    DoctorProfile,
    patientDrags,
    messagesRP,
    Parents,
    Applistc
});
