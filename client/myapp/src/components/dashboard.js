import * as React from 'react';
import Goals from './goals';
import Schedule from './schedule';
import Todo from './todo';


export default function Dashboard() {

    return(
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-evenly', marginTop: "25px"}}>
            <Todo />
            <Schedule />
            <Goals />
        </div>
    );

}