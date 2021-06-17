
import styles from './App.module.css';

import { fetchData } from './Api';
import { useEffect, useState } from 'react';
import Cards from './components/Cards/Cards';
import CountryPicker from './components/CountryPicker/CountryPicker';
import Chart from './components/Chart/Chart';
import covidImage from './images/covidImage.png';


function App() {

  const [caseData, setCaseData] = useState({
    confirmed: { value: 0 },
    recovered: { value: 0 },
    deaths: { value: 0 },

  });

  const [country, setCountry] = useState('');

  useEffect(() => {

    async function dataFetched() {
      const fetchedData = await fetchData();

      setCaseData(fetchedData);
      setCountry('global')
    }
    dataFetched();

  }, []);

  async function handleCountryChange(country) {
    const fetchedDataGlobal = await fetchData();
    
    if(country === 'global'){
      setCaseData(fetchedDataGlobal)
      setCountry('global')
    }
    else{
      const fetchedData = await fetchData(country);
      setCaseData(fetchedData)
      setCountry(fetchedData)
    }
    
  }

  return (
    <div className={styles.container}>
      <img className={styles.image} src={covidImage} alt='Covid-19'  />
      < Cards data={caseData} />
      < CountryPicker handleCountryChange={handleCountryChange} />
      < Chart  caseData={caseData} country={country}  />
    </div>
  );
}

export default App;
