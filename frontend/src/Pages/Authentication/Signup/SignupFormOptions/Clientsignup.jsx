import React, { useEffect } from 'react'
import Signup from '../Signup'
import SignupNav from '../SignupNav'

function ClientSignup() {
  useEffect(() => {
    document.title = 'Sign In | Workifyy'
  }, [])

  // 👇 define navigation items here
  const ClientFormNav = [
    { name: 'Home', to: '/' },

    { name: 'Join as Professional', to: '/auth/ProfessionalSignup' },
  ]

  return (
    <div>
      {/* <SignupNav Formnavigation={ClientFormNav} /> */}
      <Signup role="client" />
    </div>
  )
}

export default ClientSignup
