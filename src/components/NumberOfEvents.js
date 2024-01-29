import { useState } from 'react';

const NumberOfEvents = ({ setNumberOfEvents }) => {
  const [numEvents, setNumEvents] = useState('32');
  const handleInputChanged = (event) => {
    const value = event.target.value;
    setNumEvents(value);
    setNumberOfEvents(value);
  };

  return (
    <div id="number-of-events">
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
