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

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";



const Signup = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');

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


        </div>

    );
};

export default Signup;