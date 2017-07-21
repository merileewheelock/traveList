import React, { Component } from 'react';
import { connect } from 'react-redux';

class WeatherDiv extends Component { 

  render() {

    console.log('///////////')
    console.log('Weather Data')
    console.log(this.props.weatherData)
    console.log('///////////')

    return(
      <div>
        Goodbye, world
      </div>
    )
  }
}

function mapStateToProps({weatherData}) {
  return { weatherData }
}

export default connect(mapStateToProps)(WeatherDiv);