import {useDispatch} from 'react-redux';
import actions from '../actions';
import { List, ListItem, ListItemIcon, ListItemButton, Checkbox, ListItemText, TextField, Button, Card, CardContent, Box, Typography } from '@mui/material';

function Todo(props) {
  const dispatch = useDispatch();
  const checkTodo=()=>{
    console.log("To-Do");
    console.log(props.todo.id);
    dispatch(actions.checkUncheckTodo(props.todo.id))
  }
return (
    <ListItem key={props.todo.id}>
    <ListItemButton role={undefined} onClick={checkTodo} dense>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={props.todo.completed}
          tabIndex={-1}
          disableRipple
        />
      </ListItemIcon>
      <ListItemText primary={props.todo.todo} />
    </ListItemButton>
  </ListItem>
);
}

export default Todo;