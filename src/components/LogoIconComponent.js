import React from 'react'
import { getBEMClasses } from '../helpers/cssClassesHelper'

import logo from '../assets/images/logoc.png'
import '../styles/components/logoIconComponent.css'

const logoIconClasses = getBEMClasses([ 'logo-icon' ])

const LogoIconComponent = (props, context) => {
  return (
      <div className={ logoIconClasses('wrapper') }>
          <img className={ logoIconClasses('image') } src={ logo } alt='logo' />
      </div>
  )
}

export default LogoIconComponent
