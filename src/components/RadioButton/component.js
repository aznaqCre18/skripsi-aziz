import React from 'react'

const RadioButton = ({label, idx, value, onCheckStatus, data, idPertemuan, dataMapel}) => {

  const onCheckRadio = () => {
    const dataPayload = {
      idPertemuan: idPertemuan,
      idSiswa: data.id,
      status: value,
      idMapel: dataMapel.mapel.id,
    }
    onCheckStatus(dataPayload);
  }

  return (
    <label className="custom-radio-btn">
      <span className="label">{label}</span>
      <input type="radio" name={`sample-${idx}`} onClick={onCheckRadio} />
      <span className="checkmark"></span>
    </label>
  )
}

export default RadioButton