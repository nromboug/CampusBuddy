import { useDispatch } from 'react-redux';
import actions from '../actions';
import { List, ListItem, ListItemIcon, ListItemButton, Checkbox, ListItemText, FormControlLabel, Button, Card, CardContent, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
function Todo(props) {
    const dispatch = useDispatch();
   const checkUncheck= async()=>{
    await axios.patch("http://localhost:3001/todos",{userId: props.user._id,id:props.todo.id});
    dispatch(actions.checkUncheckTodo(props.user._id,props.todo.id));
   }
    return (
        <ListItem key={props.todo.id}>
            <ListItemButton role={undefined} dense>
                <ListItemIcon>
                <FormControlLabel
                    control={<Checkbox
                        edge="start"
                        checked={props.todo.completed}
                        tabIndex={-1}
                        disableRipple
                        onClick={checkUncheck}
                    />}
                    label={props.todo.todo}
                    style={{ color: 'black' }}/>
                </ListItemIcon>
            </ListItemButton>
        </ListItem>
    );
}

export default Todo;