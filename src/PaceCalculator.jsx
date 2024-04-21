// PaceCalculator.js
import React, { useState } from 'react';

const PaceCalculator = () => {
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [result, setResult] = useState('');

  const handleDistanceChange = (event) => {
    setDistance(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const calculatePace = () => {
    // Convert time to seconds
    const timeInSeconds = convertTimeToSeconds(time);

    // Convert distance to meters
    const distanceInMeters = convertDistanceToMeters(distance);

    // Calculate pace in seconds per meter
    const pace = timeInSeconds / distanceInMeters;

    // Convert pace to minutes and seconds per mile
    const pacePerMile = convertSecondsToMinutesAndSeconds(pace * 1609.34);

    // Format pace
    setResult(`${pacePerMile.minutes}:${pacePerMile.seconds} per mile`);
  };

  const convertTimeToSeconds = (time) => {
    const parts = time.split(':');
    if (parts.length === 3) {
      return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
    } else if (parts.length === 2) {
      return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    } else {
      return 0;
    }
  };

  const convertDistanceToMeters = (distance) => {
    switch (distance) {
      case '1k':
        return 1000;
      case '5k':
        return 5000;
      case '10k':
        return 10000;
      case 'half-marathon':
        return 21097.5;
      case 'marathon':
        return 42195;
      default:
        return 0;
    }
  };

  const convertSecondsToMinutesAndSeconds = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return {
      minutes: minutes < 10 ? `0${minutes}` : minutes,
      seconds: remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds,
    };
  };

  return (
    <div>
      <div>
        <label htmlFor="distance">Choose a distance:</label>
        <select id="distance" value={distance} onChange={handleDistanceChange}>
          <option value="">Select...</option>
          <option value="1k">1k</option>
          <option value="5k">5k</option>
          <option value="10k">10k</option>
          <option value="half-marathon">Half Marathon</option>
          <option value="marathon">Marathon</option>
        </select>
      </div>
      <div>
        <label htmlFor="time">Enter your finish time:</label>
        <input type="text" id="time" value={time} onChange={handleTimeChange} placeholder="hh:mm:ss or mm:ss" />
      </div>
      <button onClick={calculatePace}>Calculate Pace</button>
      <div>
        <label htmlFor="result">Average Pace:</label>
        <input type="text" id="result" value={result} readOnly />
      </div>
    </div>
  );
};

export default PaceCalculator;
