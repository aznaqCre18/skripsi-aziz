import React from 'react'
import { SearchIcon } from '../../configs/icons'

function SearchField({onChange, placeholder, onEnter}) {
  return (
    <div className="search-field-container" style={{ width: '100%' }}>
        <img src={SearchIcon} alt="search-icon" />
        <input type="text" placeholder={placeholder} onChange={onChange} style={{ width: '100%' }} />
    </div>
  )
}

export default SearchField