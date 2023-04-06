import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'


function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>
                        Campus Buddy
                    </h1>
                    <div>
                        <Link className='nav-link' to='/'>
                            My Dashboard
                        </Link>
                        <Link className='nav-link' to='/'>
                            My Dashboard
                        </Link>
                    </div>
                </header>
                <body>
                    This body
                </body>
            </div>
        </Router>

    );
}

export default App;
