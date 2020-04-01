import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import { Formik } from 'formik';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import './SignIn.scss';
import { Redirect } from 'react-router-dom';

const validationRules = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email address'),
  password: yup.string().required('Password is required')
});

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(2),
    height: theme.spacing(6)
  }
}));

const SignIn = () => {
  const classes = useStyles();

  return (
    <div className='my-5'>
      <Formik
        validateOnMount={true}
        initialValues={{ email: '', password: '' }}
        validationSchema={validationRules}
        onSubmit={(values, { setSubmitting }) => {
          const formValues = {
            email: values.email,
            password: values.password
          };

          const data = new URLSearchParams();
          data.append('email', formValues.email);
          data.append('password', formValues.password);

          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: data
          };

          fetch('http://localhost:3000/person/signIn', requestOptions)
            .then(response => response.json())
            .then(responseData => {
              if (responseData) {
                localStorage.setItem('token', responseData.token);
                return <Redirect to='/Inventory' />;
              }
            })
            .catch(error => console.warn(error));

          setSubmitting(true);
        }}>
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Container component='main' maxWidth='sm'>
            <h1 className='my-5'>Connection</h1>
            <div>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      id='email'
                      name='email'
                      label='Entrez votre adresse email'
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.email && errors.email ? <div className='error'>{errors.email}</div> : null}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      id='password'
                      name='password'
                      label='Entrez votre mot de passe'
                      type='password'
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.password && errors.password ? <div className='error'>{errors.password}</div> : null}
                  </Grid>
                </Grid>
                <Button
                  className={classes.button}
                  type='submit'
                  fullWidth
                  disabled={isSubmitting || Object.entries(errors).length !== 0}
                  variant='contained'
                  color='primary'
                  startIcon={<SendIcon />}>
                  Valider
                </Button>
              </form>
            </div>
          </Container>
        )}
      </Formik>
    </div>
  );
};

export default SignIn;
