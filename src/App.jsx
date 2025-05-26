import WeatherProvider, { GeoProvider } from './Context/Provider';
import Meteo from './API/Meteo';
import List from './Components/List';
import './App.css'
import GeoForm from './Components/GeoForm';

function App() {

  return (
    <>
      <h1>Vite + React</h1>
      <WeatherProvider>
      <GeoProvider>
        <Meteo />
        <GeoForm />
      </GeoProvider>
        <List />
      </WeatherProvider>
    </>
  )
}

export default App
