import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts'
import { SaleSuccess } from 'Types/Sale';
import { round } from 'Utils/format';
import { BASE_URL } from 'Utils/request';


type SeriesData = {
    name:String;
    data: number[];
}

type ChartData = {
    labels:{
        categories:string[];
    }
    series: SeriesData[]
}

function BarChart() {

    const [chartData, setChartData] = useState<ChartData>({ 
        labels: {
        categories: []
    },
    series: [
        {
            name: "",
            data: []                   
        }
    ]});

    useEffect(() => {
        axios.get(`${BASE_URL}/sales/success-by-seller`)
        .then(response => {
            const data = response.data as SaleSuccess[];
            const myLabels = data.map(x => x.sellerName);
            const mySeries = data.map(x => round(100.0 * x.deals / x.visited,1));
            setChartData({ 
                labels: {
                categories: myLabels,
            },
            series: [
                {
                    name: "% Sucesso",
                    data: mySeries,                  
                }
            ]});
        })     
    },[])

    const options = {
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
    };
    
    return (
        <Chart
            options={{ ...options,xaxis:chartData.labels}}
            series={chartData.series}
            type="bar"
            height="240"
        />
        
    );
  }
  
  export default BarChart;
  