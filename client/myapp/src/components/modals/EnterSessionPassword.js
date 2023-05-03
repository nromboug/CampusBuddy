import React, {useState, useEffect} from 'react';
import ReactModal from 'react-modal';
import { TextField, Checkbox, Button, FormControlLabel, Typography }  from '@mui/material';

export default function EnterSessionPassword({ isOpen, handleClose, session }) {
  const [password, setPassword] = useState(null);
  const [message, setMessage] = useState(null);
  const currentUser = "current-user";

  
  const handleSubmit = (e) => {
    e.preventDefault();
    //check if password is correct
    // add currentUser to session guests
    //handleCloseAddModal();
    // if not
    setMessage("Incorrect password.");
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