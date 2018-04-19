import React, { Component } from 'react'
import ForecastContainer from './seven_day_forecast/forecastcontainer'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <ForecastContainer />
      </div>
    )
  }
}

export default App
