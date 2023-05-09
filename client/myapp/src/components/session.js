import React, {useState, useEffect} from 'react';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
} from '@mui/material';
import axios from 'axios';
import EnterSessionPassword from './modals/EnterSessionPassword';

export default function Session(props) {
  const [session, setSession] = useState(props.session);
  const [showModal, setShowModal] = useState(false);
  const currentUser = props.currentUser; 

  useEffect(() => {
    
  }, []);

  async function addGuest() {
    try {
      const {data} = await axios.patch(`http://localhost:3001/sessions/${session._id}`, 
      {
        guests: [...session.guests, currentUser]
      });
      setSession(data);
    } catch (e) {
      console.log(e);
    }
  }

  async function removeGuest() {
    try {
      const {data} = await axios.patch(`http://localhost:3001/sessions/${session._id}`, 
      {
        guests: session.guests.filter((guest) => guest !== currentUser)
      });
      setSession(data);
    } catch (e) {
      console.log(e);
    }
  }

  const handlePrivateRSVP = () => {
    if (session.guests.includes(currentUser)) {
      removeGuest(session);
    } else {
      setShowModal(true);
    }
  };

  const handleCloseModals = () => {
    setShowModal(false);
  };

  const handlePublicRSVP = () => {
    if (session.guests.includes(currentUser)) {
      removeGuest(session); 
    } else {
      addGuest(session);
    }
  };

  return(
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={session._id}>
      <Card sx={{ maxWidth: 600, margin: 'auto', marginTop: 2 }}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {session.name}
          </Typography>
          <Typography color="textSecondary">
            Hosted by {session.host}
          </Typography>
          {session.isPrivate ?
          <div>
            <Typography variant="body2" component="p">
              Private session
            </Typography>
            <Button onClick={() => handlePrivateRSVP()}>{session.guests.includes(currentUser) ? "Un-RSVP" : "Enter Password"}</Button>
          </div>
            :
            <div>
            <Typography>
              Starts on {new Date(session.start).toLocaleString([], {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit', hour12: true})}
            </Typography>
            <Typography>
              Ends on {new Date(session.end).toLocaleString([], {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit', hour12: true})}
            </Typography>
            <Typography variant="body2" component="p">
              Public session with {session.guests.length} participant(s)
            </Typography>
            <Button onClick={() => handlePublicRSVP()}>{session.guests.includes(currentUser) ? "Un-RSVP" : "RSVP"}</Button>
            </div>
          }
        </CardContent>
      </Card>
      {showModal && showModal && (
          <EnterSessionPassword
            isOpen={showModal}
            handleClose={handleCloseModals}
            session={session}
            addGuest={addGuest}
          />
        )}
    </Grid>
  );

}