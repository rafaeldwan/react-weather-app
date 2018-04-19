import React from 'react'
import PropTypes from 'prop-types'

const SingleDayForecast = ( {day, handleClick, showExtended, extended} ) => {
  let img = require(`../images/${day.icon}.gif`)
  let selected = (showExtended && day.date.epoch === extended.date.epoch)
  return <div
    className={selected ? 'forecast-day selected' : 'forecast-day'} onClick={() => handleClick(day)}>
    <div className="day-name">{day.date.weekday_short} </div>
    <img src={img} alt={day.conditions}/><br />
    <span className="high-temp">{day.high.fahrenheit} </span>
    <span className="low-temp" >{day.low.fahrenheit}</span><br />
  </div>
}

SingleDayForecast.propTypes = {
  day: PropTypes.object,
  handleClick: PropTypes.func,
  showExtended: PropTypes.bool,
  extended: PropTypes.object,
}

export default SingleDayForecast
