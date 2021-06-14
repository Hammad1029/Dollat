import Logo from './Dollat-B.png';
import backgroundImage from './bg.jpg';
import Hammad from './hammad.jpg';
import Freelancer from './freelancer.jpg';

import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Link as Scroll } from 'react-scroll';

import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar, Toolbar, Button, IconButton, Collapse, Card, CardMedia, CardContent, Typography, CardActionArea,
    CardActions
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const members = [
    {
        name: 'Kumail Waqar',
        position: 'CEO',
        tagline: 'sexy boy',
        image: Hammad
    },
    {
        name: 'Hammad Ul Haq',
        position: 'CTO',
        tagline: 'sexy boy',
        image: Hammad
    },
    {
        name: 'Raahim Riaz',
        position: 'COO',
        tagline: 'sexy boy',
        image: Hammad
    },
    {
        name: 'Abdul Rafay Qadir',
        position: 'CFO',
        tagline: 'sexy boy',
        image: Hammad
    },
    {
        name: 'Uzair',
        position: 'Director Affairs',
        tagline: 'sexy boy',
        image: Hammad
    },
    {
        name: 'Javeria',
        position: 'Director Counseling',
        tagline: 'sexy girl',
        image: Hammad
    },
]

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 1
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 1
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1
    }
};

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '200vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
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
        fontSize: '60px'
    },
    ctaContainer: {
        margin: '100px 150px',
        display: 'flex',
        justifyContent: 'space-between',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(345px, 1fr))',
        gap: '20px',
        '&>div': {
            height: '600px',
            backgroundColor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(5px)',
            color: 'white',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': {
                cursor: 'pointer'
            }
        }
    },
    members: {
        margin: 30
    },
    memberCard: {
        maxWidth: 345,
    },
    memberCardMedia: {
        height: 350,
        backgroundSize: 'contain'
    },
}));

const LandingPage = () => {
    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        setChecked(true);
    }, []);
    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar} position="static">
                <Toolbar>
                    <img className={classes.logo} alt='Dollat Logo' src={Logo} />
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
                    <Scroll to="landing-page-call-to-action" smooth={true}>
                        <IconButton>
                            <ExpandMoreIcon className={classes.goDown} />
                        </IconButton>
                    </Scroll>
                </div>
                <div id="landing-page-call-to-action" className={classes.ctaContainer}>
                    <div>
                        <h1>Visit our freelancing portal</h1>
                    </div>
                    <div>
                        <h1>Coming soon!</h1>
                    </div>
                    <div>
                        <h1>Coming soon!</h1>
                    </div>
                    {/* <Card className={classes.root}>
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
                        </Card> */}
                </div>
                <Carousel className={classes.members} responsive={responsive}>
                    {
                        members.map((member, idx) => {
                            const { name, position, tagline, image } = member;
                            return (
                                <Card className={classes.memberCard}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.memberCardMedia}
                                            image={image}
                                            title={name}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {name}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {tagline}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            )
                        })
                    }
                </Carousel>;
            </Collapse>
        </div>
    )
}

export default LandingPage;