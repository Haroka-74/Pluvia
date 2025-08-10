import Button from './components/Button';
import Search from './components/Search';
import CurrentWeather from './components/CurrentWeather';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { weatherCodes } from './constant';
import NoResult from './components/NoResult';
import Loading from './components/Loading';
import Model from './components/Model';

const App = () => {

    const weatherAPIKey = import.meta.env.VITE_API_KEY;

    const [city, setCity] = useState('');
    const [currentWeather, setCurrentWeather] = useState({});
    const [hourlyForecasts, setHourlyForecasts] = useState([]);
    const [hasNoResult, setHasNoResult] = useState(true);
    const [loading, setLoading] = useState(false);
    const [animKey, setAnimKey] = useState(0);
    const [modelOpen, setModelOpen] = useState(false);

    const fetchData = async (URL, cityName) => {
        try {
            setLoading(true);

            const response = await axios.get(URL);
            if(response.status === 400) throw new Error();

            const temperature = Math.floor(response.data.current.temp_c);
            const description = response.data.current.condition.text;
            const icon = Object.keys(weatherCodes).find(i => weatherCodes[i].includes(response.data.current.condition.code));

            const hourlyData = [ ...response.data.forecast.forecastday[0].hour, ...response.data.forecast.forecastday[1].hour ];
            const currentHour = new Date().setMinutes(0, 0, 0);
            const next24Hours = currentHour + 24 * 60 * 60 * 1000;
            const next24HoursData = hourlyData.filter(({ time }) => {
                const forecastTime = new Date(time).getTime();
                return forecastTime >= currentHour && forecastTime <= next24Hours;
            });

            setCity(cityName || response.data.location.name);
            setCurrentWeather({ temperature, description, icon });
            setHourlyForecasts(next24HoursData);
            setHasNoResult(false);
        } catch {
            setHasNoResult(true);
        } finally {
            setLoading(false);
            setAnimKey(k => k + 1);
        }
    };

    const getCityWeather = async (cityName) => {
        fetchData(`https://api.weatherapi.com/v1/forecast.json?key=${weatherAPIKey}&q=${cityName}&days=2`, cityName);
    };

    const handleLocationClick = () => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                fetchData(`https://api.weatherapi.com/v1/forecast.json?key=${weatherAPIKey}&q=${latitude},${longitude}&days=2`, null);
            },
            () => {
                alert('Location access denied. Please enable permissions to use this feature.');
            }
        );
    };

    useEffect(() => {
        fetchData(`https://api.weatherapi.com/v1/forecast.json?key=${weatherAPIKey}&q=london&days=2`, 'london');
    }, []);

    return (
        <>
            {!loading && !hasNoResult &&
            <Button content = {<span> Outfit Recommendation 💡 </span>} className = 'outfit-btn' onClick = {() => setModelOpen(true)} />}
            {modelOpen && <Model setModelOpen = {setModelOpen} city = {city} temperature = {currentWeather.temperature} /> }
            <div className = 'container'>
                <div className = 'search-section'>
                    <Search getCityWeather = {getCityWeather} city = {city} setCity = {setCity} />
                    <Button
                        content = {<i className = 'fa-solid fa-location-crosshairs' style = {{ fontSize: '1.3rem', transition: '0.2s ease' }}></i>}
                        onClick = {handleLocationClick}
                        style = {{
                            width: 54,
                            height: 54,
                            flexShrink: 0,
                            background: '#352163',
                            border: '1px solid rgba(255, 255, 255, 0.25)',
                            borderRadius: '10px',
                            color: '#FFF',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }} />
                </div>
                <div className = 'fade-in' key = {animKey}>
                    {loading ? (
                        <Loading />
                    ) : hasNoResult ? (
                        <NoResult />
                    ) : (
                        <div className = 'weather-section'>
                            <CurrentWeather currentWeather = {currentWeather} hourlyForecasts = {hourlyForecasts} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default App;