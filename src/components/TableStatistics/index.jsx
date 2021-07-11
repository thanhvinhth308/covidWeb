import { DataGrid } from '@material-ui/data-grid';
import React, { useEffect, useState } from 'react';
import covidApi from '../../apis/covidApi';
TableStatistics.propTypes = {};

const columns = [
  { field: 'id', headerName: 'id', width: 100 },
  // {
  //   field: 'flag',
  //   headerName: 'flag',
  //   width: 200,
  //   valueGetter: (params) => `<img src=${params.row.flag} />`,
  // },
  { field: 'country', headerName: 'country', width: 200 },
  { field: 'continent', headerName: 'continent', width: 200 },
  { field: 'cases', headerName: 'cases', type: 'number', width: 200 },
  {
    field: 'recovered',
    headerName: 'recovered',
    type: 'number',
    width: 200
  },
  {
    field: 'deaths',
    headerName: 'deaths',
    type: 'number',
    width: 200
  }
];

function TableStatistics(props) {
  const [infoCountries, setInfoCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleMapData = async () => {
      setIsLoading(true);
      const information = await covidApi.getSummaryAllCountry();
      const informationFilter = information.map((country, index) => ({
        id: index + 1,
        // flag: country.countryInfo.flag,
        country: country?.country,
        continent: country?.continent,
        cases: country?.cases,
        recovered: country?.recovered,
        deaths: country?.deaths
      }));
      setIsLoading(false);
      setInfoCountries(informationFilter);
    };
    try {
      handleMapData();
    } catch (error) {
      alert('Get Data failed,please try again');
      setIsLoading(false);
    }
  }, []);
  return (
    <div style={{ height: 620, width: '100%' }}>
      <DataGrid
        showCellRightBorder={true}
        showColumnRightBorder={true}
        loading={isLoading}
        rows={infoCountries}
        columns={columns}
        pageSize={10}
      />
    </div>
  );
}

export default TableStatistics;
