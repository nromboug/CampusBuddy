import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import actions from '../actions';
import { TextField, Checkbox, Button, Modal, Typography }  from '@mui/material';

function AddGoal(props) {
  const dispatch=useDispatch();
  const [formData, setFormData] = useState({goal: '', target: ''});

  const handleGoalChange=(e)=>{
    setFormData((prev)=>({...prev,[e.target.name]: e.target.value}));
  }

  const handleTargetChange=(e)=>{
    setFormData((prev)=>({...prev,[e.target.name]: e.target.value}));
  }

  const addNewGoal=(e)=>{
    e.preventDefault();
    dispatch(actions.addGoal(props.user._id,formData.goal,formData.target));
    setFormData({ goal: '', target: '' });
    document.getElementById('goal').value = '';
    document.getElementById('target').value = '';
  }

  return (
    <div className='add'>
      <div className='input-selection'>
      <form onSubmit={addNewGoal}>
        <TextField
          id="goal"
          name="goal"
          label="Goal"
          value={formData.goal}
          onChange={(e) => handleGoalChange(e)}
          multiline
          margin="normal"
          helperText="Please enter a goal that can be tracked numerically."
        />
        <TextField
          id="target"
          name="target"
          label="Target"
          type="number"
          value={formData.target}
          onChange={(e) => handleTargetChange(e)}
          helperText="Please enter the target number."
        />
        <div class="buttons">
          <Button onClick={(e) => addNewGoal(e)} type="submit">
            Add Goal
          </Button>
        </div>
        
      </form>
      </div>
    </div>
  );
}

export default AddGoal;