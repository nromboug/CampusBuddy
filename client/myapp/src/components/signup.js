import '../App.css'

import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
//import axios from 'axios'
import {
    Box,
    TextField,
    Button
} from '@mui/material'

import GoogleIcon from '@mui/icons-material/Google';

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const auth = getAuth();

const Signup = () => {

    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    const auth = getAuth();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(document.getElementById('username').value)
    };

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user);
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
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
                className='userData-form'
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
                    Submit
                </Button>
            </Box>
            <Button onClick={signInWithGoogle}>
                <GoogleIcon />
            </Button>


        </div>

    );
};

export default Signup;