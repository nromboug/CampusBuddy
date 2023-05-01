import '../App.css'

import axios from 'axios';

import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import {
    Box,
    TextField,
    Button
} from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google';

import { signInWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
const auth = getAuth();

const Login = () => {
    const [error, setError] = useState();

    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(document.getElementById('username').value)

        signInWithEmailAndPassword(auth, document.getElementById('username').value, document.getElementById('password').value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(userCredential);
                // ...
                console.log(userCredential._tokenResponse.idToken)
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
                console.log(error);
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
            <Button onClick={signInWithGoogle}>
                <GoogleIcon />
            </Button>

        </div>

    );
};

export default Login;