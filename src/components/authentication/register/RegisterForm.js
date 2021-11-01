import * as Yup from 'yup';
import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useHistory } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { auth, firestoredb } from "../../../pages/config/fbConfig"
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useHistory();
  const [showPassword, setShowPassword] = useState(false);


  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    }
  });
  // console.log(formik.values.firstName)
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const history = useHistory()

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  const handelSubmitAdmins = async (e) => {
    try {
      e.preventDefault()
      const { firstName, password, lastName, email } = formik.values
      // console.log(firstName)
      const { user } = await auth.createUserWithEmailAndPassword(email, password)
      firestoredb.collection("admins").doc(`/${user.uid}`).set
        ({
          firstName: firstName,
          lastName: lastName,
          email: email
        })

        .then(() => {
          setOpen(true);
          setTimeout(function () {
            history.push("/dashboard/AdminList")
          }, 3000);
        })
        .catch((e) => {
          document.getElementById("FailedLogin").style.display = "block";
        }
        )
    }
    catch (e) {
      document.getElementById("EmptyFields").style.display = "block";

    }

  }
  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handelSubmitAdmins}>
          <Stack spacing={3}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                label="First name"
                {...getFieldProps('firstName')}
                error={Boolean(touched.firstName && errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                required
              />

              <TextField
                fullWidth
                label="Last name"
                {...getFieldProps('lastName')}
                error={Boolean(touched.lastName && errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                required
              />
            </Stack>

            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Email address"
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              required
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
                    <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              required
            />

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Register
            </LoadingButton>
          </Stack>
        </Form>
        <div id="FailedLogin" className="m-3" style={{ display: "none" }}>
          <Alert variant="filled" severity="error" className="FailedAlert">
            An error has occurred — Please try again later!
          </Alert>
        </div>
        <div id="EmptyFields" className="m-3" style={{ display: "none" }}>
          <Alert variant="filled" severity="error" className="FailedAlert">
            You can't register without fill the inputs — Please try again
          </Alert>
        </div>

      </FormikProvider>

      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Admin Added Successfully"
          action={
            <React.Fragment>
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </div>
    </>
  );
}
