

import './fiveday.css';
import React, {Component } from 'react';
import loader from '../img/loader-new.gif';
import {toCelsius, toFahrenheit, tryConvert } from '../tools/tempconverter.js'
import {getWeatherFiveDayForecast } from '../tools/getweather.js'



 
const groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    });
 }




export default class FivedayForeCast extends Component {
     constructor(props){
         super(props);
         this.convertTemp = this.handleChange.bind(this);
         this.handleChange = this.handleChange.bind(this);
         this.state = {
            forecastList: [],
            location:[],
            temp:[],
            unit: "C",
            mainTemp: 0,
         };
     }
     
    componentDidMount(){
        this.setState({ isLoading: true });
        getWeatherFiveDayForecast().then(data => {
            // let groupedByDay = groupByTime(data.list, 'ts', 'day')
            console.log(data.list);
            this.setState({
                forecastList: data.list,
                location: data.name,
                isLoading: false,
                unit: "C",
                // mainTemp: data.main
             });
        });
     }
    
   

    handleChange(e) {
        if(this.state.unit === "F") {
        const toF= tryConvert(this.state.forecast.main.temp, toFahrenheit);
        this.setState({unit: e.target.value,
                        mainTemp: toF});
        console.log(e.target.value);
        console.log(this.state.unit);
        }
        else{
        const toC= tryConvert(this.state.forecast.main.temp, toCelsius);
        this.setState({unit: e.target.value,
                        mainTemp: toC });
        console.log(e.target.value);
        console.log(this.state.unit);

        }
    }

     
    render(){
          
        
        const { unit, location, forecastList, isLoading } = this.state;

        if (isLoading) {
            return <img className="loader" src={loader}/>
        }
        
        
        const locationTitle = <h2>{location}</h2>;

        const degreeConverter =  <select value={unit} onChange={this.handleChange}>
                                    <option value="C">C°(celcius)</option>
                                    <option value="F">F°(Fahrenheit)</option>
                                </select>;
        

        const content = forecastList.map((forecast,index) =>
        <div className="forecast-container" key={index}>
            {}
            <h3>{forecast.dt_txt}</h3> 
                <ul>
                    <li><p className="temp">{forecast.main.temp}{unit}°</p></li>
                    <p>weather: {forecast.weather[0].main} </p>
                    <div className="hot">{forecast.main.temp_max}</div><div className="cold">{forecast.main.temp_min}</div>
                    <img className="weather-icon" src={`https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`} />
                    <p>{forecast.clouds.all}</p> 
                </ul>
        </div>
        );

         return( 
            <div>
                {locationTitle}
                {degreeConverter}
                    <div className="fiveday-forecast">
                        {content}
                    </div>
            </div>  
        )
     }
 }