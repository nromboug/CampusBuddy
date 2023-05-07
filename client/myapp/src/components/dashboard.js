import * as React from 'react';
import Goals from './goals';
import Schedule from './schedule';
import Todo from './todo';


export default function Dashboard(props) {
    const currentUser = props.user; 
    return(
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-evenly', marginTop: "25px"}}>
            <Todo user={currentUser}}/>
            <Schedule user={currentUser}/>
            <Goals user={currentUser}/>
        </div>
    );

}