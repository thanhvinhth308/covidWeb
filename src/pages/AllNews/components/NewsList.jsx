import { Box, Grid } from '@material-ui/core';
import React from 'react';
import News from './News';

function NewsList(props) {
  const { allNews } = props;
  return allNews ? (
    <Box paddingTop="80px">
      <Grid container>
        {allNews.map((news, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <News news={news} />
          </Grid>
        ))}
      </Grid>
    </Box>
  ) : (
    <></>
  );
}

export default NewsList;
