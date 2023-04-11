import React, {useState, useEffect} from 'react';
import { List, ListItem, ListItemIcon, ListItemButton, Checkbox, ListItemText, TextField, Button, Card, CardContent } from '@mui/material';

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [checked, setChecked] = React.useState([0]);

  useEffect(() => {
    //let {data} = axios.get('/user/todos'); ?
    setTodos([{text: 'Task 1', completed: false}, {text: 'Task 2', completed: false}, {text: 'Task 3', completed: false}]);
  }, []);

  const handleToggle = (todo) => () => {
    //set todo.completed to opposite
    todo.completed = !todo.completed;
    const currentIndex = checked.indexOf(todo);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(todo);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //axios.post('/todos', {text: newTodo, completed: false}); ?
    setNewTodo('');
  };

  return (
    <div style={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}>
      <Card>
        <CardContent>
          <form style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: "5px" }} onSubmit={handleSubmit}>
            <TextField
              label="Add todo"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              variant="outlined"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Add
            </Button>
          </form>
          <List >
          {todos.map((todo, index) => (
            <ListItem key={index}>
              <ListItemButton role={undefined} onClick={handleToggle(todo)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={todo.completed}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText primary={todo.text} />
              </ListItemButton>
            </ListItem>
          ))}
          </List>
        </CardContent>
      </Card>
      
    </div>
  );
}