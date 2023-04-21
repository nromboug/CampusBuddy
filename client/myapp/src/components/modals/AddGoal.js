import React, {useState, useEffect} from 'react';
import ReactModal from 'react-modal';
import { TextField, Checkbox, Button, Modal, Typography }  from '@mui/material';

export default function AddGoal({ isOpen, handleClose }) {
  const [name, setName] = useState('');
  const [target, setTarget] = useState(0);
  
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
      contentLabel="Add Goal Modal"
    >
      <h2>Add Goal</h2>
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
          id="my-input"
          label="Target"
          type="number"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <div class="buttons">
          <Button type="submit" variant="contained">
            Add Goal
          </Button>
          <Button onClick={handleCloseAddModal} variant="contained">
            Cancel
          </Button>
        </div>
        
      </form>
    </ReactModal>
  );
}