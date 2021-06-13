import './landing-page.styles.css';
import Logo from './Dollat-B.png';
import Freelancer from './freelancer.jpg';

import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Link as Scroll } from 'react-scroll';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, IconButton, Collapse, Card, CardMedia, CardContent, Typography, CardActionArea } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        '& a': {
            textDecoration: 'none',
            color: 'white',
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: '20px',
            margin: '20px'
        },
    },
    logo: {
        width: '200px',
        margin: '30px',
        marginRight: 'auto',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    activePage: {
        color: 'yellow'
    },
    welcome: {
        color: 'white',
        height: '50vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '40px'
    },
    welcomeText: {
        color: 'aquamarine'
    },
    goDown: {
        color: 'aquamarine',
        fontSize: '6d0px'
    }
}));

const LandingPage = () => {
    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        setChecked(true);
    }, []);

    return (
        <div className='landing-page'>
            <div className={classes.root}>
                <AppBar className={classes.appBar} position="static">
                    <Toolbar>
                        <img className={classes.logo} alt='Dollat Logo' src={Logo} />
                        <NavLink to='/LandingPage' activeClassName={classes.activePage}>
                            Home
                        </NavLink>
                        <NavLink to='/abc' activeClassName={classes.activePage}>
                            Who we are
                        </NavLink>
                        <NavLink to='/abc' activeClassName={classes.activePage}>
                            What we do
                        </NavLink>
                        <NavLink to='/abc' activeClassName={classes.activePage}>
                            Our work
                        </NavLink>
                        <NavLink to='/abc' activeClassName={classes.activePage}>
                            Get in touch
                        </NavLink>
                    </Toolbar>
                </AppBar>
                <Collapse
                    in={checked}
                    {...(checked ? { timeout: 1000 } : {})}
                    collapsedHeight={50}
                >
                    <div className={classes.welcome}>
                        <h1>Welcome to</h1>
                        <h1 className={classes.welcomeText}>Dollat.org</h1>
                        <Scroll to="place-to-visit" smooth={true}>
                            <IconButton>
                                <ExpandMoreIcon className={classes.goDown} />
                            </IconButton>
                        </Scroll>
                    </div>
                    <div className={classes.root} id="place-to-visit">
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={'https://image.shutterstock.com/image-photo/tattooed-lucky-freelancer-front-his-600w-458395321.jpg'}
                                    title='Freelancing Portal'
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                    Freelancing Portal
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        A freelancing portal made by Pakistanis for Pakistanis
                                     </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </div>
                </Collapse>
            </div>
        </div>
    )
}

export default LandingPage;