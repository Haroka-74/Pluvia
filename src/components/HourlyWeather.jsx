import { weatherCodes } from '../constant';

const HourlyWeather = ({ hourlyForecast }) => {

    const temperature = Math.floor(hourlyForecast.temp_c);
    const time = hourlyForecast.time.split(' ')[1].substring(0, 5);
    const icon = Object.keys(weatherCodes).find(i => weatherCodes[i].includes(hourlyForecast.condition.code));

    return (
        <li className = 'weather-item'>
            <p className = 'time'> {time} </p>
            <img src = {`/assets/${icon}.svg`} className = 'weather-icon' />
            <p className = 'temperature'> {temperature}° </p>
        </li>
    );
};

export default HourlyWeather;