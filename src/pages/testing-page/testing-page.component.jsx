import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

const searchClient = algoliasearch('4YRCWBZ76R', 'b8cea3ce2fdfdc089ba334f075075808');

const TestingPage = () => (
  <InstantSearch searchClient={searchClient} indexName="demo_ecommerce">
    <SearchBox />
    <Hits />
  </InstantSearch>
);

export default TestingPage;