import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';

export default function SearchBox({ updateInfo }) {
  let [city, setCity] = useState("");
  let [error, setError] = useState("");
  let getweatherinfo = async () => {
    try {
       let response = await fetch(`/weather?city=${encodeURIComponent(city)}`);
      let jsonResponse = await response.json();
      if (!response.ok) {
        throw new Error(jsonResponse.error || "Failed to fetch weather data");
      }
      let result = {
        city: city,
        temp: jsonResponse.main.temp,
        humidity: jsonResponse.main.humidity,
        weather: jsonResponse.weather[0].description,
      }
      console.log(result);
      return result;
    } catch (err) {
      throw err;
    }
  }

  let handleChange = (event) => {
    setCity(event.target.value);
  }

  let handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log(city);
      setCity("");
      setError("");
      let newinfo = await getweatherinfo();
      updateInfo(newinfo);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };
  return (
    <div className='weather'>
      <div className="searchContainer">
        <form className="searchForm" onSubmit={handleSubmit}>
          <TextField
            className="searchInput"
            id="outlined-basic"
            label="Enter City Name"
            variant="outlined"
            required
            value={city}
            onChange={handleChange}
            sx={{
              "& .MuiInputLabel-root": {
                color: "rgba(255, 255, 255, 0.7)", // label color with transparency
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white", // golden color when focused
              },
              "& .MuiInputBase-input": {
                color: "white",           // input text color
              }
            }}
          />
          <Button
            className="searchButton"
            variant="contained"
            type='submit'
          >
            Search
          </Button>
          {error && <p className="errorMessage">{error}</p>}
        </form>
      </div>
    </div>)
}
