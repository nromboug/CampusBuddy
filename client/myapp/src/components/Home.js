import React from 'react';
import '../App.css';
import { Typography } from '@mui/material';
const Home = () => {
	return (
		<div style={{ padding: '30px' }}>
		<Typography variant="body1">
            Welcome to CampusBuddy, the best place for you to plan private and
            public study sessions, make To-Do lists, and keep track of your goals. 
            Head on over to the sign up page to create an account and if you already have one
            go to the login page to unlock the website's full potential.
        </Typography>
        <br />
        <br />
        <Typography variant="body1" color="textSecondary">
            Website created by Cindy Tran, Hasumi Tanemori, and Noah Rombough

        </Typography>
		</div>
	);
};

export default Home;