import './header.styles.css';
import DollatLogo from '../../logo.svg';

import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import { Button, Menu, MenuItem, Slide, Divider } from '@material-ui/core';

import AvatarPopup from '../avatar-popup/avatar-popup.component';
import Search from '../search/search.component';

const Header = ({ homepage }) => {
    const signedIn = useSelector(state => state.userReducer.currentUser.uid);
    const dispatch = useDispatch();
    const history = useHistory();

    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = e => setAnchorEl(e.currentTarget);
    const closeMenu = () => setAnchorEl(null);

    return (
        <div className='header'>
            <div className='header-menu'>
                <div className='header-search'>
                    <img alt='Dollat Logo' src={DollatLogo} onClick={() => history.push('/')}
                        style={homepage ? { filter: 'invert(1)' } : null} />
                    <Search />
                </div>
                <div className='header-options'>
                    <Button style={homepage ? {
                        color: 'white',
                        backgroundColor: 'rgba(255,255,255,0.1)'
                    } : {
                        color: 'black',
                        backgroundColor: 'rgba(0,0,0,0.1)'
                    }} onMouseEnter={openMenu}>
                        Categories
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        MenuListProps={{ onMouseLeave: closeMenu }}
                        TransitionComponent={Slide}
                    >
                        <MenuItem onClick={closeMenu}>Digital Marketing</MenuItem>
                        <MenuItem onClick={closeMenu}>Video and Animation</MenuItem>
                        <MenuItem onClick={closeMenu}>Music and Audio</MenuItem>
                        <MenuItem onClick={closeMenu}>Writing and Translation</MenuItem>
                        <MenuItem onClick={closeMenu}>Software Development</MenuItem>
                        <MenuItem onClick={closeMenu}>--- Web Development</MenuItem>
                        <MenuItem onClick={closeMenu}>--- App Development</MenuItem>
                        <MenuItem onClick={closeMenu}>--- Other</MenuItem>
                        <MenuItem onClick={closeMenu}>Other</MenuItem>
                    </Menu>
                    <NavLink to='Testing' activeClassName='active-page'>
                        Testing Page
                    </NavLink>
                    <NavLink to='ViewGigs' activeClassName='active-page'>
                        View Gigs
                    </NavLink>
                    <NavLink to='PostGig' activeClassName='active-page'>
                        Post Gig
                    </NavLink>
                    {
                        signedIn
                            ? <AvatarPopup />
                            : <Fragment>
                                <Button style={{ margin: '0px 15px', minHeight: '40px' }} color='primary'
                                    variant='contained' onClick={() => dispatch({ type: 'TOGGLE_SIGNIN_POPUP' })}>
                                    Sign In
                                </Button>
                                <Button style={{ minHeight: '40px' }} color='primary' variant='contained'
                                    onClick={() => dispatch({ type: 'TOGGLE_SIGNUP_POPUP' })}>
                                    Sign Up
                                </Button>
                            </Fragment>
                    }
                </div>
            </div>
            {!homepage ? <Divider /> : null}
        </div >
    )
}

export default Header;