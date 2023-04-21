import logo from './logo.svg';
import './App.css';
import Avatar from '@mui/material/Avatar'
import noPfp from './imgs/blank-profile-picture.jpg'


import BasicMenu from './components/menu';

import Login from './components/login';
import Signup from './components/signup';

import Home from './components/Home';
import Profile from './components/Profile';
import Dashboard from './components/dashboard';
import Sessions from './components/sessions';

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
                            Home
                        </Link>
                        <Link className='nav-link' to='/signup'>
                            Sign Up
                        </Link>
                        <Link className='nav-link' to='/login'>
                            Log In
                        </Link>
                        <Link className='nav-link' to='/profile'>
                            Profile
                        </Link>
                        <Link className='nav-link' to='/dashboard'>
                            My Dashboard
                        </Link>
                        <Link className='nav-link' to='/sessions'>
                            Browse Sessions
                        </Link>
                    </div>
                </header>
                <br />
                <br />
                <div className="App-body">
                    <Routes>
                        <Route exact path='/' element={<Home />}/>
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/sessions' element={<Sessions />} />
                        <Route exact path='/signup' element={<Signup />}/>
                        <Route exact path='/login' element={<Login />}/>
                        <Route exact path='/profile' element={<Profile />}/>
                    </Routes>
                </div>

            </div>
            
        </Router>

    );
}

export default App;
