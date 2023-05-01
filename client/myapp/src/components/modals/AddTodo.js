import React, {useState, useEffect} from 'react';
import ReactModal from 'react-modal';
import { TextField, Checkbox, Button, Modal, Typography }  from '@mui/material';

export default function AddTodo({ isOpen, handleClose }) {
  const [text, setText] = useState('');
  
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
      contentLabel="Add Todo Modal"
    >
      <h2>Add Todo</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Description"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <div class="buttons">
          <Button type="submit" variant="contained">
            Add Todo
          </Button>
          <Button onClick={handleCloseAddModal} variant="contained">
            Cancel
          </Button>
        </div>
        
      </form>
    </ReactModal>
  );
}