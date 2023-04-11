import * as React from 'react';

import Goals from './goals';
import Schedule from './schedule';
import Todo from './todo';

export default function Dashboard() {

    return(
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: "5px", padding: "0 15px" }}>
            <Todo />
            <Schedule />
            <Goals />
        </div>
    );

}