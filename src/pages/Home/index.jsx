import { Box } from '@material-ui/core';
import React from 'react';
import WorldMap from '../../components/Chart/WorldMap';
import Highlight from '../../components/Highlight';
import TableStatistics from '../../components/TableStatistics';
import WorldStatistics from '../../components/WorldStatistics';

function Home(props) {
  return (
    <Box paddingTop="80px">
      <Highlight />
      <WorldMap />
      <WorldStatistics />
      <TableStatistics />
    </Box>
  );
}

export default Home;
