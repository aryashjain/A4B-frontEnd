// App.js

import React, { useState } from 'react';
import axios from 'axios';



const App = () => {
  const URL = process.env.REACT_APP_BASE_URL ||'abs';
  console.log(URL)
  console.log(process.env.URL)
  const [formData, setFormData] = useState({
    name: '',
    district: '',
    pincode: '',
    locality: '',
    state: ''
  });
  const [cities, setCities] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
    
      const response = await axios.get(`${URL}/api/v1/search/city?name=${formData.name}&district=${formData.district}&state=${formData.state}&pincode=${formData.pincode}&locality=${formData.locality}`);
       console.log(response.data.cities)
      setCities(response.data.cities);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  return (
    <div>
      <h1>Search Your Cities</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
        <input type="text" name="district" value={formData.district} onChange={handleChange} placeholder="District" />
        <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" />
        <input type="text" name="locality" value={formData.locality} onChange={handleChange} placeholder="Locality" />
        <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" />
        <button type="submit">Submit</button>
      </form>
      <ul>
  
        <h3>name ,state, pincode, district, locality </h3>
        {cities.map((city, index) => (
          <li key={index}>{city.name}, {city.state}, {city.pincode},{city.district}, {city.locality} </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
