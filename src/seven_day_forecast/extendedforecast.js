import React from 'react'
import PropTypes from 'prop-types'

const ExtendedForecast = ( {day, handleClick} ) => {
  if (!day) return null

  return <div className="extended" onClick={() => handleClick(day)}>
    <ul>
      <li><h4>{day.date.weekday} {day.date.monthname} {day.date.day} </h4></li>
      <li>{day.conditions}</li>
      <li>High: {day.high.fahrenheit}, Low: {day.low.fahrenheit}</li>
      <li>Chance of Precipitation: {day.pop}%</li>
      <li>Rain: {day.qpf_allday.in}&quot;</li>
      <li>Snow: {day.snow_allday.in}&quot;</li>
      <li>Avg Wind: {day.avewind.mph} {day.avewind.dir}</li>
      <li>Max Wind: {day.maxwind.mph} {day.maxwind.dir}</li>
      <li>Avg Humidity: {day.avehumidity}%</li>
    </ul>
  </div>
}

ExtendedForecast.propTypes = {
  day: PropTypes.object,
  handleClick: PropTypes.func,
}

export default ExtendedForecast
