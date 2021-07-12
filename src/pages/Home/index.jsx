import { Box, Paper } from '@material-ui/core';
import React from 'react';
import WorldMap from '../../components/Chart/WorldMap';
import Highlight from '../../components/Highlight';
import TableStatistics from '../../components/TableStatistics';
import WorldStatistics from '../../components/WorldStatistics';

function Home(props) {
  return (
    <Box paddingTop="80px">
      <Highlight />
      <Paper elevation={10}>
        <Box padding={2} margin={2}>
          <WorldMap />
        </Box>
      </Paper>
      <Paper elevation={10}>
        <Box padding={2} margin={2}>
          <WorldStatistics />
        </Box>
      </Paper>
      <Paper elevation={10}>
        <Box padding={2} margin={2}>
          <TableStatistics />
        </Box>
      </Paper>
    </Box>
  );
}

export default Home;
