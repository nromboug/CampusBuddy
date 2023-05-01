import '../App.css'

import { Outlet, Navigate } from 'react-router-dom';

const AuthComponent = (props) => {

    return (
        props.user ? <Outlet /> : <Navigate to='/login' />
    )

}

export default AuthComponent;
