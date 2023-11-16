import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
    return (
        <Router>
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/verify' element={<VerifyEmail />} />
                <Route path='/confirmation/:token' element={<Confirmation />} />
                <Route path="/home" element={<DashboardPage />} />
                <Route path="/transactions" element={<TransactionPage />} />
                <Route path="/budget" element={<BudgetPage />} />
                <Route path="/settings" element={<SettingsPage />}/>
                <Route path="/forgotpassword" element={<ForgotPassword />}/>
                <Route path="/reset" element={<Reset />}/>
            </Routes>
        </Router>
    )
}