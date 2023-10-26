import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { TransactionPage } from './pages/TransactionPage';
import { BudgetPage } from './pages/BudgetPage';
import { SettingsPage } from './pages/SettingsPage';
import { ForgotPassword } from './pages/ForgotPassword';
// import { CalendarPage } from './pages/CalendarPage';


export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path="/home" element={<DashboardPage />} />
                <Route path="/transactions" element={<TransactionPage />} />
                <Route path="/budget" element={<BudgetPage />} />
                <Route path="/settings" element={<SettingsPage />}/>
                <Route path="/forgotpassword" element={<ForgotPassword />}/>
                {/* <Route path='/calendar' element={<CalendarPage />}/> */}
            </Routes>
        </Router>
    )
}