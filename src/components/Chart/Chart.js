import { useState, useEffect } from "react";
import { fetchDailyData } from "../../Api";

import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';


function Chart({ caseData, country,  }) {
   
    const [dailyData, setDailyData] = useState([]);
    
    useEffect(() => {
        async function getDailyData() {
            setDailyData(await fetchDailyData())
        }
        getDailyData();

    }, [])
    
    const lineChart = (
        dailyData ? ( 
        <Line

            data={{
                labels: dailyData.map(({ date }) => date),
                datasets: [{
                    data: dailyData.map(({ confirmed }) => confirmed),
                    label: 'Infected',
                    backgroundColor: 'rgba(0,0,255,0.3)',
                    borderColor: '#3333ff',
                    fill: true
                }, {
                    data: dailyData.map(({ deaths }) => deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255,0,0,0.3)',
                    fill: true
                },
                {
                    data: dailyData.map(({ recovered }) => recovered),
                    label: 'Recovered',
                    borderColor: 'green',
                    backgroundColor: 'rgba(0,255,0,0.3)',
                    fill: true
                }]
            }}

        />) : null )

    const barChart = (
        caseData ? ( 
        <Bar
            data={{
                labels: ['Infected', 'Recovered', 'Deaths'],
                datasets: [{
                    label: 'people',
                    backgroundColor: [
                        'rgba(0,0,255,0.3)',
                        'rgba(0,255,0,0.3)',
                        'rgba(255,0,0,0.3)'

                    ],
                    data: [caseData.confirmed.value, caseData.recovered.value, caseData.deaths.value]
                }]
            }}
            options={{
                legend: { display: false },
                title: { display: true, text: `current state in ${country}` }
            }}
        />) : null )

    return (
        <div className={styles.container}>
            {country !=='global' ? barChart : lineChart}
        </div>
    );
}

export default Chart;