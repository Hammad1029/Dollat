import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textField: {
    backgroundColor: 'white'
  }
}))

const TestingPage = ({ width }) => {
  const classes = useStyles();

  const history = useHistory();

  const [search, setSearch] = useState('');
  const handleChange = e => setSearch(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    history.push(`/ViewGigs?search=${search}`);
  }

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <TextField className={classes.textField} size='small' style={{ width: width }}
        label="Search" variant="filled"
        onChange={handleChange} value={search} />
      <Button size='large' color='primary' variant='contained'
        type='submit'>
        <SearchIcon />
      </Button>
    </form>
  )
}

export default TestingPage;