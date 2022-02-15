/* eslint-disable array-callback-return */
import * as React from 'react';
import {
  useQuery,
  gql
} from "@apollo/client";
import ReactCountryFlag from 'react-country-flag';
import { sortByName } from '../../../App/helper';

interface ICountriesListProps {
  continentCode: string;
  // onDetailClick: React.MouseEventHandler<HTMLButtonElement>;
  onDetailClick: Function;
  setSelectedCountry: Function;
}

const GET_COUNTRIES = gql`
  query($filter: CountryFilterInput){
    countries (filter: $filter) {
      code,
      name,
      emoji,
      emojiU,
      capital,
      continent {
        code,
        name,
      },
      languages {
        code,
        name,
      },
    }
  }
`;

export type Continent = {
  code: string,
  name: string,
  countries: Array<Country>,
};

export type Language = {
  code: string,
  name: string,
};

export type Country = {
  code: string,
  name: string,
  emoji: string,
  emojiU: string,
  capital: string,
  languages: Array<Language>,
  continent: Continent,
};

const CountriesList: React.FunctionComponent<ICountriesListProps> = (props) => {
  const { continentCode, onDetailClick, setSelectedCountry } = props;
  const { loading, error, data } = useQuery(GET_COUNTRIES, {
    variables: {
      filter: {
        continent: {
          eq: continentCode,
        }
      }
    }
  });
  // const decodeUriCode = (uri: String) => {
  //   const splitted = uri.split(' ');
  //   const stripped = splitted[0].split('+')[1];
  //   const stripped2 = splitted[1].split('+')[1];
  //   const decoded = `"\\U${stripped}\\U${stripped2}"`;
  //   return decoded.toLowerCase();
  // }

  const handleClick = (country: Country) => {
    setSelectedCountry(country);
    onDetailClick();
  }


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const sortedCountries = [...data.countries].sort(sortByName);

  return (
    <div className='list-container'>
      {data &&
        <div className='list-header'>
          <span style={{ fontSize: '1.5rem' }}>Country </span>
          <span>|</span>
          <span style={{ fontSize: '1rem' }}> Capital </span>
          <span>|</span>
          <span style={{ fontSize: '1rem' }}> Flag</span>
        </div>
      }
      {sortedCountries.map((c: Country) => (
        <div className='list-row'
        // style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', marginBottom: '20px' }}
        >
          <span style={{ fontSize: '1.5rem' }}>{c.name}</span>
          {c.capital &&
            <>
              <span>|</span>
              <span style={{ fontSize: '1rem' }}>{c.capital}</span>
            </>
          }
          {/* <p>{String.fromCodePoint(c.emojiU)}</p> */}
          <span>|</span>
          <span>
            <ReactCountryFlag countryCode={c.code} svg />
          </span>
          <button onClick={(e) => handleClick(c)} style={{ marginLeft: 'auto' }}>detail</button>
        </div>
      ))}
    </div>
  );
};

export default CountriesList;

