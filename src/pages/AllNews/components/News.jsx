import { Box, Paper, Typography } from '@material-ui/core';
import React from 'react';

function News(props) {
  const { news } = props;
  return (
    <Paper elevation={4}>
      <Box padding={1} bgcolor="white" minHeight="335px">
        <Box padding={1} color="blue">
          <Box minHeight="220px" height="220px" padding={1} overflow="hidden">
            <img src={news?.urlToImage} alt="not found" width="100%" />
          </Box>
          <Typography variant="body1">Title: {news.title}</Typography>
          <Typography variant="caption">Author {news.author}</Typography>
        </Box>
        <Box>{/* <AddToCartForm onSubmit={handleDrinkAddToCart} /> */}</Box>
      </Box>
    </Paper>
  );
}

export default News;
