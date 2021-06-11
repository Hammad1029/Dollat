import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { TextField, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const Search = ({ width }) => {
    const history = useHistory();

    const [search, setSearch] = useState('');
    const handleChange = e => setSearch(e.target.value);
    const handleKeyDown = e => {
        if (e.key === 'Enter') history.push(`/ViewGigs?search=${search}`);
    }
    const onClick = () => {
        if (search.length) history.push(`/ViewGigs?search=${search}`);
    }

    return (
        <div>
            <TextField style={{
                width: width,
                backgroundColor: 'white'
            }} label="Search" variant="filled"
                onChange={handleChange} onKeyDown={handleKeyDown} value={search} />
            <Button style={{ minHeight: '56px' }} color='primary' variant='contained'
                onClick={onClick}>
                <SearchIcon />
            </Button>
        </div>
    )
}

export default Search;