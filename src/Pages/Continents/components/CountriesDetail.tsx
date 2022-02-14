import * as React from 'react';
import {
  useQuery,
  gql
} from "@apollo/client";
import { Continent, Country } from './CountriesList';
import { sortByContinent } from '../../../App/helper';

interface ICountriesDetailProps {
  country?: Country,
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

const CountriesDetail: React.FunctionComponent<ICountriesDetailProps> = (props) => {
  const { country } = props;

  const { loading, error, data } = useQuery(GET_COUNTRIES);


  // const sortByContinent = (a: any, b: any) => {
  //   var textA = a.continent.name.toUpperCase();
  //   var textB = b.continent.name.toUpperCase();
  //   return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  // }
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log('selected country', country);
  const filteredData = data && country && data.countries.filter((c: Country) => {
    return c.languages.some(el => country.languages.some(el2 => el2.code === el.code));
  });
  const sortedData = filteredData.sort(sortByContinent);
  const onlyUnique = (value: any, index: number, self: Array<any>) => {
    return self.findIndex(item => item.continent.code === value.continent.code) === index;
  }
  const selectedLanguageSpokenContinents = filteredData.filter(onlyUnique).map((el: Country) => el.continent);
  const getCountryByContinent = (data: Array<Country>, continent: Continent) => {
    return sortedData.filter((country: Country) => country.continent.code === continent.code).sort(sortByContinent);
  }
  console.log('uniques continents', selectedLanguageSpokenContinents);
  console.log('filtered countries', filteredData);
  return (
    <div className='detail-table-container'>
      <table>
        <tr>
          <th>Country</th>
          <th>Continent</th>
        </tr>
        {selectedLanguageSpokenContinents.map((el: Continent) => (
          <>

            {getCountryByContinent(sortedData, el).map((c: Country, i: number) => (
              <>
                <tr style={{ backgroundColor: 'red' }}>
                  <td>{c.name}</td>
                  <td style={i !== 0 ? { display: 'none' } : { backgroundColor: 'blue' }} rowSpan={getCountryByContinent(sortedData, el).length}>{el.name}</td>
                </tr>
              </>
            ))}

            {/* <tr>
            </tr> */}
          </>
        ))}
      </table>
    </div>
  );
};

export default CountriesDetail;
