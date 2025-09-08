import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css"
import { useState } from 'react';
export default function SearchBox({updateInfo}){
  let [city , setCity] = useState("");
  let [error , setError] = useState(false);

const API_URL = "https://api.openweathermap.org/data/2.5/weather"
const API_KEY = "4786c83591ea8be733db14d42cb1799e";

let getweatherinfo = async ()=>{
  try{
     let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
         let jsonResponse  = await response.json();
          let result = {
            city:city,
            temp:jsonResponse.main.temp,
            humidity: jsonResponse.main.humidity,
            weather: jsonResponse.weather[0].description,
          }
          console.log(result);
          return result;
        }catch(err){
          throw err;
        }
    }

  let handleChange=(event)=>{
    setCity(event.target.value);
    // setLimit(event.target.value);
  }

  let handleSubmit = async (event) =>{
   try{ event.preventDefault();
    console.log(city);
    setCity("");
    setError("");
    // setLimit(5);
    let newinfo =await getweatherinfo();
    updateInfo(newinfo);
   }catch(err){
    setError(true);
   }
  };
  return(
  <div className='weather'>
    <form onSubmit={handleSubmit}>
          <TextField id="outlined-basic"
                     label="Enter City Name" 
                     variant="outlined" 
                     required
                     value={city}
                     onChange={handleChange}
                    sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",   // default border
                    },
                    "&:hover fieldset": {
                      borderColor: "blue",    // hover border
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "skyblue", // focus border
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",           // label color
                  },
                  "& .MuiInputBase-input": {
                    color: "white",           // input text color
                  }}
                }
         />
 <br/><br/>
     <Button variant="contained" type='submit'
      sx={{
          backgroundColor: "Black",
          boxShadow: "2px 2px 5px white",
          "&:hover": { transform: "translateY(-2px)",
            boxShadow: "2px 2px 5px blue",
           },
        }}> Search </Button>
     {error && <p>No Such Place exists!</p>}
    </form>
  </div>)
}
