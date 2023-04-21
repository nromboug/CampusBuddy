import '../App.css'

import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
//import axios from 'axios'
import {
    Box,
    TextField,
    Button
} from '@mui/material'

import GoogleIcon from '@mui/icons-material/Google';

import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
const auth = getAuth();


const Signup = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    const auth = getAuth();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("signup")
        createUserWithEmailAndPassword(auth, document.getElementById('email').value, document.getElementById('password').value)
            .then((userCredential) => {
                console.log("signed up")
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                // ...
                navigate('/');
            })
            .catch((error) => {

                console.log(error)
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage);
                // ..
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
                navigate('/');
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
                Signup
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
                        id="email"
                        label="Email"
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
                {error ? <p className='error'>{error}</p> : null}

                <Link className='nav-link' to='/login'>
                    Back to Login
                </Link>
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