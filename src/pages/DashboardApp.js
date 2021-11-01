// material
import { Box, Grid, Container, Typography } from '@material-ui/core';
import { useHistory } from "react-router-dom";
// components
import Page from '../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../components/_dashboard/app';
import dashboardNavbar from '../layouts/dashboard/DashboardNavbar'
// ----------------------------------------------------------------------

export default function DashboardApp() {
  const token = localStorage.getItem('token')
  const history = useHistory();
  token == null ? history.push("/login") : console.log(" ")
  return (

    <Page title="Dashboard | ابنائى">

      <Container maxWidth="xl">
        <div className="row mt-5">
        <div style={{display:"flex",justifyContent:"center"}}>
        <Typography variant="h4">مرحبا بك</Typography>
        </div>
          <div class="col-sm-0 col-md-2 mt-3 mb-3">
          </div>
          <div class="col-sm-12 col-md-4 mt-3 mb-3">
          <AppWeeklySales />
          </div>
          <div class="col-sm-12 col-md-4 mt-3 mb-3">
          <AppNewUsers />
            </div>
            <div class="col-sm-0 col-md-2 mt-3 mb-3"></div>
            <div class="col-sm-0 col-md-2 mt-3 mb-3"></div>
            <div class="col-sm-12 col-md-4 mt-3 mb-3">
            <AppItemOrders />
            </div>
            <div class="col-sm-12 col-md-4 mt-3 mb-3">
            <AppBugReports />
            </div>
            <div class="col-sm-0 col-md-2 mt-3 mb-3"></div>
            <div class="col-sm-0 col-md-1 mt-3 mb-3"></div>
            <div class="col-sm-12 col-md-7 mt-3 mb-3">
              <AppWebsiteVisits />
            </div>
            <div class="col-sm-12 col-md-4 mt-3 mb-3">
            <AppCurrentVisits />
            </div>
        </div>
        <div style={{
          backgroundColor:"black",
        color:"white",
        height:"100px"
        }}>Footer</div>
      </Container>
    </Page>

  );
}
