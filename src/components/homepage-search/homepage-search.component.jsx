import './homepage-search.styles.css';

import React from 'react';

import { Chip } from '@material-ui/core';
import Search from '../search/search.component';

const HomePageSearch = () => {

    return (
        <div className='homepage-search'>
            <p>FIND THE PERFECT FREELANCE</p>
            <p className='homepage-search-pakistan-green'>SERVICES FOR YOU BUSINESS</p>
            <Search width='50ch' />
            <div className='homepage-search-chips'>
                <i>Try:</i>
                <Chip label='Web Development' />
                <Chip label='App Development' />
                <Chip label='Content Writing' />
            </div>
        </div>
    )
}

export default HomePageSearch;