import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import SunnyIcon from '@mui/icons-material/Sunny';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
export default function InfoBox({info}){
  const INIT_URL=
  "https://images.unsplash.com/photo-1579003593419-98f949b9398f?q=80&w=873&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  
  const HOT_URL =
   "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=873";
  const COLD_URL = 
  "https://plus.unsplash.com/premium_photo-1670598342794-249547599860?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870"; 
  const RAIN_URL = 
  "https://images.unsplash.com/photo-1462040700793-fcd2dbc0edf0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870";
    return(
        <div className="InfoBox">
        <div className='cardContainer'>
        <Card className="infoBoxCard" sx={{
        width: 250,
        borderRadius: "20px",
        color: "white",
        overflow: "hidden",
      }}>
      <CardMedia
        className="infoBoxMedia"
        sx={{ height: 90 , width: 250}}
        image={
          info.humidity>80
          ? RAIN_URL
          :info.temp>15
          ? HOT_URL:
          COLD_URL
        }
        title="Weather Image"
      />
      <CardContent className="infoBoxContent">
        <div>
        <Typography gutterBottom variant="h5" component="div" className="infoBoxTitle" sx={{ color: '#FFD700' }}>
          {info.city}&nbsp;
          <span className="weatherIcon">
          {
          info.humidity>80
          ? <ThunderstormIcon/>
          :info.temp>15
          ? <SunnyIcon/>:
          <AcUnitIcon/>
        }
          </span>
        </Typography>
        </div>
        <Typography variant="body2" sx={{ color: 'white' }} component={"span"}>
           Temperature: {info.temp}&deg;C
           <br/>
           Humidity: {info.humidity}%
           <br/>
           Weather: {info.weather}
        </Typography>
      </CardContent>
     </Card>
    </div>
        </div>
    )
  }