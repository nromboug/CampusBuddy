import React, {useState, useEffect} from 'react';
import ReactModal from 'react-modal';
import { TextField, Checkbox, Button, FormControlLabel, Backdrop  }  from '@mui/material';
import axios from 'axios';

export default function AddSession({ isOpen, handleClose, currentUser, addSessionToState }) {
  const [name, setName] = useState('');
  const [start, setStart] = useState(new Date().toISOString().slice(0, -8));
  const [end, setEnd] = useState(new Date().toISOString().slice(0, -8));
  const [isPrivate, setPrivate] = useState(false);
  const [password, setPassword] = useState(null);
  const [guests, setGuests] = useState([]);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    //name, start, end, isPrivate, host, password
    async function createSession() {
      try {
        const {data} = await axios.post(`http://localhost:3001/sessions`, 
        {
          name: name, 
          start: start, 
          end: end, 
          isPrivate: isPrivate, 
          host: currentUser, 
          password: password
        });
        addSessionToState(data);
        handleCloseAddModal();
      } catch (e) {
        console.log(e);
        setError(true);
      }
    }
    createSession();
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
      {error ? <p className='error'>Invalid session.</p> : null}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          inputProps={{ maxlength: 100 }}
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
        <div>
          <FormControlLabel
          control={<Checkbox
            checked={isPrivate}
            onChange={(e) => setPrivate(e.target.checked)}
            inputProps={{ "aria-label": "controlled" }}
          />}
          label="Is it Private?" />
        {isPrivate ? 
          <TextField
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            margin="normal"
        />
        : <span>In public sessions, anyone can RSVP to the event.</span>}
        </div>
        
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