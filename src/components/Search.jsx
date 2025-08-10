const Search = ({ getCityWeather, city, setCity }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        getCityWeather(city);
    };

    return (
        <form action = '#' className = 'search-form' onSubmit = {handleSubmit}>
            <i className = 'fa-solid fa-magnifying-glass'></i>
            <input
                type = 'search'
                placeholder = 'Enter a city name'
                className = 'search-input'
                value = {city}
                onChange = {(e) => setCity(e.target.value)}
                required />
        </form>
    );
};

export default Search;