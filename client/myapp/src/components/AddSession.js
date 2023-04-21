import React, {useState, useEffect} from 'react';
import ReactModal from 'react-modal';
import { TextField, Checkbox, Button, FormControlLabel, Typography }  from '@mui/material';

export default function AddSession({ isOpen, handleClose }) {
  const [name, setName] = useState('');
  const [start, setStart] = useState(new Date().toISOString().slice(0, -8));
  const [end, setEnd] = useState(new Date().toISOString().slice(0, -8));
  const [isPrivate, setPrivate] = useState(false);
  const [guests, setGuests] = useState([]);
  const host = "current-user";

  
  const handleSubmit = (e) => {
    e.preventDefault();
    //add to server
    handleCloseAddModal();
  };

  const handleCloseAddModal = () => {
    handleClose(false);
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Add Session Modal"
    >
      <h2>Add Session</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          id="start"
          label="start"
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="end"
          label="end"
          type="datetime-local"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControlLabel
          control={<Checkbox
            checked={isPrivate}
            onChange={(e) => setPrivate(e.target.checked)}
            inputProps={{ "aria-label": "controlled" }}
          />}
          label="Is it Private?" />
        {isPrivate ? 
          null // set up an invite link? 
        : <span>Anyone can RSVP to the event.</span>}
        <div class="buttons">
          <Button type="submit" variant="contained">
            Add Session
          </Button>
          <Button onClick={handleCloseAddModal} variant="contained">
            Cancel
          </Button>
        </div>
        
      </form>
    </ReactModal>
  );
}