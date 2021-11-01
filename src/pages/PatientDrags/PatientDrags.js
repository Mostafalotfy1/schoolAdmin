import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createProfile } from "../../reduxs/Actions/patientProfile";
import MenuItem from '@material-ui/core/MenuItem';
import './PatientDrags.css'
import { styled } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/styles';
import InputLabel from '@material-ui/core/InputLabel';
import { TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import {
    Stack,
    Avatar,
    Container,
    Typography,
    Drawer,
    Link,
    IconButton,
    Box
} from '@material-ui/core';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
import Label from '../../components/Label';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../components/_dashboard/user';
import { MHidden } from '../../components/@material-extend';
import sidebarConfig from '../../layouts/dashboard/SidebarConfig';
import DashboardNavbar from '../../layouts/dashboard/DashboardNavbar';
import DashboardSidebar from '../../layouts/dashboard/DashboardSidebar';
import account from '../../_mocks_/account';
import TittleLoginAndSignUpCards from '../../components/TittleLoginAndSignUpCards/TittleLoginAndSignUpCards'
import { patientDragD } from '../../reduxs/Actions/PatientDragsAct'
import firebase, { auth, firestoredb } from "../config/fbConfig"
import { useHistory } from "react-router-dom"
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

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

PatientDrags.propTypes = {
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
    },
}));


export default function PatientDrags({ isOpenSidebar, onCloseSidebar }) {
    //=========Snakbar code ==============
    const [openSnak, setOpenSnak] = React.useState(false);
    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnak(false);
    };
    //=================================
    const classes = useStyles();
    const token = localStorage.getItem('token')
    const history = useHistory();
    token == null ? history.push("/login") : console.log(" ")
    //=========Firebase code for Patient IDS =========
    const dispatch = useDispatch();
    const ProTyps = useSelector((state) => state.PatientProfile.patientProfile);
    const datadragsp = useSelector((state) => state.patientDrags.patientDrag)
    console.log(datadragsp)
    const DepartData = useSelector(
        (state) => state.DepartmentsData.departmentsdata
    );
    useEffect(() => {
        dispatch(createProfile());
        dispatch(patientDragD());
        // document.getElementById("myform").style.display = "block";
    }, []);
    //for test 
    //================Select Code ==================

    const [department, setDepartment] = useState('');
    const handleChangeForDepartment = (event) => {
        setDepartment(event.target.value);
    };
    if (department == 'Laboratory') {
        document.getElementById("LabForm").style.display = "block";
        document.getElementById("myform").style.display = "none";
    }
    else if (department == 'Dentistry'
        || department == 'Ophthalmology'
        || department == 'Radiology'
        || department == 'Pediatrics'
        || department == 'Cardiology'
    ) {
        document.getElementById("LabForm").style.display = "none";
        document.getElementById("myform").style.display = "block";
    }

    const [PatientId, setPatientId] = useState('');
    const handleChangeForId = (event) => {
        setPatientId(event.target.value);
    };

    // ===============Form Values ======================
    const [FormValues, setFormValues] = useState({
        Duration: '',
        Times: '',
        MedicineName: '',
        DoctorName: '',
    });

    const handleChangeFrom = (prop) => (event) => {
        setFormValues({ ...FormValues, [prop]: event.target.value });
    };
    // ===============Form Values Lab ======================
    const [FormValuesLab, setFormValuesLab] = useState({
        Normal: '',
        Average: '',
        AnalyseName: '',
        DoctorName: '',
    });
    const handleChangeFromLab = (prop) => (event) => {
        setFormValuesLab({ ...FormValuesLab, [prop]: event.target.value });
    };
    console.log(FormValues)
    const handelNoteSubmit = async (e) => {
        e.preventDefault();
        await department
        await PatientId;
        datadragsp && datadragsp.map((info) => {
            let dragData = info[1].NationalID;



            if (PatientId === dragData) {
                let patientIdforDrags = info[0]

                if (department != 'Laboratory') {

                    firestoredb.collection(`PatientDrags`).doc(`/${patientIdforDrags}`).collection(`${department}`).add({
                        duration: FormValues.Duration,
                        times: FormValues.Times,
                        name: FormValues.MedicineName,
                        DocName: FormValues.DoctorName,
                        dateOfDrag: new Date()

                    }).then(() => {
                        setTimeout(function () {
                            history.push("/dashboard/patients")
                        }, 3000);
                        setOpenSnak(true);
                        
                        
                    })
                } else {
                    firestoredb.collection(`PatientDrags`).doc(`/${patientIdforDrags}`).collection(`Laboratory`).add({

                        Normal: FormValuesLab.Normal,
                        AnalyseName: FormValuesLab.AnalyseName,
                        Average: FormValuesLab.Average,
                        DocName: FormValuesLab.DoctorName,
                        dateOfDrag: new Date()


                    }).then(() => {
                        setTimeout(function () {
                            history.push("/dashboard/patients")
                        }, 3000);
                        setOpenSnak(true);
                        
                      

                    })
                    
                }
            }



        })
    }
    //fortest 
   
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
        <Page title="Patient Drags | MMNP ">
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
                    <div className="col-sm-12 col-md-10 firstRow">
                        <span className="pt--5">
                            <TittleLoginAndSignUpCards tittleValue="Add patient drags"  />
                        </span>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-helper-label">Department</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={department}
                                onChange={handleChangeForDepartment}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"Cardiology"}>Cardiology</MenuItem>
                                <MenuItem value={"Dentistry"}>Dentistry</MenuItem>
                                <MenuItem value={"Laboratory"}>Laboratory</MenuItem>
                                <MenuItem value={"Ophthalmology"}>Ophthalmology</MenuItem>
                                <MenuItem value={"Pediatrics"}>Pediatrics</MenuItem>
                                <MenuItem value={"Radiology"}>Radiology</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-helper-label">Choose Patient</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={PatientId}
                                onChange={handleChangeForId}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                    ProTyps && ProTyps.map(infop => {
                                        return (
                                            <MenuItem value={infop[1].NationalID}>{infop[1].NationalID}</MenuItem>
                                        );
                                    })
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <div class="col-sm-0 col-md-2">
                    </div>
                    <div className="col-sm-12 col-md-10">
                        <div id="NoteForms">
                            <form name="myForm" id="myform" style={{ display: "block" }}>
                                <div className="text-note">
                                    <TextField id="standard-basic" label={"Medicine Name"}
                                        value={FormValues.MedicineName}
                                        onChange={handleChangeFrom('MedicineName')}
                                        required
                                        className="m-3"
                                    />
                                </div>
                                <div className="text-note">
                                    <TextField id="standard-basic" label={"Times"}
                                        value={FormValues.Times}
                                        onChange={handleChangeFrom('Times')}
                                        type="Number"
                                        required
                                        className="m-3"
                                    />
                                </div>
                                <div className="text-note">
                                    <TextField id="standard-basic" label={"Duration"}
                                        value={FormValues.Duration}
                                        onChange={handleChangeFrom('Duration')}
                                        required
                                        className="m-3"
                                    />
                                </div>
                                <div className="text-note">
                                    <TextField id="standard-basic" label={"DoctorName"}
                                        value={FormValues.DoctorName}
                                        onChange={handleChangeFrom('DoctorName')}
                                        required
                                        className="m-3"
                                    />
                                </div>
                                <span className="text-note">
                                    <LoadingButton
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        className="mt-3 btnDrag"
                                        onClick={handelNoteSubmit}
                                    >
                                        Add Drag
                                    </LoadingButton>
                                </span>
                            </form>
                            <form id="LabForm" style={{ display: "none" }}>
                                <div className="text-note">
                                    <TextField id="standard-basic" label={"Analyse Name"}
                                        value={FormValuesLab.AnalyseName}
                                        onChange={handleChangeFromLab('AnalyseName')}
                                        required
                                        className="m-3"
                                    />
                                </div>
                                <div className="text-note">
                                    <TextField id="standard-basic" label={"Normal"}
                                        value={FormValuesLab.Normal}
                                        onChange={handleChangeFromLab('Normal')}
                                        type="Number"
                                        required
                                        className="m-3"
                                    />
                                </div>
                                <div className="text-note">
                                    <TextField id="standard-basic" label={"Average"}
                                        value={FormValuesLab.Average}
                                        onChange={handleChangeFromLab('Average')}
                                        required
                                        className="m-3"
                                    />
                                </div>
                                <div className="text-note">
                                    <TextField id="standard-basic" label={"DoctorName"}
                                        value={FormValuesLab.DoctorName}
                                        onChange={handleChangeFromLab('DoctorName')}
                                        required
                                        className="m-3"
                                    />
                                </div>
                                <span className="text-note">
                                    <LoadingButton
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        className="mt-3 btnDrag"
                                        onClick={handelNoteSubmit}
                                    >
                                        Add Drag
                                    </LoadingButton>
                                </span>
                            </form>
                        </div>
                    </div>
                </div>
                <div>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={openSnak}
                        autoHideDuration={6000}
                        onClose={handleCloseSnack}
                        message="Drag Added Successfully"
                        action={
                            <React.Fragment>
                                <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnack}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </React.Fragment>
                        }
                    />
                </div>
                {/* <Stack direction="row" alignItems="center" mb={5} className="SecondRow" >
                    <div className="col-sm-0 col-md-3 "></div>
                    <div className="col-sm-12 col-md-6">
                        <div id="NoteForms">
                            <form name="myForm" id="myform" style={{ display: "block" }}>
                                <div className="text-note">
                                    <TextField id="standard-basic" label={"Medicine Name"}
                                        value={FormValues.MedicineName}
                                        onChange={handleChangeFrom('MedicineName')}
                                        required
                                        className="m-3"
                                    />
                                </div>
                                <div className="text-note">
                                    <TextField id="standard-basic" label={"Times"}
                                        value={FormValues.Times}
                                        onChange={handleChangeFrom('Times')}
                                        type="Number"
                                        required
                                        className="m-3"
                                    />
                                </div>
                                <div className="text-note">
                                    <TextField id="standard-basic" label={"Duration"}
                                        value={FormValues.Duration}
                                        onChange={handleChangeFrom('Duration')}
                                        required
                                        className="m-3"
                                    />
                                </div>
                                <div className="text-note">
                                    <TextField id="standard-basic" label={"DoctorName"}
                                        value={FormValues.DoctorName}
                                        onChange={handleChangeFrom('DoctorName')}
                                        required
                                        className="m-3"
                                    />
                                </div>
                                <span className="text-note">
                                    <LoadingButton
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        className="mt-3 btnDrag"
                                        onClick={handelNoteSubmit}
                                    >
                                        Add Drag
                                    </LoadingButton>
                                </span>
                            </form>
                            <form id="LabForm" style={{ display: "none" }}>
                                <div className="text-note">
                                    <TextField id="standard-basic" label={"Analyse Name"}
                                        value={FormValuesLab.AnalyseName}
                                        onChange={handleChangeFromLab('AnalyseName')}
                                        required
                                        className="m-3"
                                    />
                                </div>
                                <div className="text-note">
                                    <TextField id="standard-basic" label={"Normal"}
                                        value={FormValuesLab.Normal}
                                        onChange={handleChangeFromLab('Normal')}
                                        type="Number"
                                        required
                                        className="m-3"
                                    />
                                </div>
                                <div className="text-note">
                                    <TextField id="standard-basic" label={"Average"}
                                        value={FormValuesLab.Average}
                                        onChange={handleChangeFromLab('Average')}
                                        required
                                        className="m-3"
                                    />
                                </div>
                                <div className="text-note">
                                    <TextField id="standard-basic" label={"DoctorName"}
                                        value={FormValuesLab.DoctorName}
                                        onChange={handleChangeFrom('DoctorName')}
                                        required
                                        className="m-3"
                                    />
                                </div>
                                <span className="text-note">
                                    <LoadingButton
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        className="mt-3 btnDrag"
                                        onClick={handelNoteSubmit}
                                    >
                                        Add Drag
                                    </LoadingButton>
                                </span>
                            </form>
                        </div>
                    </div>
                </Stack> */}
            </Container>
        </Page>
    );
}

