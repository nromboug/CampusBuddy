import logo from './logo.svg';
import './App.css';
import Avatar from '@mui/material/Avatar'
import noPfp from './imgs/blank-profile-picture.jpg'


import BasicMenu from './components/menu';

import Login from './components/login';
import Signup from './components/signup';

import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'


function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <div className='title-bar'>
                        <div className='prof-stuff'>
                            <Avatar className='avatar' src={noPfp} />
                            <BasicMenu />
                        </div>


                        <h1>
                            Campus Buddy
                        </h1>
                        <div className='empty-div'></div>
                    </div>



                    <div>
                        <Link className='nav-link' to='/'>
                            My Dashboard
                        </Link>
                        <Link className='nav-link' to='/'>
                            My Dashboard
                        </Link>
                    </div>
                </header>
                <div className='App-body'>
                    <Signup />
                </div>

            </div>
            
        </Router>

    );
}

export default App;
