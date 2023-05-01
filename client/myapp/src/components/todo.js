import React, {useState, useEffect} from 'react';
import { List, ListItem, ListItemIcon, ListItemButton, Checkbox, ListItemText, TextField, Button, Card, CardContent, Box, Typography } from '@mui/material';
import AddTodo from './modals/AddTodo';

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [checked, setChecked] = useState([0]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    //let {data} = axios.get('/user/todos'); ?
    //example; replace when server is implemented
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
  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseModals = () => {
    setShowAddModal(false);
  };

  return (
    <div style={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}>
      <Card>
        <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
            <Typography variant="h6" component="h3" flexGrow={1}>
              To-Do:
            </Typography>
            <Button
                onClick={handleOpenAddModal}
              >
              Add Todo
            </Button>
          </Box>
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
      {showAddModal && showAddModal && (
      <AddTodo
        isOpen={showAddModal}
        handleClose={handleCloseModals}
      />
    )}
    </div>
  );
}