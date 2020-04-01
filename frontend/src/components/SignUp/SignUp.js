import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import { Formik } from 'formik';
import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import './SignUp.scss';
import { Redirect } from 'react-router-dom';

const validationRules = yup.object().shape({
  firstName: yup.string().required('Le prénom est requis'),
  lastName: yup.string().required('Le nom est requis'),
  email: yup.string().required('Adresse email requis').email('Adresse email invalide'),
  password: yup.string().required('Le mot de passe est requis'),
  acceptTerms: yup.boolean().oneOf([true], 'Vous devez accepter les conditions d utilisation')
});

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(2),
    height: theme.spacing(6)
  }
}));

const SignUp = () => {
  const classes = useStyles();
  const [isSignedUp, setIsSignedUp] = useState(false);
  if (isSignedUp) {
    return <Redirect to='/Login' />;
  }

  return (
    <div className='my-5'>
      <Formik
        validateOnMount={true}
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          acceptTerms: false
        }}
        validationSchema={validationRules}
        onSubmit={(values, { setSubmitting }) => {
          const formValues = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password
          };

          const data = new URLSearchParams();
          data.append('firstName', formValues.firstName);
          data.append('lastName', formValues.lastName);
          data.append('email', formValues.email);
          data.append('password', formValues.password);

          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: data
          };

          fetch('http://localhost:3000/person/signUp', requestOptions)
            .then(response => response.json())
            .then(responseData => {
              if (responseData) {
                console.log(responseData);
                setIsSignedUp(true);
              }
            })
            .catch(error => console.warn(error));

          setSubmitting(true);
        }}>
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Container component='main' maxWidth='sm'>
            <h1 className='my-5'>Inscription</h1>
            <div>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant='outlined'
                      fullWidth
                      id='firstName'
                      name='firstName'
                      label='Prénom'
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}></TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant='outlined'
                      fullWidth
                      id='lastName'
                      name='lastName'
                      label='Nom'
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      id='email'
                      name='email'
                      label='Adresse email'
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
                      label='Mot de passe'
                      type='password'
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.password && errors.password ? <div className='error'>{errors.password}</div> : null}
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id='acceptTerms'
                          name='acceptTerms'
                          value='acceptTerms'
                          checked={values.acceptTerms}
                          onChange={handleChange('acceptTerms')}
                        />
                      }
                      label="J'ai lu et j'accepte les conditions d'utilisations"
                    />
                    {touched.acceptTerms && errors.acceptTerms ? (
                      <div className='error'>{errors.acceptTerms}</div>
                    ) : null}
                  </Grid>
                </Grid>
                <Button
                  className={classes.button}
                  type='submit'
                  disabled={isSubmitting || Object.entries(errors).length !== 0}
                  fullWidth
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

export default SignUp;
