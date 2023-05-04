import React, {useState, useEffect} from 'react';
import { List, Button, Card, CardContent, Box, Typography } from '@mui/material';
//import AddTodo from './modals/AddTodo';
import ATodo from './ATodo'
import AddTodo from './AddTodo';
import { useSelector } from 'react-redux';

function Todo() {
  const [addBtnToggle, setBtnToggle]=useState(false);
  const allTodo=useSelector((state)=>state.todo);
  return (
    <div style={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}>
      <Card>
        <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
            <Typography variant="h6" component="h3" flexGrow={1}>
              To-Do:
            </Typography>
            <Button onClick={() => setBtnToggle(!addBtnToggle)}>Add To Do</Button>
            {addBtnToggle && <AddTodo />}
          </Box>
          <List >
          {allTodo.map((todo) => {
            return <ATodo key={todo.id} todo={todo}/>
          })}
          </List>
        </CardContent>
      </Card>
    </div>
  );
}

export default Todo;