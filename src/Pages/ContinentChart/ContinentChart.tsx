import * as React from 'react';
import {
  useQuery,
  gql
} from "@apollo/client";
import { Continent } from '../Continents/components/CountriesList';
import { Bar } from 'react-chartjs-2';
import {Chart, registerables} from 'chart.js';

Chart.register(...registerables);
interface IContinentChartProps {
}

const CONTINENTS_QUERY = gql`
  {
    continents {
      code
      name
      countries {
        name
        code
      }
    }
  }
`;

type ContinentCountryCount = {
  [key: string]: [number, number, number],
}

const ContinentChart: React.FunctionComponent<IContinentChartProps> = (props) => {
  const { loading, error, data } = useQuery(CONTINENTS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  //   let chartData: ContinentCountryCount = {};
  // data.continents.forEach((c: Continent) => {
  //   chartData[c.name] = [c.countries.length, 5, 5];
  // });
  const chartData = data.continents.map((c: Continent, i:number) => ({ title: c.name, value: c.countries.length}));
  const testData = {
    // labels:["1inci", "2inci", "3üncü", "4"],
    labels: chartData.map((el: { title: string; }) => el.title),
    datasets: [
      {
        label: 'Country Count',
        data: chartData.map((el: { value: any; }) => el.value),
        backgroundColor: ['white'],
      }
    ],
  };
  return (
    <div>
      <Bar
        data={testData}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: {
              type: 'linear',
            }
          },
        }}
      />
    </div>
  );
};

export default ContinentChart;
