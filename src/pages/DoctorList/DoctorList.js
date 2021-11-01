import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import plusFill from '@iconify/icons-eva/plus-fill';
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./DoctorList.css";
import { makeStyles } from "@material-ui/styles"
import {
    Card,
    Table,
    Stack,
    Avatar,
    Button,
    // Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination,
    Drawer,
    Link,
    Box
} from '@material-ui/core';
import { TextField } from '@material-ui/core';

import Paper from '@material-ui/core/Paper';
import Scrollbar from '../../components/Scrollbar';
import { DataGrid } from '@material-ui/data-grid';

// components
import Page from '../../components/Page';
import TittleLoginAndSignUpCards from '../../components/TittleLoginAndSignUpCards/TittleLoginAndSignUpCards'
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../components/_dashboard/user';
import sidebarConfig from '../../layouts/dashboard/SidebarConfig';
import DashboardNavbar from '../../layouts/dashboard/DashboardNavbar';
import DashboardSidebar from '../../layouts/dashboard/DashboardSidebar';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/core/styles';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Logo from '../../components/Logo';
import { useHistory } from "react-router-dom";
import NavSection from '../../components/NavSection';
import { MHidden } from '../../components/@material-extend';
import account from '../../_mocks_/account';
import TableHead from '@material-ui/core/TableHead';
import { getParents } from "../../reduxs/Actions/ParentsUsersAct";
import { getApp } from "../../reduxs/Actions/applicationsAct";
import axios from 'axios'


const DRAWER_WIDTH = 280;
const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('lg')]: {
        flexShrink: 0,
        width: DRAWER_WIDTH
    }
}));

const AccountStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: theme.shape.borderRadiusSm,
    backgroundColor: theme.palette.grey[200]
}));

// ----------------------------------------------------------------------

DoctorList.propTypes = {
    isOpenSidebar: PropTypes.bool,
    onCloseSidebar: PropTypes.func
};
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    }, table: {
        minWidth: 650,
    }, typography: {
        padding: theme.spacing(2),
    },
}));

const columns = [
    { field: 'id', headerName: 'id', width: 120 },
    {
        field: 'Name',
        headerName: 'Name',
        width: 180,
        editable: true,
    },
    {
        field: 'accepted',
        headerName: 'accepted',
        width: 230,
        editable: true,
    },
    // {
    //     field: 'Phone',
    //     headerName: 'Phone',
    //     // description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 200
    // },
    // {
    //     field: 'Age',
    //     headerName: 'Age',
    //     // description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 100
    // },
    {
        field: 'NationalID',
        headerName: 'NationalID',
        // description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 200
    },
];


export default function DoctorList({ isOpenSidebar, onCloseSidebar },pId) {
    const token = localStorage.getItem('token')
    const history = useHistory();
    token == null ? history.push("/login") : console.log(" ")
    const [parents ,setParents]=React.useState([]);
    const [applications , setApplication]=React.useState([])
    const [appParent , setAppParent]=React.useState([]);
    //=================redux===================
  
    
    const dispatch = useDispatch();
    const classes = useStyles();
    let id ;
    useEffect(() => {
        axios
        .get("https://abnaey-dashboard.herokuapp.com/api/users").then((res)=>{
            
            setParents(res.data.users)
            
            
            
        }).catch(e=>console.log(e))
        axios
        .get("https://abnaey-dashboard.herokuapp.com/api/applications").then((res2)=>{
            
            setApplication(res2.data.applications)
            
            
        }).catch(e=>console.log(e))
    parents.map(getId=>{
        let i = getId.uid
        console.log(i)
        applications.map(getApp=>{
            let j = getApp.uid
            console.log(j)
            if(i === j ){
                
              axios.get(`https://abnaey-dashboard.herokuapp.com/api/application/${getApp.id}`).then((res3)=>{
                    
                    setAppParent(res3.data.application)
                    
                    
                }).catch(e=>console.log(e))
               
            }
        })

    })
  
                
  
  console.log(id)

      
    }, []);
  console.log(appParent)

    //============Navbar code for mobile ============
    const [open, setOpen] = useState(false);
    //  ===============Slider Code ======================
    const { pathname } = useLocation();
    useEffect(() => {
        if (isOpenSidebar) {
            onCloseSidebar();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);
    let myObj = {};
   
    const rows = appParent.map(p => {
        myObj =
        {
            id: p.uid,
            Name: p.parent_full_name,
            
            accepted: p.accepted,
           
            NationalID: p.nationality,
        }
       
        return myObj;
    })

    // =========== slider ===================
    const renderContent = (
        <Scrollbar
            sx={{
                height: '100%',
                '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' }
            }}
        >
            <Box sx={{ px: 2.5, py: 3 }}>
                <Box component={RouterLink} to="/dashboard" sx={{ display: 'inline-flex' }}>
                    <Logo />
                </Box>
            </Box>
            <Box sx={{ mb: 5, mx: 2.5 }}>
                <Link underline="none" component={RouterLink} to="#">
                    <AccountStyle>
                        <Avatar src={account.photoURL} alt="photoURL" />
                        <Box sx={{ ml: 2 }}>
                            <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                                {account.displayName}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {account.role}
                            </Typography>
                        </Box>
                    </AccountStyle>
                </Link>
            </Box>
            <NavSection navConfig={sidebarConfig} />
            <Box sx={{ flexGrow: 1 }} />
        </Scrollbar>
    );


    return (
        <Page title="الطلابات">
            <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
            <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
            <MHidden width="lgUp">
                <Drawer
                    open={isOpenSidebar}
                    onClose={onCloseSidebar}
                    PaperProps={{
                        sx: { width: DRAWER_WIDTH }
                    }}
                >
                    {renderContent}
                </Drawer>
            </MHidden>
            <MHidden width="lgDown">
                <Drawer
                    open
                    variant="persistent"
                    PaperProps={{
                        sx: {
                            width: DRAWER_WIDTH,
                            bgcolor: 'background.default'
                        }
                    }}
                >
                    {renderContent}
                </Drawer>
            </MHidden>

            {/* page */}
            <Container>
                <div className="row">
                    <div class="col-sm-0 col-md-2">

                    </div>
                    <div class="col-sm-12 col-md-10">
                        <div className="firstContainer">
                            <TittleLoginAndSignUpCards tittleValue="Doctor List" />
                        </div>
                        <div className="newBtn">
                        </div>
                        <Card className="firstContainer2 mb-5" >
                            {/* <div className="searchField">
                                <Button variant="contained">
                                    <Link className="btnLink" component={RouterLink} to="/dashboard/SignUpDoctors" >
                                        Add Doctor
                                    </Link>
                                </Button>
                            </div> */}
                            <div style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                     rows={rows}
                                    columns={columns}
                                                                        // checkboxSelection
                                    disableSelectionOnClick
                                />
                            </div>
                        </Card>
                    </div>
                </div>
            </Container>
        </Page>
    );
}

