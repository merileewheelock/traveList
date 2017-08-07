import React, { Component } from 'react';
import { connect } from 'react-redux';

class WeatherDiv extends Component { 

	render() {

        var weatherDiv = [];
		if (this.props.weatherData[0] != undefined){
			// console.log('///////////')
			// console.log('Weather Data')
			// console.log(this.props.weatherData)
			// console.log('///////////')
            weatherDiv.push(
                <div className="weather-forecast text-center col-md-offset-4 col-md-4 col-sm-offset-3 col-sm-6 col-xs-offset-1 col-xs-10" key="1">
                    <div className="">
                        <div className="weather-header">
                            <h1>{this.props.weatherData[0].city.name}</h1>
                            <h4>3-day forecast</h4>
                        </div>
                        <table className="table table-condensed">
                            <thead>
                                <tr>
                                    <th className="text-center">Date</th>
                                    <th className="text-center">{this.props.weatherData[0].list[4].dt_txt.slice(0, -9)}</th>
                                    <th className="text-center">{this.props.weatherData[0].list[12].dt_txt.slice(0, -9)}</th>
                                    <th className="text-center">{this.props.weatherData[0].list[20].dt_txt.slice(0, -9)}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th className="text-center">Temperature</th>
                                    <td>{this.props.weatherData[0].list[4].main.temp}&deg;F</td>
                                    <td>{this.props.weatherData[0].list[12].main.temp}&deg;F</td>
                                    <td>{this.props.weatherData[0].list[20].main.temp}&deg;F</td>
                                </tr>
                                <tr>
                                    <th className="text-center">Description</th>
                                    <td>{this.props.weatherData[0].list[4].weather[0].description} </td>
                                    <td>{this.props.weatherData[0].list[12].weather[0].description}</td>
                                    <td>{this.props.weatherData[0].list[20].weather[0].description}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }

		return(
			<div className="text-center">
				{weatherDiv}
			</div>
		)
	}
}

function mapStateToProps({weatherData}) {
	return { weatherData: weatherData }
}

export default connect(mapStateToProps)(WeatherDiv);