import React, {useState, useEffect} from 'react';
import ReactModal from 'react-modal';
import { TextField, Checkbox, Button, FormControlLabel, Typography }  from '@mui/material';
import axios from 'axios';

export default function EnterSessionPassword({ isOpen, handleClose, session, addGuest }) {
  const [password, setPassword] = useState(null);
  const [message, setMessage] = useState(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    async function enterCode() {
      try {
        const {data} = await axios.post(`http://localhost:3001/sessions/private/${session._id}`, 
        {
          password: password
        });
        if (data.valid) {
          addGuest(session);
          handleCloseAddModal();
        } else {
          setMessage("Incorrect password.");
        }
      } catch (e) {
        console.log(e);
        setMessage("Something went wrong.");
      }
    }
    enterCode();
  };

  const handleCloseAddModal = () => {
    handleClose(false);
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Enter Session Password Modal"
    >
      <h2>Enter Session Password to RSVP</h2>
      {message ? <p className="error">{message}</p> : null}
      <form onSubmit={handleSubmit}>
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <div class="buttons">
          <Button type="submit" variant="contained">
            Enter Session Password
          </Button>
          <Button onClick={handleCloseAddModal} variant="contained">
            Cancel
          </Button>
        </div>
        
      </form>
    </ReactModal>
  );
}