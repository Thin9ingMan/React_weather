import { createContext, useContext, useState } from 'react'

const WeatherDateContext = createContext([]);
const WeatherDateSetContext = createContext(()=>{});
const WeatherHourContext = createContext([]);
const WeatherHourSetContext = createContext(()=>{});
const GeoContext = createContext([]);
const GeoSetContext = createContext(()=>{});

const WeatherProvider = ({children}) => {
  const [dateWether, setDateWether] = useState([]);
  const [hourWether, sethourWether] = useState([]);
  return (
    <WeatherDateContext.Provider value={dateWether}>
    <WeatherDateSetContext.Provider value={setDateWether}>
    <WeatherHourContext.Provider value={hourWether}>
    <WeatherHourSetContext.Provider value={sethourWether}>
      {children}
    </WeatherHourSetContext.Provider>
    </WeatherHourContext.Provider>
    </WeatherDateSetContext.Provider>
    </WeatherDateContext.Provider>
  )
}

const GeoProvider = ({children}) => {
  const [location, setLocation] = useState([]);
  return (
    <GeoContext.Provider value={location}>
    <GeoSetContext.Provider value={setLocation}>
      {children}
    </GeoSetContext.Provider>
    </GeoContext.Provider>
  )
}

const useDateWeather=()=> useContext(WeatherDateContext);
const useSetDateWeather=()=> useContext(WeatherDateSetContext);
const useHourWeather=()=> useContext(WeatherHourContext);
const useSetHourWeather=()=> useContext(WeatherHourSetContext);
const useLocation=()=> useContext(GeoContext);
const useSetLocation=()=> useContext(GeoSetContext);

export default WeatherProvider
export {useDateWeather, useSetDateWeather, useLocation, useSetLocation, GeoProvider, useHourWeather, useSetHourWeather}