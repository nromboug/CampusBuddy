import '../App.css'

import axios from 'axios';

import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

import {
    Box,
    TextField,
    Button
} from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google';

import { signInWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
axios.defaults.withCredentials = true;
const auth = getAuth();

const Login = (props) => {
    const [error, setError] = useState();
    const navigate = useNavigate();

    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");



    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(document.getElementById('Email').value)

        signInWithEmailAndPassword(auth, document.getElementById('Email').value, document.getElementById('password').value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // console.log(userCredential);
                // // ...
                // console.log(userCredential._tokenResponse.idToken)
                axios.post('http://localhost:3001/users/login', {
                    idToken: userCredential._tokenResponse.idToken
                })
                    .then(function (response) {
                        const {data} = response;
                        props.setUserInfo(data);
                        console.log(data);
                        navigate('/home')
                    })
                    .catch(function (error) {
                        console.log('err',error);
                    });


            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                setError(true);
            });
    };

    if (props.user) {
        navigate('/');
        return
    }
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
                        id="Email"
                        label="Email"
                        className='text-field'
                    />
                    <TextField
                        type="password"
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