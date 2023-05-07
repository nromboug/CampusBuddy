import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import actions from '../actions';
import { TextField, Checkbox, Button, Modal, Typography }  from '@mui/material';

function AddTodo(props) {
  const dispatch=useDispatch();
  const [todoData, setTodoData] = useState({todo: ''});
  
  const handleSubmit = (e) => {
    e.preventDefault();
    //add to server
  };

  const addNewTodo=()=>{
    dispatch(actions.addTodo(props.user._id,todoData.todo))
    setTodoData({todo:''});
    document.getElementById('todo').value = '';
  }

  const handleTodoChange=(e)=>{
    setTodoData((prev)=>({...prev,[e.target.name]: e.target.value}));
  }

  return (
    <div className='add'>
    <div className='input-selection'>
      <label>
        To Do:
        <input
          onChange={(e) => handleTodoChange(e)}
          id='todo'
          name='todo'
          placeholder='Todo...'
          value={todoData.todo}
        />
      </label>
    </div>
    <br/>
    <button onClick={addNewTodo}>Add To Do</button>
  </div>
  );
}
export default AddTodo;