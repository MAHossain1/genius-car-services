import React, { useEffect, useState } from "react";
import Service from "../Service/Service";
import "./Services.css";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("https://salty-inlet-69644.herokuapp.com/service")
      .then(res => res.json())
      .then(data => setServices(data));
  }, []);
  return (
    <div id="services" className="container">
      <h1 className="text-primary text-center mt-5">Our Services</h1>
      <div className="services-container mt-5">
        {services.map(service => (
          <Service key={service._id} service={service}></Service>
        ))}
      </div>
    </div>
  );
};

export default Services;
