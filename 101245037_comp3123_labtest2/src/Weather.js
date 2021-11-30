import React, {Component} from 'react'
import {Row, Col,Container} from 'react-bootstrap'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Weather extends Component {
    constructor(props) {
        super(props)

        this.state = {
            date: new Date().toLocaleString(),
            weather: [],
            day: []
        }
    }

    componentDidMount() {
        axios.get('https://api.openweathermap.org/data/2.5/onecall?lat=43.65&lon=-79.34&exclude=daily,hourly,minutely,hourly&units=imperial&appid=27869a6370bee36c8341f22d7e18d3f8')
        .then(res => {
            const weather = res.data.current.weather
            const day = res.data;
            this.setState({ day: day, weather: weather})
        })
    }

    render() {
        return(
            <div className="p-5"> 
            {
                this.state.weather.map(w => (
                    <>
                        <div className="borderLocation p-2 m-3 text-light rounded-pill">
                            <h5 className="text-capitalize">{w.description}</h5>
                            <img src={'http://openweathermap.org/img/wn/'+w.icon+'@2x.png'}/>
                            <h1>{this.state.day.timezone}</h1>
                            <h5>{this.state.date}</h5>
                        </div>
                        <div className="border border-dark p-2 mr-3 bg-secondary rounded">
                            <Container className="">
                                <Row className="text-white">
                                    <Col className="p-2">
                                        <p className="bg-dark">Temperature: {Math.round(this.state.day.current.temp - 32.0)}℃</p>
                                        <p className="bg-dark">What it feels like: {Math.round(this.state.day.current.feels_like - 32.0)}℃</p>
                                        <p className="bg-dark">Wind: {this.state.day.current.wind_speed} km/h</p>
                                    </Col>
                                    <Col className="p-2">
                                        <p className="bg-dark">Humidity: {this.state.day.current.humidity}%</p>
                                        <p className="bg-dark">Pressure: {this.state.day.current.pressure}kPa</p>
                                        <p className="bg-dark">Longitude: {this.state.day.lon}° W Latitude: {this.state.day.lat}° N</p>
                                    </Col>
                                </Row>
                            </Container>
                            <div className="text-white bg-dark rounded">
                                <p>Gabriel Silva</p>
                                <p>101245037</p>
                            </div>
                        </div>
                    </> 
                ))
            }       
            </div>
        )
    }
}
