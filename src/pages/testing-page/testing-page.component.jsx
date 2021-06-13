// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import algoliasearch from 'algoliasearch/lite';
// import { connectSearchBox, InstantSearch, Hits } from 'react-instantsearch-dom';

// import { TextField, Button } from '@material-ui/core';
// import SearchIcon from '@material-ui/icons/Search';

// const customSearchBox = ({ width, currentRefinement, isSearchStalled, refine }) => {

//   const history = useHistory();
//   const searchClient = algoliasearch(
//     '4YRCWBZ76R',
//     'b8cea3ce2fdfdc089ba334f075075808'
//   );
//   const handleChange = e => refine(e.target.value);
//   const onSubmit = e => {
//     e.preventDefault();
//     history.push(`/ViewGigs?search=${currentRefinement}`);
//   }

//   return (
//     <InstantSearch
//       indexName="dollat-gigs"
//       searchClient={searchClient}
//       searchState={currentRefinement}>
//       <form style={{ margin: '100px' }} onSubmit={onSubmit}>
//         <TextField style={{
//           width: width,
//           backgroundColor: 'white'
//         }} label="Search" variant="filled"
//           onChange={handleChange} value={currentRefinement} />
//         <Button style={{ minHeight: '56px' }} color='primary' variant='contained'
//           type='submit'>
//           <SearchIcon />
//         </Button>
//         {isSearchStalled ? 'Search Stalled' : ''}
//       </form>
//       <Hits />
//     </InstantSearch>
//   )
// }

// const TestingPage = connectSearchBox(customSearchBox);
// export default TestingPage;

import React from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';

const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
  <form noValidate action="" role="search">
    <input
      type="search"
      value={currentRefinement}
      onChange={event => refine(event.currentTarget.value)}
    />
    <button onClick={() => refine('')}>Reset query</button>
    {isSearchStalled ? 'My search is stalled' : ''}
  </form>
);

const TestingPage = connectSearchBox(SearchBox);
export default TestingPage;