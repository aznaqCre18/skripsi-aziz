import React from 'react';

function Input({label, placeholder, onChange, name, type = "text", defaultValue, style, uppercase, maxLength, max, onClick, ref, disabled = false}) {
  return (
    <div style={style} className="input-wrapper" onClick={onClick ? onClick : null}>
      <label htmlFor="">{label}</label>
      <input 
        ref={ref ? ref : null}
        autoCorrect="off" 
        autoComplete="off" 
        name={name} 
        type={type} 
        placeholder={placeholder} 
        onChange={onChange} 
        value={defaultValue} 
        style={{textTransform: uppercase ? 'uppercase' : 'unset', cursor: disabled ? 'not-allowed' : 'text' }} 
        maxLength={maxLength}
        max={max}
        disabled={disabled}
      />
    </div>
  )
}

export default Input