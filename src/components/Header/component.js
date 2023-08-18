import React, { useState } from 'react'
import { getInitials } from '../../utils/getInitial';
import AuthService from '../../utils/authService';

const Auth = new AuthService();

function Header({title, fullName, role, photo}) {

  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const _handleOpenPopup = () => {
    setIsOpenPopup(!isOpenPopup)
  }

  const _handleLogout = () => {
    Auth.logout();
    window.location.href = '/'
  }

  return (
    <div className="header-container">
      <div className="title-page">
        <h1>{title}</h1>
      </div>
      <div className="tile-profile">
        <div className="nama-role">
          <p className="nama">{fullName}</p>
          <p className="role">{role}</p>
        </div>
        <div className="profile-pict" onClick={_handleOpenPopup}>
          {
            photo ? (
              <img src={photo} alt="" />
            ) : (
              <p>{getInitials(fullName)}</p>
            )
          }
        </div>
        <div style={{zIndex: '999'}} className={`pop-up ${isOpenPopup ? 'open' : ''}`}>
          <p onClick={_handleLogout}>Logout</p>
        </div>
      </div>
    </div>
  )
}

export default Header
