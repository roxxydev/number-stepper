import Axios from 'axios';
import { useState, useEffect } from 'react';

const baseUrl = 'http://localhost:3000/api'

function NumberStepper() {

  const [number, setNumber] = useState();

  useEffect(() => {
    callApiFetchNumber()
  });

  const fetchCurrentNumberValue = async () => {

    const url = `${baseUrl}/number`;
    const response = await Axios.get(url);

    const data = response.data;
    const numberValue = data.value;

    return numberValue;
  };

  const stepNumberValue = async (action) => {

    const url = `${baseUrl}/number/step`;
    const response = await Axios.post(url, {}, {
      headers: { 'Content-Type': 'application/json' },
      params: { action }
    });

    const data = response.data;
    const numberValue = data.value;

    return numberValue;
  };

  const callApiFetchNumber = async ()=> {
    setNumber(await fetchCurrentNumberValue());
  };

  const onStepperPress = async (action) => {
    setNumber(await stepNumberValue(action));
  };

  return (
    <div className="number-stepper">
      <div>
        <button
            className="button-stepper"
            onClick={() => { onStepperPress('increment') }}>+</button>
        {number}
        <button
            className="button-stepper"
            onClick={() => { onStepperPress('decrement') }}>-</button>
      </div>
      <div>
        <button
          className="button-reset"
          onClick={() => { onStepperPress('reset') }}>RESET</button>
      </div>
    </div>
  );
};

export default NumberStepper;
