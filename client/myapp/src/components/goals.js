import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
//import {Link, useParams} from 'react-router-dom';
import { Card, CardContent, Box, Grid, CardHeader, Button, IconButton, Typography, LinearProgress }  from '@mui/material';
//import { AddCircle, RemoveCircle } from '@mui/icons-material';
import AddGoal from './AddGoal';
import AGoal from './AGoal'
import axios from 'axios';
import actions from '../actions';

function Goals(props) {
  const [addBtnToggle, setBtnToggle] = useState(false);
  const allGoals = useSelector((state) => state.goals);
  const dispatch=useDispatch();

  useEffect(() => {
    async function fetchData() {
      let data = await axios.post("http://localhost:3001/goals/allGoals",{id: props.user._id});
      data=data.data;
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        const existingGoal = allGoals.some((goal) => goal._id === data[i]._id);
        if (!existingGoal) {
          dispatch(actions.setGoal(data[i]._id, data[i].goal, data[i].progress, data[i].target));
        }
      }
    }
    fetchData();
  }, [dispatch]);
  

  return (
    <div style={{ flex: '0 0 30%' }}>
      <Card style={{ backgroundColor: "#d3f5e8" }}>
      <CardContent>
        <Typography variant="h6" component="h2" flexGrow={1}>
          Goals
        </Typography>
        <Card sx={{ width: "100%", maxWidth: 350, margin: 'auto', marginTop: 2 }} variant="outlined">
          <Button onClick={()=>setBtnToggle(!addBtnToggle)}>{addBtnToggle ? "Cancel": "Add Goal"}</Button>
          {addBtnToggle && <AddGoal user={props.user} setUserInfo={props.setUserInfo} />}
        </Card>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {allGoals.map((goal) => {
              return <AGoal key={goal.id} goal={goal} user={props.user} setUserInfo={props.setUserInfo}/>
            })}
          </Grid>
        </Grid>
      </CardContent>
      </Card>
    </div>
  );
}

export default Goals;