import React from 'react';
import '../../assets/styles/form.css';

const Mask = (props) => {
  const { onClick } = props;
  return (
    <div className="overlay-mask" onClick={() => { onClick(); }} />
  );
};

export default Mask;
