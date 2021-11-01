import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import plusFill from '@iconify/icons-eva/plus-fill';
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import './SignUpD.css'

import SignUpCard from '../../components/SignUpComponents/SignUpCard/SignUpCard'

import FadeIn from 'react-fade-in';
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
import Scrollbar from '../../components/Scrollbar';
import { useHistory } from "react-router-dom";

// components
import Page from '../../components/Page';
import sidebarConfig from '../../layouts/dashboard/SidebarConfig';
import DashboardSidebar from '../../layouts/dashboard/DashboardSidebar';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/core/styles';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Logo from '../../components/Logo';
import NavSection from '../../components/NavSection';
import { MHidden } from '../../components/@material-extend';
import account from '../../_mocks_/account';
import DashboardNavbar from '../../layouts/dashboard/DashboardNavbar';

const DRAWER_WIDTH = 280;


const AccountStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: theme.shape.borderRadiusSm,
    backgroundColor: theme.palette.grey[200]
}));

// ----------------------------------------------------------------------

SignUp.propTypes = {
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



export default function SignUp({ isOpenSidebar, onCloseSidebar }) {
    const token = localStorage.getItem('token')
    const history = useHistory();
    token == null ? history.push("/login") : console.log(" ")

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

    const classes = useStyles();

    return (
        <Page title="Add Doctor | MMNP ">
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
            <Container className="firstContainer">
                <div className="row">
                    <div class="col-sm-0 col-md-2">
                    </div>
                    <div class="col-sm-12 col-md-10">
                        <FadeIn>
                            <SignUpCard />
                        </FadeIn>
                    </div>
                </div>
            </Container>
        </Page>
    );
}
