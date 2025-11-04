import React, { useEffect } from 'react'
import Form from '../../../../Components/Form'
import FormNav from '../../../../Components/FormNav'

function Clientsignup() {
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
      <FormNav Formnavigation={ClientFormNav} />
      <Form role="client"/>
    </div>
  )
}

export default Clientsignup
