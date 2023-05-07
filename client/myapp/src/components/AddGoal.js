import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import actions from '../actions';

function AddGoal(props) {
  const dispatch=useDispatch();
  const [formData, setFormData] = useState({goal: '', target: ''});

  const handleGoalChange=(e)=>{
    setFormData((prev)=>({...prev,[e.target.name]: e.target.value}));
  }

  const handleTargetChange=(e)=>{
    setFormData((prev)=>({...prev,[e.target.name]: e.target.value}));
  }

  const addNewGoal=()=>{
    console.log("ran here");
    dispatch(actions.addGoal(props.user._id,formData.goal,formData.target));
    setFormData({ goal: '', target: '' });
    document.getElementById('goal').value = '';
    document.getElementById('target').value = '';
  }

  console.log(formData);
  return (
    <div className='add'>
      <div className='input-selection'>
        <label>
          Goal:
          <input
            onChange={(e) => handleGoalChange(e)}
            id='goal'
            name='goal'
            placeholder='Goal...'
            value={formData.goal}
          />
        </label>
        <label>
          Target:
          <input
            onChange={(e) => handleTargetChange(e)}
            id='target'
            name='target'
            placeholder='Target...'
            value={formData.target}
          />
        </label>
      </div>
      <br/>
      <button onClick={addNewGoal}>Add Goal</button>
    </div>
  );
}

export default AddGoal;