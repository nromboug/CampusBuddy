import React, {useState, useEffect} from 'react';
import {
  Grid,
} from '@mui/material';
import axios from 'axios';
import Error from './Error';
import Session from './session';

export default function Sessions(props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sessionsData, setSessionsData] = useState(undefined);
  const currentUser = props.user.username; 
  let card = null;

  useEffect(() => {
    console.log('on load useeffect');
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
    setError(false);
    fetchData();
  }, []);

  
    card =
      sessionsData &&
      sessionsData.map((session) => {
        return <Session session={session} currentUser={currentUser}></Session>;
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
        </div>
      );}

}