import React from 'react'
import PropTypes from 'prop-types'
import SingleDayForecast from './singledayforecast'

const SevenDayForecast = ({ forecast, showExtended, extended, handleClick }) => {
  return <div className="container">
    {forecast.map(function(day) {
      let key = day.date.epoch
      return <SingleDayForecast
        key={key}
        day={day}
        showExtended={showExtended}
        extended={extended}
        handleClick={handleClick}
      />
    })}
  </div>
}

SevenDayForecast.propTypes = {
  forecast: PropTypes.array,
  day: PropTypes.object,
  handleClick: PropTypes.func,
  showExtended: PropTypes.bool,
  extended: PropTypes.object,
}

export default SevenDayForecast
