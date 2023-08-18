import React from 'react'

function Button({label, type, onClick, width, color, data, disable}) {
  return (
    <button disabled={disable} style={{width: width ? width : null, backgroundColor: color ? color : null, cursor: disable ? 'not-allowed' : 'pointer'}} onClick={!data ? onClick : () => onClick(data)} className={`btn-cmp ${type ? type : ''}`}>{label}</button>
  )
}

export default Button
