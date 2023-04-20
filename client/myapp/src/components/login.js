import '../App.css'

import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
//import axios from 'axios'
import {
    Box,
    TextField,
    Button
} from '@mui/material'

const Login = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(document.getElementById('username').value)
    };

    return (
        <div>
            <h2>
                Login
            </h2>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 2, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                class='userData-form'
                onSubmit={handleSubmit}
            >
                <div>
                    <TextField
                        required
                        id="username"
                        label="Username"
                        className='text-field'
                    />
                    <TextField
                        required
                        id="password"
                        label="Password"
                        className='text-field'
                    />
                </div>
                <br />

                <Button variant='contained' type='submit'>
                    Login
                </Button>
                <Link className='nav-link' to='/signup'>
                    Sign Up
                </Link>
            </Box>

        </div>

    );
};

export default Login;