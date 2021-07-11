import { Button, ButtonGroup } from '@material-ui/core';
import Highchart from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect, useState } from 'react';
WorldLineChart.propTypes = {};

const generateOptions = data => {
  // const categories = data.map((item) => moment(item.Date).format('DD/MM/YYYY'));

  return {
    chart: {
      height: 500
    },
    title: {
      text: 'The World'
    },
    xAxis: {
      categories: data.cases && Object.keys(data.cases),
      crosshair: true
    },
    colors: ['#F3585B', 'yellow', 'black'],
    yAxis: {
      min: 0,
      title: {
        text: null
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        `<tr><td style="color:{series.color};padding:0">{series.name}:</td>` +
        `<td style="padding:0"><b>{point.y} ca</b></td></tr>`,
      footerFormat: '</table>',
      shared: 'true',
      useHTML: 'true'
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [
      {
        name: 'Số ca nhiễm',
        data: data.cases && Object.values(data.cases)
      },
      {
        name: 'Số ca chết',
        data: data.deaths && Object.values(data.deaths)
      },
      {
        name: 'Số ca khỏi',
        data: data.recovered && Object.values(data.recovered)
      }
    ]
  };
};

function WorldLineChart(props) {
  const { worldReport, onTimeChange } = props;
  const [options, setOptions] = useState({});
  const [reportType, setReportType] = useState(45);
  const handleTimeChange = time => {
    setReportType(time);
    if (onTimeChange) {
      onTimeChange(time);
    }
  };

  useEffect(() => {
    setOptions(generateOptions(worldReport));
  }, [worldReport, reportType]);
  return (
    <div>
      <ButtonGroup size="small" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button color={reportType === 45 ? 'secondary' : ''} onClick={() => handleTimeChange(45)}>
          45 ngày
        </Button>
        <Button color={reportType === 30 ? 'secondary' : ''} onClick={() => handleTimeChange(30)}>
          30 ngày
        </Button>
        <Button color={reportType === 7 ? 'secondary' : ''} onClick={() => handleTimeChange(7)}>
          7 ngày
        </Button>
      </ButtonGroup>
      <HighchartsReact highcharts={Highchart} options={options} />
    </div>
  );
}

export default WorldLineChart;
