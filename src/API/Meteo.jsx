import { fetchWeatherApi } from 'openmeteo';
import { useSetDateWeather, useLocation } from '../Context/Provider';
import { useEffect } from 'react';

const params = {
    "latitude": 35.6895,
    "longitude": 139.6917,
    "daily": ["precipitation_probability_max", "precipitation_hours", "temperature_2m_max", "temperature_2m_min"],
    "hourly": ["temperature_2m", "precipitation_probability", "precipitation"],
    "current": ["temperature_2m", "precipitation"],
    "timezone": "Asia/Tokyo"
};
const url = "https://api.open-meteo.com/v1/forecast";


const Meteo=()=>{
    const setDateWeather=useSetDateWeather();
    const Location=useLocation();
    useEffect(()=>{
        const fetchAPI = async ()=>{
            let newparams={};
            if (Location.length!==0){
                newparams={...params, "latitude": Number(Location[0]), "longitude": Number(Location[1])};
                console.log(Location);
            }else{
                newparams={...params};
            }
            const responses = await fetchWeatherApi(url, newparams);

            // Process first location. Add a for-loop for multiple locations or weather models
            const response = responses[0];
            
            // Attributes for timezone and location
            const utcOffsetSeconds = response.utcOffsetSeconds();
            const timezone = response.timezone();
            const timezoneAbbreviation = response.timezoneAbbreviation();
            const latitude = response.latitude();
            const longitude = response.longitude();
            
            const current = response.current();
            const hourly = response.hourly();
            const daily = response.daily();
            
            // Note: The order of weather variables in the URL query and the indices below need to match!
            const weatherData = {
                current: {
                    time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
                    temperature2m: current.variables(0).value(),
                    precipitation: current.variables(1).value(),
                },
                hourly: {
                    time: [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
                        (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
                    ),
                    temperature2m: hourly.variables(0).valuesArray(),
                    precipitationProbability: hourly.variables(1).valuesArray(),
                    precipitation: hourly.variables(2).valuesArray(),
                },
                daily: {
                    time: [...Array((Number(daily.timeEnd()) - Number(daily.time())) / daily.interval())].map(
                        (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
                    ),
                    precipitationProbabilityMax: daily.variables(0).valuesArray(),
                    precipitationSum: daily.variables(1).valuesArray(),
                    temperature2mMax: daily.variables(2).valuesArray(),
                    temperature2mMin: daily.variables(3).valuesArray(),
                },
            };
                // `weatherData` now contains a simple structure with arrays for datetime and weather data

            // for (let i = 0; i < weatherData.hourly.time.length; i++) {
            //     console.log(
            //         weatherData.hourly.time[i].toISOString(),//日付, 時間
            //         weatherData.hourly.temperature2m[i],//温度
            //         weatherData.hourly.precipitationProbability[i],//前の時間の降水確率
            //         weatherData.hourly.precipitation[i]//降水量
            //     );
            // }
            let newList=[];
            for (let i = 0; i < weatherData.daily.time.length; i++) {
                const Date = weatherData.daily.time[i].toISOString()//日付
                const prePro = weatherData.daily.precipitationProbabilityMax[i]//降水確率
                const rainSum = weatherData.daily.precipitationSum[i]//日降水量の合計
                const tempMax = Math.round(weatherData.daily.temperature2mMax[i]*10)/10//最高気温
                const tempMin = Math.round(weatherData.daily.temperature2mMin[i]*10)/10//最高気温

                const newObj={Date: Date, precipitationProbability: prePro, rainSum: rainSum,
                            temperatureMax: tempMax, temperatureMin: tempMin};
                newList=[...newList, newObj];
            };
            setDateWeather(newList);
            console.log('updated!');
        };
        fetchAPI();
    }, [setDateWeather, Location])

};

export default Meteo
