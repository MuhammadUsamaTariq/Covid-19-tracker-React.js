import { NativeSelect, FormControl } from "@material-ui/core";
import styles from './CountryPicker.module.css';

import { fetchContriesData } from "../../Api";
import { useEffect, useState } from "react";





function CountryPicker({ handleCountryChange }) {

    const [countriesData, setCountriesData] = useState([]);


    useEffect(() => {
        async function fetchCountries() {

            setCountriesData(await fetchContriesData())
        }
        fetchCountries();
    }, [])


    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue='' onChange={(e)=>{handleCountryChange(e.target.value)}}>
                <option value='global'>Global </option>
                {countriesData.map((country, index) => <option key={index} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    );
}

export default CountryPicker;