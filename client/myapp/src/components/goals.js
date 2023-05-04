import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import { Card, CardContent, Box, Grid, CardHeader, Button, IconButton, Typography, LinearProgress }  from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import AddGoal from './modals/AddGoal';

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    //let {data} = axios.get('/user/goals'); ?
    //example; replace when server is implemented
    setGoals([{ name: 'Study 10min Everyday', target: 10, progress: 0},
    { name: 'Review Content from the week', target: 4, progress: 0},
    { name: 'Take breaks everyday', target: 7, progress: 0}]);
  }, []);

  const incrementGoal = (index) => {
    // increment goals on server
    setGoals((prevGoals) => {
      const newGoals = [...prevGoals];
      newGoals[index].progress++;
      return newGoals;
    });
  };

  // should goals be allowed to decrement ?
  const decrementGoal = (index) => {
    setGoals((prevGoals) => {
      const newGoals = [...prevGoals];
      newGoals[index].progress--;
      return newGoals;
    });
  };

  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseModals = () => {
    setShowAddModal(false);
  };

  const saveGoals = () => {
    // send goals to db
  };

  return (
    <div>
      <Card>
      <CardContent>
        <Typography variant="h6" component="h2" flexGrow={1}>
          Goals
        </Typography>
        <Button onClick={handleOpenAddModal}>Add Goal</Button>
        <Button onClick={saveGoals}>Save Changes</Button>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {goals.map((goal, index) => (
              <Card key={index} sx={{ maxWidth: 300, margin: 'auto', marginTop: 2 }}>
                <CardContent>
                  <Typography>
                    {goal.name} 
                  </Typography>
                  
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                    color="primary"
                    onClick={() => decrementGoal(index)}
                    disabled={goal.progress === 0}
                  >
                    <RemoveCircle />
                  </IconButton>
                    <Typography variant="body1">
                    Target: {goal.progress} / {goal.target}
                    
                  </Typography>
                  <IconButton
                    color="primary"
                    onClick={() => incrementGoal(index)}
                    disabled={goal.progress >= goal.target}
                  >
                    <AddCircle />
                  </IconButton>
                  
                  </div>
                  <LinearProgress
                    variant="determinate"
                    value={(goal.progress / goal.target) * 100}
                    color="primary"
                    sx={{ width: "100%", height: 8 }}
                  />
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>
      
      </CardContent>
      </Card>
      {showAddModal && showAddModal && (
      <AddGoal
        isOpen={showAddModal}
        handleClose={handleCloseModals}
      />
      )}
    </div>
  );
}