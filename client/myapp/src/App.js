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
import AuthComponent from './components/AuthComponent';
import Sessions from './components/sessions';

import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';


function App() {
    const [userInfo, setUserInfo] = useState(undefined);

    useEffect((e) => {
        const logout = async () => {
            try {
                await axios.get('http://localhost:3001/users/logout');
            } catch (e) {
                console.log(e);
            }
        }
        logout();
    }, [])
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <div className='title-bar'>
                        <div className='prof-stuff'>
                            <Avatar className='avatar' src={userInfo && userInfo.image ? userInfo.image : noPfp} alt='profile picture' />
                            <BasicMenu user={userInfo} setUserInfo={setUserInfo} />
                        </div>


                        <h1>
                            Campus Buddy
                        </h1>
                        <div className='empty-div'></div>
                    </div>



                    <div>
                        <Link className='nav-link' to='/home'>
                            Home
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
                        <Route exact path='/home' element={<Home user={userInfo} />} />
                        <Route exact path='/signup' element={<Signup user={userInfo} />} />
                        <Route exact path='/login' element={<Login user={userInfo} setUserInfo={setUserInfo} />} />
                        <Route path='/' element={<AuthComponent user={userInfo} />}>
                            <Route path='/dashboard' element={<Dashboard user={userInfo} setUserInfo={setUserInfo} />} />
                            <Route path='/profile' element={<Profile user={userInfo} setUserInfo={setUserInfo} />} />
                            <Route path='/sessions' element={<Sessions user={userInfo} />} />
                        </Route>
                    </Routes>
                </div>

            </div>

        </Router>

    );
}

export default App;
