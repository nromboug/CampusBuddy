import React, {useState, useEffect} from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import axios from 'axios';
import AddSession from './modals/AddSession';

export default function Schedule(props) {
  const [selectedDate, setSelectedDate] = useState(new Date(new Date().setHours(0,0,0,0)));
  const [sessions, setSessions] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const {data} = await axios.get(`http://localhost:3001/sessions/user/${props.user.username}`);
        setSessions(data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  const addSessionToState = (newSession) => {
    setSessions([...sessions, newSession]);
  };

  const handlePrevDate = () => {
    const prevDate = new Date(selectedDate.getTime() - 24 * 60 * 60 * 1000);
    setSelectedDate(prevDate);
  };

  const handleNextDate = () => {
    const nextDate = new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000);
    setSelectedDate(nextDate);
  };

  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseModals = () => {
    setShowAddModal(false);
  };

  const filteredSessions = sessions.filter((session) => {
    const sessionStart = new Date(session.start);
    const sessionEnd = new Date(session.end);
    const selectedDateTime = selectedDate.getTime();
    const sessionStartDateTime = sessionStart.setHours(0, 0, 0, 0);
    const sessionEndDateTime = sessionEnd.setHours(23, 59, 59, 999);
  
    return (
      selectedDateTime === sessionStartDateTime ||
      selectedDateTime === sessionEndDateTime ||
      (selectedDateTime > sessionStartDateTime && selectedDateTime < sessionEndDateTime)
    );
  });

  return (
    <div style={{ flex: '0 0 35%' }}>
      <Card>
      <CardContent>
        <Typography variant="h6" component="h2" flexGrow={1}>
          Daily Schedule
        </Typography>
      
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" mb={2}>
              <Button onClick={handlePrevDate}>Previous</Button>
              <Typography variant="subtitle1" component="span" flexGrow={1} mx={2}>
                {selectedDate.toLocaleDateString()}
              </Typography>
              <Button onClick={handleNextDate}>Next</Button>
          </Box>
          <Box display="flex" alignItems="center" mb={2}>
            <Typography variant="h6" component="h3" flexGrow={1}>
              Sessions
            </Typography>
            <Button
                onClick={handleOpenAddModal}
              >
                Add Session
            </Button>
          </Box>
            {filteredSessions.length === 0 ? (
              <Typography variant="body1" color="textSecondary">
                No sessions scheduled for this day.
              </Typography>
            ) : (
              filteredSessions.map((session) => (
                <Card sx={{ maxWidth: 600, margin: 'auto', marginTop: 2 }}>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {session.name}
                    </Typography>
                    <Typography>
                      Starts on {new Date(session.start).toLocaleString([], {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit', hour12: true})}
                    </Typography>
                    <Typography>
                      Ends on {new Date(session.end).toLocaleString([], {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit', hour12: true})}
                    </Typography>
                    <Typography color="textSecondary">
                      Hosted by {session.host}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {session.isPrivate ? 'Private' : 'Public'} session with {session.guests.length} participant(s)
                    </Typography>
                  </CardContent>
                </Card>
              ))
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    {showAddModal && showAddModal && (
      <AddSession
        isOpen={showAddModal}
        handleClose={handleCloseModals}
        currentUser={props.user.username}
        addSessionToState={addSessionToState}
      />
    )}
    </div>
  );
}