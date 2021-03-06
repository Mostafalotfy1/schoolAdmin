import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import plusFill from '@iconify/icons-eva/plus-fill';
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Messages.css";
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
import Paper from '@material-ui/core/Paper';
import Scrollbar from '../../components/Scrollbar';

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
import NavSection from '../../components/NavSection';
import { MHidden } from '../../components/@material-extend';
import account from '../../_mocks_/account';
import TableHead from '@material-ui/core/TableHead';
import { MessagepSend } from "../../reduxs/Actions/messagesAct";
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { useHistory } from "react-router-dom";
import { DataGrid } from '@material-ui/data-grid';

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

Massages.propTypes = {
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
        field: 'Email',
        headerName: 'Email',
        width: 230,
        editable: true,
    },
    {
        field: 'Message',
        headerName: 'Message',
        // description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 400
    },


];


export default function Massages({ isOpenSidebar, onCloseSidebar }) {
    const token = localStorage.getItem('token')
    const history = useHistory();
    token == null ? history.push("/login") : console.log(" ")
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

    //=================redux===================
    let ProTyps = useSelector((state) => state.messagesRP.MessagesP)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(MessagepSend())
    }, [])

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
    let id = 1;
    let rows = ProTyps && ProTyps.map(Messages => {
        myObj =
        {
            id: id,
            Name: Messages[1].name_en,
            Email: Messages[1].email,
            Message: Messages[1].message,

        }
        id++;
        return myObj;
    })
    setInterval(function () {
        dispatch(MessagepSend())
    }, 5000);

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

    const classes = useStyles();

    return (
        <Page title="Massages | MMNP ">
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
                            <TittleLoginAndSignUpCards tittleValue="Contact Us Messages" />
                        </div>
                        <div className="newBtn">
                        </div>
                        <Card className="firstContainer2 mb-5" >
                            <div style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    pageSize={4}
                                    // checkboxSelection
                                    disableSelectionOnClick
                                />
                            </div>
                        </Card>
                    </div>
                </div>
                {/* <Card className="firstContainer2" >
                    
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="left">Email</TableCell>
                                    <TableCell align="left">Messages</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ProTyps && ProTyps.map((infoP) => (
                                    <TableRow key={infoP[1].name_en}>
                                        <TableCell component="th" scope="row">
                                            {infoP[1].name_en}
                                        </TableCell>
                                        <TableCell align="left">{infoP[1].email}</TableCell>
                                        <TableCell align="left">
                                            <List dense={dense}>
                                                {
                                                    infoP[1].message && infoP[1].message.map(massage => {
                                                        console.log(infoP[0],infoP[1].message)
                                                    return (
                                                        <ListItem>
                                                            <ListItemIcon>
                                                                <ChatBubbleIcon />
                                                            </ListItemIcon>
                                                            <ListItemText
                                                                primary={massage}
                                                                secondary={secondary ? 'Secondary text' : null}
                                                            />
                                                        </ListItem>
                                                        );
                                                    })
                                                }
                                            </List>

                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card> */}
            </Container>
        </Page>
    );
}
