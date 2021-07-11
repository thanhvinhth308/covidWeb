import { LinearProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import covidApi from '../../apis/covidApi';
import WorldLineChart from './components/WorldLineChart';

WorldStatistics.propTypes = {};

function WorldStatistics(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [worldReport, setWorldReport] = useState([]);
  const [time, setTime] = useState(45);
  const handleTimeChange = time => {
    setTime(time);
  };

  useEffect(() => {
    setIsLoading(true);
    covidApi
      .getHistoricalGlobalSummary(time)
      .then(res => {
        console.log('🚀 ~ file: index.jsx ~ line 19 ~ .then ~ res', res);
        setWorldReport(res);
        setIsLoading(false);
      })
      .catch(error => {
        alert('Get Data failed,please try again');
        setIsLoading(false);
      });
  }, [time]);

  return (
    <div>
      {isLoading && <LinearProgress />}
      <WorldLineChart onTimeChange={handleTimeChange} worldReport={worldReport} />
    </div>
  );
}

export default WorldStatistics;
