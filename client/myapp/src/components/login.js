import '../App.css'

import axios from 'axios';

import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import {
    Box,
    TextField,
    Button
} from '@mui/material'

import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
const auth = getAuth();

const Login = () => {
    const [error, setError] = useState();
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(document.getElementById('username').value)

        signInWithEmailAndPassword(auth, document.getElementById('username').value, document.getElementById('password').value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(userCredential);
                // ...
                axios.post('http://localhost:3001/users/login', {
                    idToken: userCredential._tokenResponse.idToken
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });


            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                setError(true);
            });
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
                {error ? <p className='error'>Invalid attempt.</p> : null}
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