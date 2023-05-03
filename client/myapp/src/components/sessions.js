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
import Error from './Error';
import EnterSessionPassword from './modals/EnterSessionPassword';

export default function Sessions() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sessionsData, setSessionsData] = useState(undefined);
  const [showModal, setShowModal] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);
  const currentUser = "userid"; // get current user 
  let card = null;

  useEffect(() => {
    console.log('on load useeffect');
    setError(false);
    async function fetchData() {
      try {
        //const {data} = await axios.get(`http://localhost:3001/sessions`);
        //setSessionsData(data);
        setSessionsData([{
          id: "session123",
          name: "Fun",
          start: new Date("2023-04-10T10:00:00Z"),
          end: new Date("2023-04-15T10:00:00Z"),
          guests: ["user123", "user456"],
          host: "user123",
          isPrivate: true,
          password: "something"
        },
        {
          id: "session000",
          name: "Not fun",
          start: new Date("2023-04-10T10:00:00Z"),
          end: new Date("2023-04-15T10:00:00Z"),
          guests: ["user123", "user456"],
          host: "user123",
          isPrivate: false
        }]);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setError(true);
      }
    }
    fetchData();
  }, []);

  const handlePrivateRSVP = (session) => {
    if (session.guests.includes(currentUser)) {
      // already RSVP's, remove from list
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
      // already RSVP's, remove from list 
    } else {
      // add currentUser to session.guests
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
              />
            )}
        </div>
      );}

}