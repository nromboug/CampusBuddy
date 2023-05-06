import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
//import {Link, useParams} from 'react-router-dom';
import { Card, CardContent, Box, Grid, CardHeader, Button, IconButton, Typography, LinearProgress }  from '@mui/material';
//import { AddCircle, RemoveCircle } from '@mui/icons-material';
import AddGoal from './AddGoal';
import AGoal from './AGoal'
import axios from 'axios';
import actions from '../actions';

function Goals() {
  const [addBtnToggle, setBtnToggle] = useState(false);
  const allGoals = useSelector((state) => state.goals);
  const dispatch=useDispatch();

  useEffect(() => {
    async function fetchData() {
      let data = await axios.get("http://localhost:3001/goals");
      data = data.data.user.goals;
      for (let i = 0; i < data.length; i++) {
        const existingGoal = allGoals.some((goal) => goal.id === data[i].id);
        if (!existingGoal) {
          dispatch(actions.setGoal(data[i].id, data[i].goal, data[i].progress, data[i].target));
        }
      }
    }
    fetchData();
  }, [dispatch]);
  

  return (
    <div>
      <Card>
      <CardContent>
        <Typography variant="h6" component="h2" flexGrow={1}>
          Goals
        </Typography>
        <Button onClick={()=>setBtnToggle(!addBtnToggle)}>Add Goal</Button>
        {addBtnToggle && <AddGoal/>}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {allGoals.map((goal) => {
              return <AGoal key={goal.id} goal={goal}/>
            })}
          </Grid>
        </Grid>
      </CardContent>
      </Card>
    </div>
  );
}

export default Goals;