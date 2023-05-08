import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
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
  const [imageUrl, setImageUrl] = useState(props.user.image ? props.user.image : '')
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
        <label for='profile-picture' >Profile Picture: </label>
        <Input type='file' name='file' id='profile-picture'onChange={handleFileChange}></Input>
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
        <p>
            Profile Badges
        </p>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
