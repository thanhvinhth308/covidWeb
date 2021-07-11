import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../../forms/RegisterForm';
import SignInBackground from '../../assets/images/background/signInBackground.jpeg';
Register.propTypes = {};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `url(${SignInBackground})`,
    backgroundSize: 'cover',
    height: '100vh'
  }
}));

function Register(props) {
  const history = useHistory();
  const classes = useStyles();

  const handleAccountRegister = async formValues => {
    const { username, password } = formValues;
    const allAccount = JSON.parse(localStorage.getItem('account'));
    if (allAccount) {
      const newAllAccount = [...allAccount, { username: username, password: password }];
      localStorage.setItem('account', JSON.stringify(newAllAccount));
      history.push('/login');
    } else {
      localStorage.setItem('account', JSON.stringify([{ username: username, password: password }]));
      history.push('/login');
    }
  };
  return (
    <Box paddingTop="80px" className={classes.root}>
      <RegisterForm onAccountRegister={handleAccountRegister} />;
    </Box>
  );
}

export default Register;
