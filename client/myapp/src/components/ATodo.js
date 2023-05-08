import { useDispatch } from 'react-redux';
import actions from '../actions';
import { List, ListItem, ListItemIcon, ListItemButton, Checkbox, ListItemText, TextField, Button, Card, CardContent, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

function Todo(props) {
    //const dispatch = useDispatch();
    const [completed, setCompleted] = useState(props.todo.completed);
    const checkTodo = async () => {
        console.log("To-Do");
        console.log(props.todo.id);
        // dispatch(actions.checkUncheckTodo(props.user._id,props.todo.id))
        try {
            const res = await axios.patch('http://localhost:3001/todos/', {
                id: props.todo.id
            })
            console.log(res);
            setCompleted(!completed)
        } catch (err) {
            console.log(err);
        }

    }
    return (
        <ListItem key={props.todo.id}>
            <ListItemButton role={undefined} onClick={checkTodo} dense>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={completed}
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