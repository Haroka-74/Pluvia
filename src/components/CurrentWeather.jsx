import HourlyWeather from './HourlyWeather';

const CurrentWeather = ({ currentWeather, hourlyForecasts }) => {
    return (
        <>
            <div className = 'current-weather'>
                <img src = {`/assets/${currentWeather.icon}.svg`} className = 'weather-icon' />
                <h2 className = 'temperature'> {currentWeather.temperature} <span> °C </span> </h2>
                <p className = 'description'> {currentWeather.description} </p>
            </div>
            <div className = 'hourly-forecast'>
                <ul className = 'weather-list'>
                    {hourlyForecasts.map(hw => (
                        <HourlyWeather key = {hw.time_epoch} hourlyForecast = {hw} />
                    ))}
                </ul>
            </div>
        </>
    );
};

export default CurrentWeather;