import React, { useState } from 'react';
import { DownIcon } from '../../configs/icons';

function Dropdown({ data, onChange, value, width = "100%", nameKey, keyForm, label}) {

  const [isActive, setIsActive] = useState(false);

  const _handleOpenDropdown = () => {
    setIsActive(!isActive);
  }

  const _handleWhenSelectDropdown = (item) => {
    let tempObj = {
      ...item,
      customData: keyForm,
    }

    onChange(keyForm !== null && keyForm !== undefined ? tempObj : item);
    _handleOpenDropdown();
  }

  return (
    <React.Fragment>
      {label && <label style={{ fontSize: 14, color: '#040A22' }}>{label}</label>}
      <div className='dropdown-wrapper' style={{width}}>
        <div className="selected-value" onClick={_handleOpenDropdown}>
          <p className="active-cat">{ value ? value : 'Pilih' }</p>
          <img src={DownIcon} alt="down-ic" />
        </div>
        <div className={`selection-wrapper ${isActive ? 'active' : ''}`}>
          <ul style={{ marginBottom: 0, padding: 0 }}>
            {
              data && data.map((item, idx) => {
                return (
                  <li key={idx} onClick={() => _handleWhenSelectDropdown(item)}>{nameKey ? item[nameKey] : item.name}</li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Dropdown;