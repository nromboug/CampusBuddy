import React, {useState, useEffect} from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button,
} from '@mui/material';
import axios from 'axios';
import Error from './Error';
import EnterSessionPassword from './modals/EnterSessionPassword';

export default function Sessions(props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sessionsData, setSessionsData] = useState(undefined);
  const [showModal, setShowModal] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);
  const currentUser = props.user.username; 
  let card = null;

  async function fetchData() {
    try {
      const {data} = await axios.get(`http://localhost:3001/sessions`);
      setSessionsData(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError(true);
    }
  }

  useEffect(() => {
    console.log('on load useeffect');
    setError(false);
    fetchData();
  }, []);

  async function addGuest(session) {
    try {
      const {data} = await axios.patch(`http://localhost:3001/sessions/${session.id}`, 
      {
        guests: [...session.guests, currentUser]
      });
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }

  async function removeGuest(session) {
    try {
      const {data} = await axios.patch(`http://localhost:3001/sessions/${session.id}`, 
      {
        guests: session.guests.filter((guest) => guest !== currentUser)
      });
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }

  const handlePrivateRSVP = (session) => {
    if (session.guests.includes(currentUser)) {
      removeGuest(session);
    } else {
      setCurrentSession(session);
      setShowModal(true);
    }
  };

  const handleCloseModals = () => {
    setShowModal(false);
  };

  const handlePublicRSVP = (session) => {
    if (session.guests.includes(currentUser)) {
      removeGuest(session); 
    } else {
      addGuest(session);
    }
  };

  const buildCard = (session) => {
      return (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={session.id}>
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
                <Button onClick={() => handlePrivateRSVP(session)}>{session.guests.includes(currentUser) ? "Un-RSVP" : "Enter Password"}</Button>
              </div>
               :
               <div>
                <Typography>
                  Starts on {new Date(session.start).toLocaleString([], {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit', hour12: true})} ;
                </Typography>
                <Typography variant="body2" component="p">
                  Public session with {session.guests.length} participants
                </Typography>
                <Button onClick={() => handlePublicRSVP(session)}>{session.guests.includes(currentUser) ? "Un-RSVP" : "RSVP"}</Button>
               </div>
              }
            </CardContent>
          </Card>
        </Grid>
      );
    };
  
    card =
      sessionsData &&
      sessionsData.map((session) => {
        return buildCard(session);
      });

      if (error) {
        return <Error errorMessage={"404 - Page Not Found"}/>;
      }
      if (loading) {
        return (
          <div>
            <h2>Loading....</h2>
          </div>
        );
      } else {
        return(
          <div>
            {card ? (
            <Grid className='grid' container spacing={5}>
              {card}
            </Grid>
            ) : (<p>No sessions to show</p>)}
            {showModal && showModal && (
              <EnterSessionPassword
                isOpen={showModal}
                handleClose={handleCloseModals}
                session={currentSession}
                addGuest={addGuest}
              />
            )}
        </div>
      );}

}