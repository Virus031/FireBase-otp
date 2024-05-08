import React, { useState, useEffect } from 'react';

function WeatherAppNew() {

  const [ipAddress,setIpAddress] = useState('');
  const [geoInfo,setGeoInfo] = useState({});



  useEffect(()=>{
    getVisionIP();

  },[]);

  const getVisionIP = async () =>{
    try {
      const response = await fetch('https://api.ipify.org');
      const result = await response.text();
      setIpAddress(result);
    } catch (error) {
     console.error('fetch ip address error',error); 
    }
  }

   
  const handleInputChange = () => {
    setIpAddress(e.target.value);
  }


  const GetIPINFO = async () => {
    try {
      const response = await fetch(`https://api.ipfind.com/?ip=${ipAddress}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }
      const result = await response.json();
      console.log(result);
      setGeoInfo(result);
    } catch (error) {
      console.error('Fetch IP address error:', error); 
    }
  }
  


  return (
    <>
    <h3>IP location</h3>
    <div className="form-area">
      <input type="text" value={ipAddress} onChange={handleInputChange}/>
      <button onClick={GetIPINFO}>Get IP</button>
    </div>

    </>
  );
}

export default WeatherAppNew;