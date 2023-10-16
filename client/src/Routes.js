import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { LoginSignup } from './pages/LoginSignup'
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { LandingPage } from './pages/LandingPage';
import { HomePage } from './pages/HomePage';
import { TransactionPage } from './pages/TransactionPage';
import { BudgetPage } from './pages/BudgetPage';


export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/landingpage' element={<LandingPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/transactions" element={<TransactionPage />} />
                <Route path="/budget" element={<BudgetPage />} />
            </Routes>
        </Router>
    )
}