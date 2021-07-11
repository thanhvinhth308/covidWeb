import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import covidApi from '../../apis/covidApi';
import HighlightCard from './components/HighlightCard';
Highlight.propTypes = {};

function Highlight(props) {
  const [notableNumbers, setNotableNumbers] = useState([]);
  useEffect(() => {
    covidApi.getGlobalSummary().then(res => {
      const numbers = [
        {
          type: 'cases',
          title: 'Cases',
          number: res.cases
        },
        {
          type: 'recovered',
          title: 'Recovered',
          number: res.recovered
        },
        {
          type: 'deaths',
          title: 'Deaths',
          number: res.deaths
        }
      ];
      setNotableNumbers(numbers);
    });
  }, []);
  return (
    <Grid container spacing={3}>
      {notableNumbers.map(notableNumber => (
        <Grid item sm={4} xs={12} key={notableNumber.type}>
          <HighlightCard notableNumber={notableNumber} />{' '}
        </Grid>
      ))}
      ;
    </Grid>
  );
}

export default Highlight;
