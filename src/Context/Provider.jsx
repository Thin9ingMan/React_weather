import { createContext, useContext, useState } from 'react'

const WeatherContext = createContext([]);
const WeatherSetContext = createContext(()=>{});
const GeoContext = createContext([]);
const GeoSetContext = createContext(()=>{});

const WeatherProvider = ({children}) => {
  const [dateWether, setDateWether] = useState([]);
  return (
    <WeatherContext.Provider value={dateWether}>
    <WeatherSetContext.Provider value={setDateWether}>
      {children}
    </WeatherSetContext.Provider>
    </WeatherContext.Provider>
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

const useDateWeather=()=> useContext(WeatherContext);
const useSetDateWeather=()=> useContext(WeatherSetContext);
const useLocation=()=> useContext(GeoContext);
const useSetLocation=()=> useContext(GeoSetContext);

export default WeatherProvider
export {useDateWeather, useSetDateWeather, useLocation, useSetLocation, GeoProvider}