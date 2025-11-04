import React, { useEffect } from 'react'
import Form from '../../../../Components/Form'
import FormNav from '../../../../Components/FormNav'

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
      <FormNav Formnavigation={ProfessionalFormNav} />
      <Form role="professional"/>
    </div>
  )
}

export default Professionalsignup
