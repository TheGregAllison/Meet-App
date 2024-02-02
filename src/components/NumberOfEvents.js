import { useState } from 'react';

const NumberOfEvents = ({ setNumberOfEvents, setErrorAlert }) => {
  const [numEvents, setNumEvents] = useState('32');

  console.log(typeof setErrorAlert);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setNumEvents(value);

    let errorText;
    if (isNaN(value) || value <= 0) {
      errorText = 'Please enter a positive number.';
    } else {
      errorText = '';
      setNumberOfEvents(value);
    }
    setErrorAlert(errorText);
  };

  console.log(typeof setErrorAlert);
  console.log(setErrorAlert);


  return (
    <div id="number-of-events">
      <label htmlFor="number-of-events-input">Number of Events: </label>
      <input
        type="text"
        placeholder="Enter a number"
        value={numEvents}
        onChange={handleInputChanged}
      />
    </div>
  );
};

export default NumberOfEvents;
