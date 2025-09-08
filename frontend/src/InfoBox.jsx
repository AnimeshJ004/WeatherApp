import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import SunnyIcon from '@mui/icons-material/Sunny';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import "./InfoBox.css"
export default function InfoBox({info}){
  const INIT_URL=
  "https://images.unsplash.com/photo-1579003593419-98f949b9398f?q=80&w=873&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  
  const HOT_URL =
   "https://images.unsplash.com/photo-1504370805625-d32c54b16100?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const COLD_URL = 
  "https://plus.unsplash.com/premium_photo-1670347627514-07a3d37e0670?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; 
  const RAIN_URL = 
  "https://images.unsplash.com/photo-1627891858448-0b99239685fa?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    return(
        <div className="InfoBox">
        <div className='cardContainer'>
        <Card  sx={{
        width: 250,
        borderRadius: "16px",
        background: "rgba(0,0,0,0.7)", // dark glass effect
        color: "white",
        overflow: "hidden", // keeps image + text inside
        boxShadow: "4px 4px 20px rgba(0,0,0,0.5)",
        objectFit:"cover",
      }}>
      <CardMedia
        sx={{ height: 90 , width: 250}}
        image={
          info.humidity>80
          ? RAIN_URL
          :info.temp>15
          ? HOT_URL:
          COLD_URL
        }
        title="green iguana"
      />
      <CardContent>
        <div>
        <Typography gutterBottom variant="h5" component="div" color='blue' >
          {info.city}&nbsp;
          {
          info.humidity>80
          ? <ThunderstormIcon/>
          :info.temp>15
          ? <SunnyIcon/>:
          <AcUnitIcon/>
        }
        </Typography>
        </div>
        <Typography variant="body2" sx={{ color: 'white' }} component={"span"} style={{fontSize:"17px"}}>
           Temprature: {info.temp}&deg;C
           <br/><br/>
           Humidity: {info.humidity}
           <br/><br/>
           Weather: {info.weather}
           <br/><br/>
        </Typography>
      </CardContent>
     </Card>
    </div>
        </div>
    )
  }