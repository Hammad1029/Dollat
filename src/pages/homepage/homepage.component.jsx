import './homepage.styles.css';

import React from 'react';

import { Button } from '@material-ui/core';

import Header from '../../components/header/header.component';
import HomePageSearch from '../../components/homepage-search/homepage-search.component';
import HomePageCategories from '../../components/homepage-categories/homepage-categories.component';



const HomePage = () => {

    return (
        <div className='homepage'>
            <div className='homepage-header-background'>
                <Header homepage />
                <div className='homepage-search-carousel'>
                    <HomePageSearch />
                </div>
            </div>
            <HomePageCategories />
            <h1>Our clients:</h1>
            <div className='homepage-get-started'>
                <h1>What are you waiting for? Get started!</h1>
                <div className='homepage-get-started-call-to-action'>
                    <Button variant="contained" color="primary">
                        <h1>Post Gig</h1>
                    </Button>
                    <Button variant="contained" color="primary">
                        <h1>View Gigs</h1>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HomePage;