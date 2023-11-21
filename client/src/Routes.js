import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { TransactionPage } from './pages/TransactionPage';
import { BudgetPage } from './pages/BudgetPage';
import { SettingsPage } from './pages/SettingsPage';
import { Login } from './pages/auth/LoginPage';
import { Register } from './pages/auth/RegisterPage';
import { ForgotPassword } from './pages/auth/ForgotPasswordPage';
import { Reset } from './pages/auth/ResetPasswordPage';
import { VerifyEmail } from './pages/auth/VerifyEmailPage';
import { Confirmation } from './pages/auth/ConfirmedEmailPage';


export const AppRoutes = () => {
    const cookies = document.cookie.includes('userID')

    return (
        <Router>
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/verify' element={<VerifyEmail />} />
                <Route path='/confirmation/:token' element={<Confirmation />} />
                <Route path="/forgotpassword" element={<ForgotPassword />}/>
                <Route path="/reset/:email" element={<Reset />}/>

                {/* will reroute to login if user is not logged in */}
                <Route path="/home" element={cookies ? <DashboardPage /> : <Navigate to="/login" />} />
                <Route path="/transactions" element={cookies ? <TransactionPage /> : <Navigate to="/login" />} />
                <Route path="/budget" element={cookies ? <BudgetPage /> : <Navigate to="/login" />} />
                <Route path="/settings" element={cookies ? <SettingsPage /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    )
}