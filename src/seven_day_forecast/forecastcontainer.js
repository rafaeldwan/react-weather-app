import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group'
import LocationForm from './locationform'
import CityAndState from './cityandstate'
import SevenDayForecast from './sevendayforecast'
import ExtendedForecast from './extendedforecast'
import Error from './error'
import '../css/sevenday.css'
import '../css/bootstrap.css'

export default class ForecastContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      simpleForecast: [],
      extended: null,
      showExtended: false,
      city: '',
      state: '',
      postalInput: '',
      error: null,
    }

    this.BASE_API_CALL = 'https://api.wunderground.com/api/29e8a4acfdfee465/geolookup/forecast10day/q/'
    this.wunderLogo = require('../images/wundergroundLogo_4c_horz.jpg')
  }

  componentDidMount() {
    this.updateForecast(`${this.BASE_API_CALL}autoip.json`)
  }

  updateForecast(apiCall) {
    fetch(apiCall)
      .then(response => response.json())
      .then(response => {
        let simpleForecast = response.forecast.simpleforecast.forecastday.slice(0,7)
        this.setState( {
          simpleForecast,
          city: response.location.city,
          state: response.location.state,
          error: null,
        } )
        if (this.state.showExtended) this.updateExtended()
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(`Fetch operation error: ${error.message}`)
        this.setState({error: 'Sorry, don\'t recognize that location. Please try again.'})
      })
  }

  updateExtended = () => {
    /* Since different timezones may have different days of the week in their forecast
    (before midnight one location, after midnight another), makes sure the currently
    extended day exists in the new forecast data, updates if so, hides otherwise */
    let dayOfMonth = this.state.extended.date.day
    let newData = this.state.simpleForecast.find(day => day.date.day === dayOfMonth)
    newData ? this.setState({extended: newData}) : this.setState({showExtended : false})
  }

  foreCastFromCityState(e) {
    let [city, state] = e.target.postal.value.split(/\s?,/)
    let call = `${this.BASE_API_CALL}${state}/${city}.json`
    this.updateForecast(call)
  }

  forecastFromPostal = (e) => {
    let call = `${this.BASE_API_CALL}${e.target.postal.value}.json`
    this.updateForecast(call)
  }

  forecastFromLocation = () => {
    const geoOptions = {
      maximumAge: 5 * 60 * 1000,
      timeout: 10 * 1000,
    }

    let geoSuccess = (position) => {
      let [lat, long] = [position.coords.latitude, position.coords.longitude]
      this.updateForecast(`${this.BASE_API_CALL}${lat},${long}.json`)
    }
    // eslint-disable-next-line no-console
    let geoError = (error) => console.error('Location Error occurred. Error code: ' + error.code)
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions)
  }

  toggleExtended = (day) => {
    let isCurrentlyShown = this.state.extended
      && this.state.showExtended
      && this.state.extended.date.epoch === day.date.epoch
    if (isCurrentlyShown)
      this.setState({showExtended: false})
    else if (this.state.showExtended) {
      this.setState({showExtended: false})
      setTimeout(() => this.setState({showExtended: true, extended: day}), 350)
    } else
      this.setState({showExtended: true, extended: day})
  }

  showError = () => {
    let error = this.state.error
    if (error)
      return <Error error={error}/>
  }

  handleClick = (day) => {
    this.toggleExtended(day)
  }

  handleChange = (e) => {
    this.setState({postalInput: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const cityStateEx = /.*\s?, [A-Z][A-Z]/
    cityStateEx.test() ? this.forecastFromCityState(e) : this.forecastFromPostal(e)
  }

  render() {
    return (
      <div className="forecast">

        {this.showError()}
        <figure>
          <figcaption>Data thanks to</figcaption>
          <img src={this.wunderLogo} alt="Weather Underground"/>
        </figure>
        <LocationForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          postalVal={this.state.postalInput}
          forecastFromLocation={this.forecastFromLocation}
        />
        <CityAndState city={this.state.city} state={this.state.state}/>
        <SevenDayForecast
          forecast={this.state.simpleForecast}
          showExtended={this.state.showExtended}
          extended={this.state.extended}
          handleClick={this.handleClick}
        />
        <CSSTransition
          in={this.state.showExtended}
          timeout={100}
          classNames="extended"
          unmountOnExit>
          <ExtendedForecast day={this.state.extended} handleClick={this.handleClick}/>
        </CSSTransition>
      </div>
    )}
}

