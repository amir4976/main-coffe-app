import React from 'react'
import style from '../../../styles/Breadcrumb.module.css'
function Breadcrumb({route}) {
  return (
    <div className={style.main_breadcrump} >
          خانه / {route}
    </div>
  )
}

export default Breadcrumb
