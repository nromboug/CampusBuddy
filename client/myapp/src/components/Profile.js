import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';

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

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
        <input type='file' name='file' onChange={handleFileChange}></input>
        <button type='submit'>Submit</button>
      </form>
        <h1>
            Profile
        </h1>
        {imageUrl && <img src={imageUrl} alt="uploaded image" />}
        <div className='empty-div'></div>
        <h2>
            Account Settings
        </h2>
        <div className='empty-div'></div>
        <h3>Name:</h3><p>{props.user.name}</p>
        <h3>Username:</h3><p>{props.user.username}</p>
        <h3>Email:</h3><p>{props.user.email}</p>
        <h2>
            Rewards/Certificates
        </h2>
        <p>
            Streaks
        </p>
        <p>
            Profile Badges
        </p>
    </div>
  );
};

export default Profile;
