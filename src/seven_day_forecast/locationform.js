import React from 'react'
import PropTypes from 'prop-types'

const LocationForm = (props) => {
  return <div className="location-form well">
    <form onSubmit={props.handleSubmit}>
      <input name="postal" type="text" value={props.postalVal} onChange={props.handleChange} placeholder={'City, ST or Postal Code'}/>
    </form> {'or '}
    <button onClick={props.forecastFromLocation}>Use Your Location</button>
  </div>
}

LocationForm.propTypes = {
  handleSubmit: PropTypes.func,
  postalVal: PropTypes.string,
  handleChange: PropTypes.func,
  forecastFromLocation: PropTypes.func
}

export default LocationForm
