import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/common/header/Header';
import Home from './components/pages/home';
import WeatherApp from './components/pages/weatherapp';
import WeatherAppNew from './components/pages/weatherNew';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header />
    {/* <WeatherAppNew /> */}
    {/* <WeatherApp /> */}
    <Home />
    </>
  )
}

export default App
