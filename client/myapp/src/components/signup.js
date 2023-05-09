import '../App.css'
import axios from 'axios';
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
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const auth = getAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("signup");

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const password2 = document.getElementById('password2').value;
        const name = document.getElementById('name').value;
        const username = document.getElementById('username').value;

        if(!username || username.length<3|| !(/[A-Za-z0-9]{5,}$/.test(username)) || username.trim()==="" || username.indexOf(" ")>-1)
            setError('Please provide valid username, letters and numbers only of min length 3.');
        else if (password && password !== password2)
            setError('Passwords must match');
        else if (!password || password.length <6)
            setError('Please provide password min length 6');
        else if(!/[A-Z]/.test(password))
            setError("password needs uppercase letter");
        else if (!/[a-z]/.test(password))
            setError("password needs lowercase letter");
        else if (!/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password))
            setError("password needs special character");
        else if (!name || name.length<2 || !(/^[A-Za-z ]*$/.test(name)) || name.trim()==="")
            setError("Please provide valid name, of length min 2 and letters and spaces only.")
        else {
            try {


                const postURL = "http://localhost:3001/users/signup";
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                console.log("signed up");
                const uid = userCredential.user.uid;
                console.log(uid);

                console.log(await axios.post(postURL, { id: uid, name: name, username: username, email: email }));
                console.log("inputted data");
                

                navigate('/');
            } catch (error) {
                console.log(error);
                if(error.message)
                    error = error.message
                setError(error);
            }
        }
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
                        id="name"
                        label="Name"
                        className='text-field'
                    />
                    <br />
                    <TextField
                        required
                        id="username"
                        label="Username"
                        className='text-field'
                    />
                    <br />
                    <TextField
                        required
                        id="email"
                        label="Email"
                        className='text-field'
                    />
                    <br />
                    <TextField
                        type="password"
                        required
                        id="password"
                        label="Password"
                        className='text-field'
                    />
                    <br />
                    <TextField
                        type="password"
                        required
                        id="password2"
                        label="Retype Password"
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