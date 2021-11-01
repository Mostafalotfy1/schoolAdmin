import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import './SignUpCard.css'
import { TextField, InputAdornment, IconButton, Input } from '@material-ui/core';
import TittleLoginAndSignUpCards from '../../TittleLoginAndSignUpCards/TittleLoginAndSignUpCards'
import SocialMediaSection from '../../SocialMediaSection/SocialMediaSection'
import { auth, firestoredb } from "../../../pages/config/fbConfig"
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import HomeBtn from '../../HomeComponents/HomeBtn/HomeBtn'
import Quotes from '../../Quotes/Quotes'
import { useHistory, Redirect } from 'react-router-dom';
import { DoctorProfiler } from '../../../reduxs/Actions/DoctorsProfilesAct';
import Alert from '@material-ui/lab/Alert';
import { LoadingButton } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({

}));

export default function SignUpCard() {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const history = useHistory()
    const [values, setValues] = React.useState({
        password: '',
        userNameAr: '',
        userNameEn: '',
        userAddressAr: '',
        userAddressEn: '',
        userAge: '',
        userPhone: '',
        userEmail: '',
        showPassword: false,
        NationalID: '',
        subDepartment: '',
        description: '',
        subDepartment_ar: '',
        description_ar: '',
    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const [DepNameDoc, setDepNameDoc] = useState('');
    const handleChangeDepNameDoc = (event) => {
        setDepNameDoc(event.target.value);
    };
    const handelSubmit = async (e) => {
        e.preventDefault()
        const { userEmail, password, userNameEn, userNameAr, userPhone, userAddressAr, userAddressEn, userAge, NationalID, subDepartment , description,subDepartment_ar , description_ar} = values
        await auth.createUserWithEmailAndPassword(userEmail, password)
        firestoredb.collection("Doctors")
            .add({
                address_ar: userAddressAr,
                address_en: userAddressEn,
                age: userAge,
                email: userEmail,
                name_ar: userNameAr,
                name_en: userNameEn,
                phone: userPhone,
                RegisteredDate: new Date(),
                NationalID: NationalID,
                departmentName: DepNameDoc,
                subDepartment: subDepartment,
                description: description,
                subDepartment_ar: subDepartment_ar,
                description_ar: description_ar,
            })

            .then(() => {
                setOpen(true);
                setTimeout(function () {
                    history.push("/dashboard/DoctorList")
                    window.location.reload();
                }, 3000);
            })
            .catch((e) => {
                document.getElementById("FailedLogin").style.display = "block";
            }
            )
    }

    return (
        <div className="card shadow p-3 m-3 rounded">
            <div className="card-head text-center">
                <TittleLoginAndSignUpCards tittleValue={"ADD NEW DOCTOR"} />
            </div>
            <div className="card-body signUp-body">
                <form autoComplete="off" onSubmit={handelSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <label className="from-label-signUp">
                                        {'Doctor Name'}
                                    </label>
                                </td>
                                <td className="inputs-signUp">
                                    <TextField label="Name"
                                        value={values.userNameEn}
                                        onChange={handleChange('userNameEn')}
                                        required
                                    />
                                </td>
                                <td className="inputs-signUp">
                                    <TextField label="الإسم"
                                        value={values.userNameAr}
                                        onChange={handleChange('userNameAr')}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="from-label-signUp">
                                        {'Doctor Address'}
                                    </label>
                                </td>
                                <td className="inputs-signUp">
                                    <TextField label="Address"
                                        value={values.userAddressEn}
                                        onChange={handleChange('userAddressEn')}
                                        required
                                    />
                                </td>
                                <td className="inputs-signUp">
                                    <TextField label="العنوان"
                                        value={values.userAddressAr}
                                        onChange={handleChange('userAddressAr')}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="from-label-signUp">
                                        {'Email'}
                                    </label>
                                </td>
                                <td className="inputs-signUp" colSpan="2">
                                    <TextField label="Email" className="one-lang-inputs"
                                        value={values.userEmail}
                                        onChange={handleChange('userEmail')}
                                        required
                                        type="email"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="from-label-signUp">
                                        {'password'}
                                    </label>
                                </td>
                                <td className="inputs-signUp" colSpan="2">
                                    <Input
                                        id="standard-adornment-password"
                                        className="one-lang-inputs"
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        onChange={handleChange('password')}
                                        required
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="from-label-signUp">
                                        {'Doctor Age'}
                                    </label>
                                </td>
                                <td className="inputs-signUp" colSpan="2">
                                    <TextField label="Age" className="one-lang-inputs"
                                        value={values.userAge}
                                        onChange={handleChange('userAge')}
                                        type="number"
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="from-label-signUp">
                                        {'Doctor Phone'}
                                    </label>
                                </td>
                                <td className="inputs-signUp" colSpan="2">
                                    <TextField label="Phone" className="one-lang-inputs"
                                        value={values.userPhone}
                                        onChange={handleChange('userPhone')}
                                        type="number"
                                        required
                                    />
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    <label className="from-label-signUp">
                                        {'National ID'}
                                    </label>
                                </td>
                                <td className="inputs-signUp" colSpan="2">
                                    <TextField label="National ID" className="one-lang-inputs"
                                        value={values.NationalID}
                                        onChange={handleChange('NationalID')}
                                        type="number"
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="from-label-signUp">
                                    Department
                                </td>
                                <td className="inputs-signUp signupCard" colSpan="2">
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-helper-label">Department</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            value={DepNameDoc}
                                            onChange={handleChangeDepNameDoc}
                                            required
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="Ophthalmology">Ophthalmology</MenuItem>
                                            <MenuItem value="Cardiology">Cardiology</MenuItem>
                                            <MenuItem value="Dentistry">Dentistry</MenuItem>
                                            <MenuItem value="Laboratory">Laboratory</MenuItem>
                                            <MenuItem value="Pediatrics">Pediatrics</MenuItem>
                                            <MenuItem value="Radiology">Radiology</MenuItem>
                                        </Select>
                                    </FormControl>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="from-label-signUp">
                                        {'Sub Department'}
                                    </label>
                                </td>
                                <td className="inputs-signUp" colSpan="2">
                                    <TextField label="Sub Department" className="one-lang-inputs"
                                        value={values.subDepartment}
                                        onChange={handleChange('subDepartment')}
                                        type="text"
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="from-label-signUp">
                                        {'Arabic Sub Department'}
                                    </label>
                                </td>
                                <td className="inputs-signUp" colSpan="2">
                                    <TextField label="التخصص" className="one-lang-inputs"
                                        value={values.subDepartment_ar}
                                        onChange={handleChange('subDepartment_ar')}
                                        type="text"
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="from-label-signUp">
                                        {'Description'}
                                    </label>
                                </td>
                                <td className="inputs-signUp" colSpan="2">
                                    <TextField label="Description" className="one-lang-inputs"
                                        value={values.description}
                                        onChange={handleChange('description')}
                                        multiline
                                        rows={5}
                                        type="text"
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="from-label-signUp">
                                        {'Arabic Description'}
                                    </label>
                                </td>
                                <td className="inputs-signUp" colSpan="2">
                                    <TextField label="نبذة عنه" className="one-lang-inputs"
                                        value={values.description_ar}
                                        onChange={handleChange('description_ar')}
                                        multiline
                                        rows={5}
                                        type="text"
                                        required
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="btn-signUp-container">
                        <LoadingButton
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            className="mt-5"
                        >
                            Add Doctor
                        </LoadingButton>
                    </div>
                </form>
                <div id="FailedLogin" className="m-3" style={{ display: "none" }}>
                    <Alert variant="filled" severity="error" className="FailedAlert">
                        The email address is already in use by another account try another one
                    </Alert>
                </div>
                <div>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        message="Doctor Added Successfully"
                        action={
                            <React.Fragment>
                                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </React.Fragment>
                        }
                    />
                </div>
            </div>
        </div>
    )
}
