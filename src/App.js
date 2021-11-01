// routes
// import Router from './routes'
// theme
import ThemeConfig from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import HomePage from './pages/Home/Home';
import ErrorPage from './pages/Page404'
import Login from './pages/Login'
import SignUp from './pages/Register'
import Dashboard from './layouts/dashboard'
import Content from './pages/DashboardApp'
import SignUpDoctors from './pages/SignupDoctors/SignUpD'
import patients from "./pages/PatientList/PatientList"
import DoctorList from "./pages/DoctorList/DoctorList"
import PatientDrags from './pages/PatientDrags/PatientDrags'
import Messages from './pages/Messages/Messages'
import AdminList from './pages/AdminList/AdminList'
// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeConfig>
      <ScrollToTop />
      <Router>
        <div className="App">
        </div>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/Login' component={Login} />
          <Route exact path='/dashboard/SignUp' component={SignUp} />
          <Route exact path='/dashboard/AdminList' component={AdminList} />
          <Route exact path='/dashboard/patients' component={patients} />
          <Route exact path='/dashboard/SignUpDoctors' component={SignUpDoctors} />
          <Route exact path='/dashboard/DoctorList' component={DoctorList} />
          <Route exact path='/dashboard/PatientDrugs' component={PatientDrags} />
          <Route exact path='/dashboard/Messages' component={Messages} />
          <Route exact path='/dashboard' render={() =>
            <div>
              <div><Dashboard /></div>
              <div style={{
                marginLeft: "30vh",
                marginTop: "-12vh",
                marginBottom: "20px"
              }}><Content /></div>

            </div>
          } />
          {/* <Route path="/dashboard">
       <Content />
      <Dashboard />
        
  </Route> */}
          <Route path='*' component={ErrorPage} />
        </Switch>
      </Router>

    </ThemeConfig>
  );
}
