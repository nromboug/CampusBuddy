import React, {useState, useEffect} from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import AddSession from './AddSession';

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sessions, setSessions] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    //let {data} = axios.get('/user/sessions'); ?
    setSessions([{
      id: "session123",
      name: "Fun",
      start: new Date("2023-04-10T10:00:00Z"),
      end: new Date("2023-04-15T10:00:00Z"),
      guests: ["user123", "user456"],
      host: "user123",
      isPrivate: true
    },
    {
      id: "session000",
      name: "Not fun",
      start: new Date("2023-04-10T10:00:00Z"),
      end: new Date("2023-04-15T10:00:00Z"),
      guests: ["user123", "user456"],
      host: "user123",
      isPrivate: true
    }]);
  }, []);

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

  const filteredSessions = sessions.filter(
    (session) => session.start.toDateString() === selectedDate.toDateString()
  );

  return (
    <div>
      <Card>
      <CardContent>
      <Box display="flex" alignItems="center" mb={2}>
          <Typography variant="h6" component="h2" flexGrow={1}>
            Daily Schedule
          </Typography>
          <Box display="flex" alignItems="center">
            <Button onClick={handlePrevDate}>Previous Day</Button>
            <Typography variant="subtitle1" component="span" mx={2}>
              {selectedDate.toLocaleDateString()}
            </Typography>
            <Button onClick={handleNextDate}>Next Day</Button>
          </Box>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
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
                      Starts on {new Date(session.start).toLocaleString([], {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit', hour12: true})} ;
                    </Typography>
                    <Typography color="textSecondary">
                      Hosted by {session.host}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {session.isPrivate ? 'Private' : 'Public'} session with {session.guests.length} participants: {session.guests.join(', ')}
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
      />
    )}
    </div>
  );
}