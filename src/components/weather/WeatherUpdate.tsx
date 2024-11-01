import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Loader } from 'lucide-react';

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
}

export function WeatherUpdate() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async (latitude: number, longitude: number) => {
      try {
        const API_KEY = 'bd5e378503939ddaee76f12ad7a97608'; // Free API key
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
        );
        
        if (!response.ok) throw new Error('Weather data not available');
        
        const data = await response.json();
        setWeather({
          temperature: Math.round(data.main.temp),
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          description: data.weather[0].main,
          icon: data.weather[0].icon,
        });
      } catch (err) {
        setError('Unable to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    const getLocation = () => {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser');
        setLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        () => {
          setError('Unable to retrieve your location');
          setLoading(false);
        }
      );
    };

    getLocation();

    // Refresh weather data every 5 minutes
    const interval = setInterval(getLocation, 300000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = () => {
    if (!weather) return <Cloud className="w-8 h-8 text-gray-500" />;
    
    switch (weather.description.toLowerCase()) {
      case 'clear':
        return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'rain':
      case 'drizzle':
        return <CloudRain className="w-8 h-8 text-blue-500" />;
      default:
        return <Cloud className="w-8 h-8 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-center h-[200px]">
        <Loader className="w-8 h-8 text-green-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="text-red-500 text-center">
          <p>{error}</p>
          <p className="text-sm mt-2">Please check your location settings and try again.</p>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Live Weather</h3>
        {getWeatherIcon()}
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Temperature</span>
          <span className="font-medium">{weather.temperature}°C</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Humidity</span>
          <span className="font-medium">{weather.humidity}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Wind Speed</span>
          <div className="flex items-center gap-1">
            <Wind className="w-4 h-4 text-gray-400" />
            <span className="font-medium">{weather.windSpeed} m/s</span>
          </div>
        </div>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-500 capitalize">{weather.description}</span>
        </div>
      </div>
    </div>
  );
}