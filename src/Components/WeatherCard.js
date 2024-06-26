import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import SearchIcon from '@mui/icons-material/Search';
import PlaceIcon from '@mui/icons-material/Place';


export default function WeatherCard() {
  const [data, setdata] = useState('')
  const [city, setCity] = useState('Ahmedabad')

  useEffect(() => {
    fetchData(city)
  }, [])


  const appid = "cfe3d903b90833b73a6bac2a4280a80c";

  async function fetchData(city) {
    console.log("heyyaa");
    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}&units=metric`, {
      method: 'GET',
    })
    res = await res.json()
    console.log("message", res);

    if (res) {
      setdata(res)
    }

    if (res.cod === "404") {
      alert('City Not Found')
      setdata(null)
      setCity("")
    }

  }
  return (

    <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
      <Card className='p-5' style={{ width: "33rem",boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",border:"none"}}>
        <h2 className='text-center mb-5 fw-bold' style={{ color: "#6AA39D" }}>Weather App</h2>

        <InputGroup className="mb-4">
          <Form.Control
            placeholder="Enter City Name"
            value={city}
            onChange={(e) => { setCity(e.target.value) }}
          />
          <Button style={{ backgroundColor: "#6AA39D" }} id="button-addon2" onClick={() => fetchData(city)}>
            <SearchIcon />
          </Button>
        </InputGroup>
        {data &&
          <Card className='pt-4' style={{ backgroundColor: "#6AA39D", color: "white" }}>
            <div className='d-flex justify-content-center'>
              <PlaceIcon className='mt-2' />
              <h2 className='ms-2'>{data.name}</h2>
            </div>
            <p className='text-center'><span>{new Date().toLocaleDateString('en-US', { weekday: 'long' })}</span> <span>{new Date().toLocaleDateString()}</span>   <span>{new Date().toLocaleTimeString(('en-US'))}</span> </p>


            <div className='text-center my-2'>
              <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt='icon' style={{ width: "80px", height: "80px" }} />
              <p>{data.weather[0].description}</p>
            </div>


            <div className='text-center mb-3'>
              <h1>{data.main.temp}&deg;C</h1>
              <p>Feels like {data.main.feels_like}&deg;C</p>
            </div>

            <div className='d-flex justify-content-center'>
              <Card className='mb-3 pt-3 text-center' style={{ width: "21rem" }}>
                <p>Wind is {data.wind.speed} knots in {data.wind.deg}&deg;</p>
              </Card>
            </div>

          </Card>
        }
      </Card>
    </div>

  )
}
