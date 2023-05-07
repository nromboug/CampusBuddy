import {useDispatch} from 'react-redux';
import actions from '../actions';
import { Card, CardContent, Box, Grid, CardHeader, Button, IconButton, Typography, LinearProgress }  from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';

function Goal(props) {
  const dispatch = useDispatch();

  const incrementGoal=()=>{
    dispatch(actions.incrementGoal(props.user._id,props.goal.id));
  }

  const decrementGoal=()=>{
    dispatch(actions.decrementGoal(props.user._id,props.goal.id));
  }

  const deleteGoal = () => {
    dispatch(actions.deleteGoal(props.user._id,props.goal.id));
  };

  return (
<Card key={props.goal.id} sx={{ maxWidth: 400, margin: 'auto', marginTop: 2 }}>
    <CardContent>
        <Typography>
            {props.goal.goal} 
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                    color="primary"
                    disabled={props.goal.progress === 0}
                    onClick={()=>decrementGoal()}
                  >
                <RemoveCircle />
                </IconButton>
                <Typography variant="body1">
                    Target: {props.goal.progress} / {props.goal.target} 
                </Typography>
                <IconButton
                    color="primary"
                    disabled={props.goal.progress >= props.goal.target}
                    onClick={()=>incrementGoal()}
                  >
                <AddCircle />
                  </IconButton>
            </div>
            <LinearProgress
                variant="determinate"
                value={(props.goal.progress / props.goal.target) * 100}
                color="primary"
                sx={{ width: "100%", height: 8 }}
            />
            <Button onClick={deleteGoal}>Delete Goal</Button>
    </CardContent>
</Card>
);
}

export default Goal;