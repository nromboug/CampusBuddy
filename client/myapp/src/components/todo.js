import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { List, ListItem, ListItemIcon, ListItemButton, Checkbox, ListItemText, TextField, Button, Card, CardContent, Box, Typography } from '@mui/material';
//import AddTodo from './modals/AddTodo';
import AddTodo from './AddTodo';
import ATodo from './ATodo';
import actions from '../actions';
import axios from 'axios';

export default function Todo() {
  const [addBtnToggle, setBtnToggle] = useState(false);
  const allTodo = useSelector((state) => state.todo);
  const dispatch=useDispatch();

  useEffect(() => {
    async function fetchData() {
      let data = await axios.get("http://localhost:3001/todos");
      console.log(data.data);
      data = data.data.user.todo;
      for (let i = 0; i < data.length; i++) {
        const existingTodo = allTodo.some((todo) => todo.id === data[i].id);
        if (!existingTodo) {
          dispatch(actions.setTodo(data[i].id,data[i].todo,data[i].completed));
        }
      }
    }
    fetchData();
  }, [dispatch]);

  return (
    <div style={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}>
      <Card>
        <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
            <Typography variant="h6" component="h3" flexGrow={1}>
              To-Do:
            </Typography>
            <Button
                onClick={()=>setBtnToggle(!addBtnToggle)}
              >
              Add Todo
            </Button>
            {addBtnToggle && <AddTodo/>}
          </Box>
          <List >
          {allTodo.map((todo) => {
            return <ATodo id={todo.id} todo={todo} />
          })}
          </List>
        </CardContent>
      </Card>
    </div>
  );
}