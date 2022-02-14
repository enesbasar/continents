/* eslint-disable array-callback-return */
import * as React from 'react';
import {
  useQuery,
  gql
} from "@apollo/client";
import CountriesList, { Country } from './components/CountriesList';
import CountriesDetail from './components/CountriesDetail';

interface IContinent {
  name?: string;
  value?: number;
}

interface IContinentsProps {
  continents?: Array<IContinent>;
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

type Continent = {
  code: string,
  name: string,
};

const Continents: React.FunctionComponent<IContinentsProps> = (props) => {
  const [selectedContinent, setSelectedContinent] = React.useState('');
  const [selectedCountry, setSelectedCountry] = React.useState<Country | undefined>();
  const [isDetailOpen, setIsDetailOpen] = React.useState(false);
  const { loading, error, data } = useQuery(CONTINENTS_QUERY);
  const { continents } = props;

const toggleDetail = () => {
  setIsDetailOpen(!isDetailOpen);
}

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log('selectedContinent', selectedContinent);
  return (
    isDetailOpen
    ?
    <div className='detail-wrapper'>
      <span style={{ cursor: 'pointer' }} onClick={toggleDetail}>Back</span>
      <CountriesDetail country={selectedCountry} />
    </div>
    :
    <div>
      <span>Kıtalar:</span>
      <select value={selectedContinent} onChange={(e) => {
        console.log(e.target);
        setSelectedContinent(e.target.value);
      }} style={{ width: '150px' }} name="continents">
        {data.continents.map((c: Continent) => (
          <option key={c.code} style={{ width: '150px' }} value={c.code}>{c.name}</option>
        ))}
      </select>
      <div>{JSON.stringify(selectedContinent)}</div>
      {selectedContinent && data &&
        <CountriesList onDetailClick={toggleDetail} continentCode={selectedContinent} setSelectedCountry={setSelectedCountry} />
      }
    </div>
  );
};

export default Continents;

