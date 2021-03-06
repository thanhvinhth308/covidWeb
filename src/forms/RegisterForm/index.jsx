import { Avatar, Box, Button, Container, makeStyles, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { FastField, Form, Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import PasswordField from '../../components/FormControls/PasswordField';
import TextInputField from '../../components/FormControls/TextInputField';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(5),
    margin: 'auto',
    height: '100%'
  },
  title: {
    margin: theme.spacing(2, 0, 4, 0),
    textAlign: 'center'
  },
  submit: {
    margin: theme.spacing(5, 0, 3, 0)
  },
  avatar: {
    margin: '0 auto',
    background: theme.palette.secondary.main
  }
}));

function RegisterForm(props) {
  const { onAccountRegister } = props;
  const classes = useStyles();
  const initialValues = {
    username: '',
    password: '',
    confirmPassWord: ''
  };
  let validationSchema = yup.object().shape({
    username: yup.string().required('please enter username').typeError('please enter a username'),
    password: yup.string().required('please enter password').typeError('please enter a password'),
    confirmPassWord: yup
      .string()
      .required('please enter password')
      .typeError('please enter a password')
      .oneOf([yup.ref('password')], 'password does nota match')
  });
  const handleDrinkAddToCart = formValue => {
    if (onAccountRegister) {
      onAccountRegister(formValue);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box className={classes.root}>
        <Avatar className={classes.avatar}>
          <LockOutlined></LockOutlined>
        </Avatar>
        <Typography className={classes.title} component="h3" variant="h5">
          Sign In
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={formValue => handleDrinkAddToCart(formValue)}
        >
          {() => {
            return (
              <Form>
                <FastField name="username" id="username" component={TextInputField} label="Username" />
                <FastField name="password" id="password" component={PasswordField} label="Password" />
                <FastField
                  name="confirmPassWord"
                  id="confirmPassWord"
                  component={PasswordField}
                  label="Confirm Password"
                />
                <Button type="submit" variant="contained" color="secondary" className={classes.submit} fullWidth>
                  Sign In
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Container>
  );
}

export default RegisterForm;
