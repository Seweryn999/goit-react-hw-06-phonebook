import React from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ label, typeOfBtn, btnFunc }) => {
  return (
    <button className={css.btn} type={typeOfBtn} onClick={btnFunc}>
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  typeOfBtn: PropTypes.string.isRequired,
  btnFunc: PropTypes.func,
};

export default Button;
