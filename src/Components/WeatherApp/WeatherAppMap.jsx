import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =  import.meta.env.VITE_MAPBOX_KEY;

const WeatherAppWithMap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [city, setCity] = useState("pune");
  const [weatherData, setWeatherData] = useState(null);


  const fetchWeatherData = async (cityName) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            q: cityName,
            appid: import.meta.env.VITE_API_KEY, 
            units: "metric",
          },
        }
      );
      setWeatherData(response.data);

      const { lon, lat } = response.data.coord;

      // Update Map with New Coordinates
      if (map.current) {
        map.current.flyTo({
          center: [lon, lat],
          zoom: 8,
        });

        // Add Marker
        new mapboxgl.Marker({ color: "red" })
          .setLngLat([lon, lat])
          .setPopup(
            new mapboxgl.Popup().setHTML(`
              <h3>${response.data.name}</h3>
              <p>Temperature: ${response.data.main.temp}°C</p>
              <p>Weather: ${response.data.weather[0].description}</p>
            `)
          )
          .addTo(map.current);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    // Initialize Map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-0.09, 51.505], // Default location: London
      zoom: 5,
    });

    fetchWeatherData(city); // Fetch weather data for default city
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeatherData(city);
  };

  // console.log(weatherData)

  return (
    <div className="max-w-3xl mx-auto" style={{backgroundImage:`url(https://images.pexels.com/photos/2258536/pexels-photo-2258536.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,backgroundRepeat:"no-repeat" ,backgroundSize:"100% 100%", backgroundPosition:"center" ,padding:"120px 60px"}}>
      <h1 className="text-2xl font-bold mb-4 mt-5" style={{float:"right" ,fontSize:"5vw"}}>Weather App 🌤️</h1>

      <form onSubmit={handleSearch} className="flex items-center gap-2 mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="border p-2 w-full rounded-md"
        />
        <button
          type="submit"
          className="bg-blue-500 text-light px-4 py-2 rounded-md bg-info ml-1"
        >
          Search
        </button>
      </form>

      {weatherData && (
        <div className="mb-4 p-4 bg-gray-100 rounded-md shadow-md">
          <h2 className="text-xl font-semibold">{weatherData.name}</h2>
          <p>Temperature: <i className="fa-solid fa-temperature-three-quarters text-warning" style={{fontSize:"20px"}}></i>  {weatherData.main.temp}°C</p>
          <p>Weather: <i className="fa-solid fa-cloud text-warning"></i> {weatherData.weather[0].description}</p>
          <p>Humidity: <i className="ri-water-percent-line text-warning" style={{fontSize:"25px"}}></i> <img src="" alt="" /> {weatherData.main.humidity}%</p>
          <p>Wind Speed: <i className="ri-speed-up-line text-warning"  style={{fontSize:"25px"}}></i> {weatherData.wind.speed} m/s</p>
        </div>
      )}

     
      <div
        ref={mapContainer}
        style={{ width: "50%", height: "400px", borderRadius: "12px",float:"right" }}
      />
       <div>
        <iframe style={{borderRadius:"10px"}} src="https://blog.worldweatheronline.com/" frameborder="0" height="400" width="800"></iframe>
      </div>
    </div>
  );
};

export default WeatherAppWithMap;
