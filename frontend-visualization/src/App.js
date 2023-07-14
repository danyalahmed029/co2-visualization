import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';

const CO2Visualization = () => {
  const co2Value = useSelector((state) => state.co2Value);
  const airQuality = useSelector((state) => state.airQuality);

  const getAirQualityClass = () => {
    if (airQuality === 'Good') {
      return 'good-quality';
    } else if (airQuality === 'Average') {
      return 'average-quality';
    } else {
      return 'bad-quality';
    }
  };

  return (
    <div className="co2-visualization">
      <h1 className="co2-visualization-header">CO2 Visualization</h1>
      <p className="co2-value">CO2 Value: {co2Value ? `${co2Value} ppm` : '-'}</p>
      <p >Air Quality: <span className={`air-quality ${getAirQualityClass()}`}>{airQuality || '-'}</span></p>
    </div>
  );
};

export default CO2Visualization;
