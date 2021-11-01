import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@material-ui/core';
//
import { BaseOptionChart } from '../../charts';
import { auth, firestoredb } from "../../../pages/config/fbConfig"

// ----------------------------------------------------------------------


export default function AppWebsiteVisits() {
  firestoredb.collection('Patients').get().then(snap => {
    localStorage.setItem('pNumber', snap.size)
  });
  const pNumber = localStorage.getItem('pNumber')
  firestoredb.collection('admins').get().then(snap => {
    localStorage.setItem('admin', snap.size)
  });
  const admin = localStorage.getItem('admin')
  firestoredb.collection('Appointments').get().then(snap => {
    localStorage.setItem('Appointments', snap.size)
  });
  const Appointments = localStorage.getItem('Appointments')
  firestoredb.collection('Doctors').get().then(snap => {
    localStorage.setItem('dNumber', snap.size)
  });
  const dNumber = localStorage.getItem('dNumber')
  const CHART_DATA = [
    {
      name: 'Column',
      type: 'column',
      data: [parseInt(pNumber), parseInt(admin), parseInt(Appointments), parseInt(dNumber)]
    },
    {
      name: 'Area',
      type: 'area',
      data: [parseInt(pNumber), parseInt(admin), parseInt(Appointments), parseInt(dNumber)]
    },
    {
      name: 'Line',
      type: 'line',
      data: [parseInt(pNumber), parseInt(admin), parseInt(Appointments), parseInt(dNumber)]
    }
  ];
  
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    labels: [
      'Patients',
      'Admins',
      'Appointments',
      'Doctors'
    ],
    xaxis: { type: 'string' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} Numbers`;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Statistics"  />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
