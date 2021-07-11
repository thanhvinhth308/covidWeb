import { Avatar, Button, makeStyles, Typography } from '@material-ui/core';
import { pink } from '@material-ui/core/colors';
import { FastField, Form, Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import PasswordField from '../../components/FormControls/PasswordField';
import TextInputField from '../../components/FormControls/TextInputField';
LoginForm.propTypes = {};
const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(5),
    minHeight: '60vh'
  },
  avatar: {
    margin: '0 auto',
    background: theme.palette.secondary.main
  },
  title: {
    margin: theme.spacing(2, 0, 4, 0),
    textAlign: 'center'
  },
  submit: {
    margin: theme.spacing(5, 0, 3, 0)
  },
  progress: {
    position: 'absolute',
    top: theme.spacing(1),
    left: 0,
    right: 0
  },
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
    margin: 'auto'
  }
}));

function LoginForm(props) {
  const { onAccountCheck } = props;
  const classes = useStyles();
  const initialValues = {
    username: '',
    password: ''
  };
  let validationSchema = yup.object().shape({
    username: yup.string().required('please enter username').typeError('please enter a username'),
    password: yup.string().required('please enter password').typeError('please enter a password')
  });
  const handleDrinkAddToCart = formValue => {
    if (onAccountCheck) {
      onAccountCheck(formValue);
    }
  };

  return (
    <div className={classes.root}>
      <Avatar className={classes.pink} />
      <Typography className={classes.title} component="h3" variant="h5">
        Log In
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
              <Button type="submit" variant="contained" color="secondary" className={classes.submit} fullWidth>
                Login
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default LoginForm;
