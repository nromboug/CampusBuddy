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
    const [name, setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [username, setUsername]=useState('');

    const auth = getAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("signup");
    
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const password2 = document.getElementById('password2').value;
        const name = document.getElementById('name').value;
        const username = document.getElementById('username').value;
    
        if (password === password2) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                console.log("signed up");
                const user = userCredential.user;
                console.log(user);
    
                const postURL = "http://localhost:3001/users";
    
                try {
                    console.log(await axios.post(postURL, { name: name, username: username, email: email, password: password }));
                    console.log("inputted data");
                } catch (e) {
                    console.log(e);
                }
    
                navigate('/');
            } catch (error) {
                console.log(error);
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage);
            }
        } else {
            throw "Error: Passwords do not match";
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
                    <br/>
                    <TextField
                        required
                        id="username"
                        label="Username"
                        className='text-field'
                    />
                    <br/>
                    <TextField
                        required
                        id="email"
                        label="Email"
                        className='text-field'
                    />
                    <br/>
                    <TextField
                        required
                        id="password"
                        label="Password"
                        className='text-field'
                    />
                    <br/>
                    <TextField
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