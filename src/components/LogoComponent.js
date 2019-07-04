import React from 'react'
import { getBEMClasses } from '../helpers/cssClassesHelper'

import logo from '../assets/images/logoc.png'
import '../styles/components/logoComponent.css'

const logoClasses = getBEMClasses(['logo'])

const LogoComponent = (props, context) => {
  return (
    <div className={logoClasses('wrapper')}>
      <img className={logoClasses('image')} src={logo} alt='logo' />
    </div>
  )
}

export default LogoComponent
