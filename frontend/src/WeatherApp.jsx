import SearchBox from './SearchBox';
import InfoBox from './InfoBox';
import { useState } from 'react';

export default function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
    setHasSearched(true);
  };

  return (
    <div className="weather-app">
      {/* Header */}
      <header className="app-header">
        <div className="app-logo">
          <span className="logo-icon">⛅</span>
          <span className="logo-text">Skyvault</span>
        </div>
        <p className="app-tagline">Real-time weather at your fingertips</p>
      </header>

      {/* Search */}
      <SearchBox updateInfo={updateInfo} />

      {/* Weather Result */}
      {hasSearched && weatherInfo ? (
        <div className="result-wrapper">
          <InfoBox info={weatherInfo} />
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-globe">🌍</div>
          <p>Search for any city to see the weather</p>
        </div>
      )}
    </div>
  );
}