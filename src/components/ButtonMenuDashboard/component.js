import React from 'react'
import { ArrowRightIcon, JmlGuruIcon, JmlSiswaIcon } from '../../configs/icons'

const ButtonMenuDashboard = ({category = "-", count = 0, backgroundType, icon, isBtn}) => {
  return (
    <div className={`btn-menu-dashboard-container ${backgroundType}`}>
        {isBtn && <img className="arrow-right" src={ArrowRightIcon} alt="arrow-right" />}
        <div className="btn-content">
            {icon && <img src={icon} alt="icon-btn" />}
            <div className="count-cat">
                <p className="count">{count}</p>
                <p className="cat">{category}</p>
            </div>
        </div>
    </div>
  )
}

export default ButtonMenuDashboard