import React, { useState } from 'react';
import Button from '../Button/component';
import Dropdown from '../Dropdown';
import SearchField from '../SearchField';

function HeaderMainDataView({ children, button, onClick, isSearchField = true, isDropdownFilter = false, dataDropdown, onFilter, onChangeSearch }) {
  const [dropdownSelected, setdropdownSelected] = useState("-- Pilih Kelas --");
  const [dropdownValue, setdropdownValue] = useState("-- Pilih Kelas --");
  
  const _handleChangeDropdown = (data) => {
    setdropdownSelected(data.namaKelas);
    onFilter(data.id);
  }

  return (
    <div className="tools">
      {
        children ? (
          <div style={{width: '100%'}} className="container-dropdown-filter">{children}</div>
        ) : (
          <React.Fragment>
            <div className="search-field" style={{display: 'flex', gap: 12}} >
              {isSearchField && <SearchField placeholder="Cari..." onChange={onChangeSearch} />}
              {isDropdownFilter && <Dropdown width='280px' data={dataDropdown.dataKelas} nameKey={dataDropdown.key} onChange={_handleChangeDropdown} value={dropdownSelected} />}
            </div>
            <div className="btn-group-tools">
              {
                button && button.map((data, idx) => (
                  <React.Fragment>
                    <Button label={data.label} key={idx} onClick={() => onClick(data.value)} />
                  </React.Fragment>
                ))
              }
            </div>
          </React.Fragment>
        )
      }
    </div>
  )
}

export default HeaderMainDataView;