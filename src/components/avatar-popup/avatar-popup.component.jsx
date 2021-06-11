import './avatar-popup.styles.css';

import React, { useState, Fragment } from 'react';
import { useSelector } from 'react-redux';

import { authRef } from '../../firebase/firebase';

import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Divider, Popover } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

const avatarStyles = makeStyles((theme) => ({
    root: {
        padding: '0px',
        width: theme.spacing(8),
        height: theme.spacing(8),
        '&:hover': { cursor: 'pointer' }
    },
    popup: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        '&:hover': { cursor: 'pointer' }
    }
}));

const AvatarPopup = () => {
    const avatarClasses = avatarStyles();

    const { photoURL, name } = useSelector(state => state.userReducer.currentUser);

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = e => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Fragment>
            <Avatar src={photoURL}
                alt={name} className={avatarClasses.root} onClick={handleClick} />
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <div className='avatar-popup'>
                    <div className='avatar-popup-profile-info'>
                        <Avatar src={photoURL}
                            alt={name} className={avatarClasses.popup} />
                        <h2>{name}</h2>
                    </div>
                    <Divider />
                    <div className='avatar-popup-item'>
                        <DashboardIcon />
                        <p>Dashboard</p>
                    </div>
                    <div className='avatar-popup-item'>
                        <AccountBoxIcon />
                        <p>Account Settings</p>
                    </div>
                    <Divider />
                    <Button style={{ marginTop: '20px' }} color='primary' variant='contained'
                        onClick={() => authRef.signOut().catch(e => console.error(e))}>
                        Sign Out
                    </Button>
                </div>
            </Popover>
        </Fragment>
    )
}

export default AvatarPopup;