import React, { useEffect } from 'react'
import Signup from '../Signup'
import SignupNav from '../SignupNav'

function Professionalsignup() {
  useEffect(() => {
    document.title = 'Sign In | Workifyy'
  }, [])

  // 👇 define navigation items here
  const ProfessionalFormNav = [
    { name: 'Home', to: '/' },

    { name: 'Join as Client', to: '/auth/ClientSignup' },
  ]

  return (
    <div>
      {/* <SignupNav Formnavigation={ProfessionalFormNav} /> */}
      <Signup role="Professional" />
    </div>
  )
}

export default Professionalsignup
