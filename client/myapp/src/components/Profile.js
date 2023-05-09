import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RefreshIcon from '@mui/icons-material/Refresh';
import {
    Box,
    Button,
    Card,
    Input,
    Grid,
    Typography,
} from '@mui/material';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),

        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '300px',
        },
        '& .MuiButtonBase-root': {
            margin: theme.spacing(2),
        },
    },
}));

const Profile = (props) => {
    const [image, setImage] = useState({ preview: '', data: '' })
    const [imageUrl, setImageUrl] = useState('')
    const [status, setStatus] = useState('')
    // create state variables for each input
    const classes = useStyles();
    const handleFileChange = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setImage(img)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('file', image.data)
        const response = await axios.post('http://localhost:3001/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        if (response) {
            setStatus(response.statusText)
            setImageUrl(response.data.url)
        }
    };


    const refresh = async () => {
        let {data} = await axios.post("http://localhost:3001/users/AUser", { userId: props.user._id });
        props.setUserInfo(data);
    }

    useEffect(() => {
        async function fecthData() {
            try {
                let data = await axios.post("http://localhost:3001/users/AUser", { userId: props.user._id });
                setImageUrl(data.data.image);
            props.onImageUrlChange(data.data.image);
            } catch (err) {
                props.setUserInfo(undefined);
                return
            }
            
        }
        fecthData();
    });
    return (
        <div className={classes.root}>
            <h1>
                Profile
            </h1>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <h2>
                        Account Settings
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='profile-picture' >Profile Picture: </label>
                        <Input type='file' name='file' id='profile-picture' onChange={handleFileChange} required></Input>
                        <Button type='submit'>Submit</Button>
                    </form>
                    {imageUrl && <img src={imageUrl} alt="uploaded image" />}
                    <h3>Name:</h3><p>{props.user.name}</p>
                    <h3>Username:</h3><p>{props.user.username}</p>
                    <h3>Email:</h3><p>{props.user.email}</p>
                </Grid>
                <Grid item xs={6}>
                    <h2>
                        Rewards/Certificates
                    </h2>
                    <p>
                        Login Streak: {props.user.streak} {props.user.streak >= props.user.longest && <EmojiEventsIcon style={{ color: '#d1ca00' }} />}
                        <br />
                        {props.user.streak < props.user.longest && 'Longest streak: ' + props.user.longest}
                        <br />
                        Login every day to increase your login streak!
                    </p>
                    <h3>
                        Profile Achievements:
                        <Button aria-label="refresh" onClick={refresh}>
                        <RefreshIcon />
                        </Button>
                    </h3>
                    <p>
                        Make a todo {props.user.achievements.makeTodo && <CheckCircleIcon style={{ color: 'green' }} />}
                    </p>
                    <p>
                        Finish a todo {props.user.achievements.finishTodo && <CheckCircleIcon style={{ color: 'green' }} />}
                    </p>
                    <p>
                        Set a goal {props.user.achievements.makeGoal && <CheckCircleIcon style={{ color: 'green' }} />}
                    </p>
                    <p>
                        Reach a goal {props.user.achievements.finishGoal && <CheckCircleIcon style={{ color: 'green' }} />}
                    </p>
                    <p>
                        Create a session {props.user.achievements.createSession && <CheckCircleIcon style={{ color: 'green' }} />}
                    </p>
                    <p>
                        Join a session {props.user.achievements.joinSession && <CheckCircleIcon style={{ color: 'green' }} />}
                    </p>
                    <br />
                    <h2>
                        Weekly Reflections
                    </h2>
                    <p>
                        Number of Goals Completed this Week: {props.user.goals.filter((goal) => goal.completionDate && Math.ceil(Math.abs(new Date() - new Date(goal.completionDate)) / (1000 * 60 * 60 * 24)) <= 7).length}
                    </p>
                    <p>
                        Number of Goals in Progress: {props.user.goals.filter((goal) => !goal.completionDate).length}
                    </p>
                </Grid>
            </Grid>
        </div>
    );
};

export default Profile;
