import { createContext, useContext, useState } from 'react'

const WeatherDateContext = createContext([]);
const WeatherDateSetContext = createContext(()=>{});
const GeoContext = createContext([]);
const GeoSetContext = createContext(()=>{});

const WeatherProvider = ({children}) => {
  const [dateWether, setDateWether] = useState([]);
  return (
    <WeatherDateContext.Provider value={dateWether}>
    <WeatherDateSetContext.Provider value={setDateWether}>
      {children}   
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
const useLocation=()=> useContext(GeoContext);
const useSetLocation=()=> useContext(GeoSetContext);

export default WeatherProvider
export {useDateWeather, useSetDateWeather, useLocation, useSetLocation, GeoProvider}