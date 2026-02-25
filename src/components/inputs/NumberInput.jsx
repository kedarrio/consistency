import React from 'react';
import TextInput from './TextInput';

const NumberInput = (props) => {
  return (
    <TextInput 
      {...props} 
      type="number" 
      className={`number-input-no-spinner ${props.className || ''}`}
    />
  );
};

export default NumberInput;
