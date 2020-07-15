import React,{useState,useEffect} from 'react';
import classes from './CovidData.module.scss'
import Select from 'react-select'
import LineChart from './../../components/LineChart/LineChart';
import axios from 'axios';

const CovidData = () => {
    const [countries,setCountries] = useState([]);
    const [chosenCountry,setChosenCountry] = useState(null);
    const [graphData,setGraphData] = useState({});

    useEffect(()=>{
        getCountries();
    },[]);


const title = !chosenCountry ? <h1>Please choose a country</h1> : <h1>You chose {chosenCountry}</h1>;


    const getCountries = async () => {
        try {
            const response = await axios.get('https://api.covid19api.com/countries');
            setCountries(response.data)
            
        } catch (error) {
            console.log(error)
        }
    }

    const options = countries.map((country) => {
        return {
            label:country.Country,
            value:country.Slug
        }
    });

    const parseDateToYearAndMonth = (object)=>{
        if(object){
            const date = new Date(object.Date),
                  month = date.toLocaleString('default', { month: 'long' }),
                  day = date.getDay();
            return `${month} ${day}`;
        }
      
    }

    const getCountryGraphData = async (country) => {
        const response = await axios.get(`https://api.covid19api.com/total/country/${country}/status/confirmed?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z
        `)

        const updatedGraphData = response.data.map(d => {
           return  {
               ...d,
               parsedDate: parseDateToYearAndMonth(d)
           }
        
        })
     setGraphData(updatedGraphData);

    }

    const getGraph = (country) => {

        getCountryGraphData(country.value);
        setChosenCountry(country.label)
    }

    const graph = chosenCountry ? <LineChart data={graphData}/> : <p>Please chose a country in order to see some data</p>

    return <div className={classes.CovidData}>
           {title}
           <Select   components={{ IndicatorSeparator: null}}   options={options} onChange={getGraph} />
           {graph}
            
    </div>
}


export default CovidData;


