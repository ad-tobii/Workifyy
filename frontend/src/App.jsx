import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './styles/index.css'

// Pages imported normally
import Home from './Pages/Home/Home'
import SignupOptions from './Pages/Authentication/SignupOptions/Signup'
import Signin from './Pages/Authentication/Signin/signin_user'
import OTP from './Pages/Authentication/OTP/otp'
import ForgotPassword from './Pages/Authentication/ForgotPassword'
import ResetPassword from './Pages/Authentication/ResetPassword'
import ClientSignup from './Pages/Authentication/formOptions/client/Clientsignup'
import ProfessionalSignup from './Pages/Authentication/formOptions/professional/Professionalsignup'
import ClientDashboard from './Pages/ClientDashoard/ClientDashboard'
import Onboarding from './Pages/Authentication/ProfessionalOnboarding/onboarding'
import JobPostingFLow from './Pages/ClientDashoard/JobPostingFlow/JobPostingFlow'
import ProfessionalDashboard from './Pages/ProfessionalDashboard/ProfessionalDashboard'
import ClientWallet from './Pages/ClientDashoard/Wallet'
import ClientProfile from './Pages/ClientDashoard/Profile'
import JobManagement from './Pages/ClientDashoard/Jobmanagement'
import ProfessionalWallet from './Pages/ProfessionalDashboard/Wallet/Wallet'
import ProfessionalProfile from './Pages/ProfessionalDashboard/Profile/Profile'
import EditClientProfile from './Pages/ClientDashoard/Profile/EditProfile'
import EditProfessionalProfile from './Pages/ProfessionalDashboard/Profile/EditProfile'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth">
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<SignupOptions />} />
          <Route path="ClientSignup" element={<ClientSignup />} />
          <Route path="ProfessionalSignup" element={<ProfessionalSignup />} />
          <Route path="otp" element={<OTP />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
        </Route>
        <Route path="/Onboarding" element={<Onboarding />} />
        <Route path="/Dashboard">
          <Route path="clientDashboard">
            <Route path="" element={<ClientDashboard />} />
            <Route path="profile" element={<ClientProfile />} />
            <Route path="profile/edit" element={<EditClientProfile />} />
            <Route path="wallet" element={<ClientWallet />} />
            <Route path="jobmanagement" element={<JobManagement />} />
            <Route path="Jobpost" element={<JobPostingFLow />} />
          </Route>
          <Route path="ProfessionalDashboard">
            <Route path="" element={<ProfessionalDashboard />} />
            <Route path="profile" element={<ProfessionalProfile />} />
            <Route path="profile/edit" element={<EditProfessionalProfile />} />
            <Route path="wallet" element={<ProfessionalWallet />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
