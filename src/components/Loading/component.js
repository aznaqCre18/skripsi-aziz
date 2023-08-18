import React from 'react'
import { LoadingIcon } from '../../configs/icons'

function Loading({height = '100%'}) {
  return (
    <div className="loading-container" style={{height}}>
        <img width={75} src={LoadingIcon} alt="loading" />
    </div>
  )
}

export default Loading