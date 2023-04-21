import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));

const SignUp = () => {
  // create state variables for each input
  const classes = useStyles();
  return (
    <div className={classes.root}>
        <h1>
            Profile
        </h1>
        <div className='empty-div'></div>
        <h2>
            Account Settings
        </h2>
        <div className='empty-div'></div>
        <h3>Username:</h3><p>Username</p>
        <h3>Password:</h3> <p>Password</p>
        <h2>
            Rewards/Certificates
        </h2>
        <p>
            Streaks
        </p>
        <p>
            Profile Badges
        </p>
    </div>
  );
};

export default SignUp;