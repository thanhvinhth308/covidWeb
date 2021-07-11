import { LinearProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import covidApi from '../../apis/covidApi';
import LineChart from '../Chart/LineChart';
import CountrySelector from './components/CountrySelector';
StatisticsByCountry.propTypes = {};

function StatisticsByCountry(props) {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countryReport, setCountryReport] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [time, setTime] = useState(45);

  const handleCountryChange = e => {
    setSelectedCountry(e.target.value);
  };
  const handleTimeChange = time => {
    setTime(time);
  };

  useEffect(() => {
    try {
      const handleCountriesData = async () => {
        setIsLoading(true);
        const respond = await covidApi.getSummaryAllCountry();
        const countriesData = respond.map(country => ({
          country: country.country,
          iso2: country.countryInfo.iso2?.toLowerCase(),
          flag: country.countryInfo?.flag
        }));
        setCountries(countriesData);
        setSelectedCountry('vn');
        setIsLoading(false);
      };
      handleCountriesData();
    } catch (error) {
      alert('Get Data failed,please try again');
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      setIsLoading(true);
      const Country = countries.find(country => country.iso2 === selectedCountry);
      covidApi
        .getSummaryByCountry(Country.country, time)
        .then(res => {
          setCountryReport(res);
          setIsLoading(false);
        })
        .catch(error => {
          alert('Get Data failed,please try again');
          setIsLoading(false);
        });
    }
  }, [countries, selectedCountry, time]);

  return (
    <div>
      <CountrySelector onCountryChange={handleCountryChange} countries={countries} selectedCountry={selectedCountry} />
      {isLoading && <LinearProgress />}
      <LineChart onTimeChange={handleTimeChange} countryReport={countryReport} />
    </div>
  );
}

export default StatisticsByCountry;
