import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import actions from '../actions';
import { TextField, Checkbox, Button, Modal, Typography }  from '@mui/material';

function AddTodo(props) {
  const dispatch=useDispatch();
  const [todoData, setTodoData] = useState({todo: ''});

  const addNewTodo=(e)=>{
    e.preventDefault();
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
    <form onSubmit={(e) => addNewTodo(e)}>
      <TextField
          id="todo"
          name="todo"
          label="Todo"
          value={todoData.todo}
          onChange={(e) => handleTodoChange(e)}
          multiline
          required
          margin="normal"
          helperText='Please enter a task to do.'
        />
        <div class="buttons">
          <Button type="submit">
            Add Todo
          </Button>
        </div>
      </form>
    </div>
  </div>
  );
}
export default AddTodo;