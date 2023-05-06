/*
    NOTE: This came from an example on Material UI
    SOURCe: https://mui.com/material-ui/react-menu/
*/


import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BasicMenu = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        const func = async () => {
            console.log('logout')
            props.setUserInfo(undefined);
            console.log(await axios.get('http://localhost:3001/users/logout'));
            navigate('/login');
        }

        func().then();
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-label="Basic Button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MenuIcon id='hamburger' />
            </Button>
            <Menu
                id="basic-menu"
                aria-label="Basic Menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {!props.user && <MenuItem onClick={handleLogin}>Log in</MenuItem>}
                {props.user && <MenuItem onClick={handleLogout}>Log Out</MenuItem>}
            </Menu>
        </div>
    );

    
}

export default BasicMenu;