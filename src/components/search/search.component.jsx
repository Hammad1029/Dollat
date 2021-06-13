import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { TextField, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const TestingPage = ({ width }) => {onSubmit
  const history = useHistory();

  const [search, setSearch] = useState('');
  const handleChange = e => setSearch(e.target.value);
  
  const onSubmit = e => {
    e.preventDefault();
    history.push(`/ViewGigs?search=${search}`);
  }

  return (
    <form onSubmit={onSubmit}>
      <TextField style={{
        width: width,
        backgroundColor: 'white'
      }} label="Search" variant="filled"
        onChange={handleChange} value={search} />
      <Button style={{ minHeight: '56px' }} color='primary' variant='contained'
        type='submit'>
        <SearchIcon />
      </Button>
    </form>
  )
}

export default TestingPage;