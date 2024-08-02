import React from 'react';
import PropTypes from 'prop-types';
import css from './Input.module.css';

const Input = ({
  label,
  type,
  dataName,
  validation,
  title,
  funcChange,
  stateField,
}) => {
  return (
    <label className={css.label}>
      {label}
      <input
        className={css.input}
        type={type}
        name={dataName}
        pattern={validation}
        title={title}
        required
        onChange={funcChange}
        value={stateField}
      />
    </label>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  dataName: PropTypes.string.isRequired,
  validation: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  funcChange: PropTypes.func.isRequired,
  stateField: PropTypes.string.isRequired,
};

export default Input;
