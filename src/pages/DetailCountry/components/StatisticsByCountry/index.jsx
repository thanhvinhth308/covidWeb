import { LinearProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import covidApi from '../../../../apis/covidApi';
import LineChart from '../../../../components/Chart/LineChart';
import CountrySelector from './components/CountrySelector';
StatisticsByCountry.propTypes = {};

function StatisticsByCountry(props) {
  const history = useHistory();
  const { countryName } = useParams();

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countryReport, setCountryReport] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [time, setTime] = useState(45);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };
  const handleTimeChange = (time) => {
    setTime(time);
  };

  useEffect(() => {
    try {
      const handleCountriesData = async () => {
        setIsLoading(true);
        const respond = await covidApi.getSummaryAllCountry();
        const countriesData = respond.map((country) => ({
          country: country.country,
          iso2: country.countryInfo.iso2?.toLowerCase(),
          flag: country.countryInfo?.flag,
        }));
        setCountries(countriesData);
        const country = countriesData.find((item) => item.country == countryName);
        setSelectedCountry(country.iso2);
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
      const Country = countries.find((country) => country.iso2 === selectedCountry);
      history.push(`/countries/${Country.country}`);

      covidApi
        .getSummaryByCountry(countryName, time)
        .then((res) => {
          setCountryReport(res);
          setIsLoading(false);
        })
        .catch((error) => {
          alert('Get Data failed,please try again');
          setIsLoading(false);
        });
    }
  }, [countries, selectedCountry, time, countryName]);

  return (
    <div>
      <CountrySelector
        onCountryChange={handleCountryChange}
        countries={countries}
        selectedCountry={selectedCountry}
      />
      {isLoading && <LinearProgress />}
      <LineChart onTimeChange={handleTimeChange} countryReport={countryReport} />
    </div>
  );
}

export default StatisticsByCountry;
