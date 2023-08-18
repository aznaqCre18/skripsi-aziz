import React from 'react'
import { Link } from 'react-router-dom'
import { BigRightIcon } from '../../configs/icons'

function OtherButtonDashboard({content}) {
  return (
    <React.Fragment>
        {
            content.map((data, idx) => {
                return (
                    <Link style={{width: '100%', textDecoration: 'none'}} to={data.path} >
                        <div key={idx} className={`other-btn-container ${data.type ? data.type : "info"}`}>
                            <div className="content">
                                <img className="icon-btn" src={data.icon} alt="icon-btn" />
                                <div className="wording">
                                    <p className="title">{data.title}</p>
                                    <p className="description">{data.description}</p>
                                </div>
                            </div>
                            <img src={BigRightIcon} alt="icon-next" />
                        </div>
                    </Link>
                )
            })
        }
    </React.Fragment>
  )
}

export default OtherButtonDashboard