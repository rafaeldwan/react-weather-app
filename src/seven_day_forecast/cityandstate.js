import React from 'react'
import PropTypes from 'prop-types'

const CityAndState = ({ city, state }) => {
  return <h3>{city}, {state}</h3>
}

CityAndState.propTypes = {
  city: PropTypes.string,
  state: PropTypes.string,
}

export default CityAndState
