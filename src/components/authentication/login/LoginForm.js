import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { auth, firestoredb } from "../../../pages/config/fbConfig"
import Alert from '@material-ui/lab/Alert';
import {AdminProfile} from '../../../reduxs/Actions/AdminsAct'
import { useSelector, useDispatch } from "react-redux";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useHistory();
  const token = localStorage.getItem('token')
  const history = useHistory();
  token != null ?  history.push("/dashboard") : console.log(" ")
  const [showPassword, setShowPassword] = useState(false);
  const ProTyps = useSelector((state) => state.adminsProfiles.doctorprofile)
  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(AdminProfile())
  }, [])
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleSignIn = async (e) => {
    e.preventDefault()
    const { email, password } = formik.values
    let item = {email , password}
    console.log(item)
    let result = await fetch('https://abnaey-dashboard.herokuapp.com/api/manager/login?',{
      method:'POST',
      headers:{
        'Content-Type':"application/json",
        "Accept":"application/json"
      },
      body:JSON.stringify(item)
    })
    result = await result.json();
    console.log(result)
    localStorage.setItem("token",JSON.stringify(result));
    navigate.push('/dashboard', { replace: true })
    // await auth.signInWithEmailAndPassword(email, password)
    //   .then((newUser ) => {
    //     // console.log(newUser.user.uid)
    //     localStorage.setItem('token',newUser.user.uid)
    //     localStorage.setItem('mail',newUser.user.email)
    //     console.log(newUser)
    //     navigate.push('/dashboard', { replace: true })
    //   })
    //   .catch((e) => {
    //     // console.log(e)
    //     document.getElementById("FailedLogin").style.display = "block";
    //   }
      
  }
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSignIn}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#">
            Forgot password?
          </Link>
        </Stack> */}
        <div id="FailedLogin" className="m-3" style={{ display: "none" }}>
          <Alert variant="filled" severity="error" className="FailedAlert">
            The email address or password you entered isn't correct — Please try again !
          </Alert>
        </div>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          className="mt-3"
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
