export default function InfoBox({ info }) {
  // Map OpenWeatherMap condition to config
  const CONDITION_CONFIG = {
    Clear: {
      label: 'Clear Sky',
      gradient: 'linear-gradient(135deg, #f7971e 0%, #ffd200 50%, #ff6b35 100%)',
      bgClass: 'bg-clear',
      image: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&auto=format&fit=crop&q=80',
      emoji: '☀️',
      textColor: '#fff7e0',
    },
    Clouds: {
      label: 'Cloudy',
      gradient: 'linear-gradient(135deg, #757f9a 0%, #d7dde8 100%)',
      bgClass: 'bg-clouds',
      image: 'https://images.unsplash.com/photo-1534088568-28d4adee59e3?w=800&auto=format&fit=crop&q=80',
      emoji: '☁️',
      textColor: '#f0f4ff',
    },
    Rain: {
      label: 'Rainy',
      gradient: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
      bgClass: 'bg-rain',
      image: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=800&auto=format&fit=crop&q=80',
      emoji: '🌧️',
      textColor: '#d0eeff',
    },
    Drizzle: {
      label: 'Drizzle',
      gradient: 'linear-gradient(135deg, #4b79a1 0%, #283e51 100%)',
      bgClass: 'bg-drizzle',
      image: 'https://images.unsplash.com/photo-1556485689-33e55ab56127?w=800&auto=format&fit=crop&q=80',
      emoji: '🌦️',
      textColor: '#d6eeff',
    },
    Thunderstorm: {
      label: 'Thunderstorm',
      gradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      bgClass: 'bg-thunder',
      image: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=800&auto=format&fit=crop&q=80',
      emoji: '⛈️',
      textColor: '#e8d5ff',
    },
    Snow: {
      label: 'Snowy',
      gradient: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
      bgClass: 'bg-snow',
      image: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=800&auto=format&fit=crop&q=80',
      emoji: '❄️',
      textColor: '#1a3a6b',
    },
    Mist: {
      label: 'Misty',
      gradient: 'linear-gradient(135deg, #b8c6db 0%, #f5f7fa 100%)',
      bgClass: 'bg-mist',
      image: 'https://images.unsplash.com/photo-1504198266287-1659872e6590?w=800&auto=format&fit=crop&q=80',
      emoji: '🌫️',
      textColor: '#2d3a4a',
    },
    Haze: {
      label: 'Hazy',
      gradient: 'linear-gradient(135deg, #c9d6df 0%, #52697a 100%)',
      bgClass: 'bg-haze',
      image: 'https://images.unsplash.com/photo-1504198266287-1659872e6590?w=800&auto=format&fit=crop&q=80',
      emoji: '🌫️',
      textColor: '#f0f4ff',
    },
    Fog: {
      label: 'Foggy',
      gradient: 'linear-gradient(135deg, #b8c6db 0%, #f5f7fa 100%)',
      bgClass: 'bg-fog',
      image: 'https://images.unsplash.com/photo-1487621167305-5d248087c724?w=800&auto=format&fit=crop&q=80',
      emoji: '🌫️',
      textColor: '#2d3a4a',
    },
    Dust: {
      label: 'Dusty',
      gradient: 'linear-gradient(135deg, #d4a054 0%, #8b6914 100%)',
      bgClass: 'bg-dust',
      image: 'https://images.unsplash.com/photo-1553697388-94e804e2f0f6?w=800&auto=format&fit=crop&q=80',
      emoji: '🏜️',
      textColor: '#fff0d0',
    },
  };

  const config = CONDITION_CONFIG[info.condition] || {
    label: info.condition || 'Weather',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    image: 'https://images.unsplash.com/photo-1579003593419-98f949b9398f?w=800&auto=format&fit=crop&q=80',
    emoji: '🌤️',
    textColor: '#ffffff',
  };

  const stats = [
    { icon: '💧', label: 'Humidity', value: `${info.humidity}%` },
    { icon: '🌡️', label: 'Feels Like', value: `${info.feelsLike ?? '--'}°C` },
    { icon: '💨', label: 'Wind', value: `${info.windSpeed ?? '--'} m/s` },
    { icon: '🔵', label: 'Pressure', value: `${info.pressure ?? '--'} hPa` },
    { icon: '👁️', label: 'Visibility', value: info.visibility !== undefined ? `${info.visibility} km` : '--' },
    { icon: '🌡️', label: 'Min / Max', value: `${info.tempMin ?? '--'}° / ${info.tempMax ?? '--'}°` },
  ];

  return (
    <div className="info-card" style={{ '--card-gradient': config.gradient, '--card-text': config.textColor }}>
      {/* Hero Image */}
      <div className="card-hero">
        <img
          className="card-hero-img"
          src={config.image}
          alt={config.label}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div className="card-hero-overlay" style={{ background: config.gradient.replace('linear-gradient', 'linear-gradient').replace('100%)', '60%)') }} />

        {/* Main temp & city */}
        <div className="card-hero-content">
          <div className="weather-emoji">{config.emoji}</div>
          <div className="temp-display">{info.temp}°</div>
          <div className="city-name">
            {info.city}
            {info.country && <span className="country-badge">{info.country}</span>}
          </div>
          <div className="condition-label">{info.weather}</div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div className="stat-item" key={i}>
            <span className="stat-icon">{stat.icon}</span>
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}