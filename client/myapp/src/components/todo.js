import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { List, ListItem, ListItemIcon, ListItemButton, Checkbox, ListItemText, TextField, Button, Card, CardContent, Box, Typography } from '@mui/material';
//import AddTodo from './modals/AddTodo';
import AddTodo from './AddTodo';
import ATodo from './ATodo';
import actions from '../actions';
import axios from 'axios';

export default function Todo(props) {
  const [addBtnToggle, setBtnToggle] = useState(false);
  const allTodo = useSelector((state) => state.todo);
  const dispatch=useDispatch();

  useEffect(() => {
    async function fetchData() {
      let data = await axios.post("http://localhost:3001/todos/allTodos",{id: props.user._id});
      data = data.data;
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        const existingTodo = allTodo.some((todo) => todo.id === data[i].id);
        if (!existingTodo) {
          dispatch(actions.setTodo(data[i]._id,data[i].todo,data[i].completed));
        }
      }
    }
    fetchData();
  }, [dispatch]);

  return (
    <div style={{ flex: '0 0 25%', bgcolor: 'background.paper' }}>
      <Card style={{ backgroundColor: "#d3f5e8" }}>
        <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
            <Typography variant="h6" component="h2" flexGrow={1}>
              To-Do:
            </Typography> 
          </Box>
          <Card sx={{ width: "100%", maxWidth: 350, margin: 'auto', marginTop: 2 }} variant="outlined">
              <Button
                onClick={()=>setBtnToggle(!addBtnToggle)}
              >
              {addBtnToggle ? "Cancel": "Add Todo"}
            </Button>
            {addBtnToggle && <AddTodo user={props.user}/>}
            </Card>
          <List >
          {allTodo.map((todo) => {
            return <ATodo id={todo.id} todo={todo} user={props.user}/>
          })}
          </List>
        </CardContent>
      </Card>
    </div>
  );
}