import { useState } from 'react';

// /api/weather is handled by:
//   • Vercel production: api/weather.js serverless function
//   • Local dev:         Vite proxy → http://localhost:5000/api/weather

export default function SearchBox({ updateInfo }) {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getWeatherInfo = async () => {
    const url = `/api/weather?city=${encodeURIComponent(city)}`;
    const response = await fetch(url);

    // Guard: if the response is not JSON (e.g. an HTML 404 page), throw early
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      throw new Error(
        `Server error (${response.status}). Make sure API_KEY is set in Vercel Environment Variables.`
      );
    }

    const jsonResponse = await response.json();
    if (!response.ok) {
      throw new Error(jsonResponse.error || 'City not found');
    }
    return {
      city: jsonResponse.name,
      country: jsonResponse.sys?.country || '',
      temp: Math.round(jsonResponse.main.temp),
      feelsLike: Math.round(jsonResponse.main.feels_like),
      humidity: jsonResponse.main.humidity,
      pressure: jsonResponse.main.pressure,
      windSpeed: jsonResponse.wind?.speed || 0,
      visibility: jsonResponse.visibility ? Math.round(jsonResponse.visibility / 1000) : 'N/A',
      weather: jsonResponse.weather[0].description,
      condition: jsonResponse.weather[0].main,
      icon: jsonResponse.weather[0].icon,
      tempMin: Math.round(jsonResponse.main.temp_min),
      tempMax: Math.round(jsonResponse.main.temp_max),
    };
  };

  const handleChange = (e) => setCity(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const newInfo = await getWeatherInfo();
      updateInfo(newInfo);
      setCity('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-wrapper">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-input-group">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            id="city-input"
            className="search-input"
            type="text"
            placeholder="Search city..."
            value={city}
            onChange={handleChange}
            required
          />
        </div>
        <button className={`search-btn ${loading ? 'loading' : ''}`} type="submit" disabled={loading}>
          {loading ? <span className="spinner" /> : 'Search'}
        </button>
      </form>
      {error && (
        <div className="error-toast">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </div>
      )}
    </div>
  );
}
