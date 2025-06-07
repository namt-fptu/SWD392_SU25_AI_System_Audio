import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import AppTheme from '../pages/shared-theme/AppTheme';
// Import các trang từ template
import Dashboard from '../pages/dashboard/Dashboard';
import MarketingPage from '../pages/marketing-page/MarketingPage';
import SignIn from '../pages/sign-in-side/SignInSide';
import SignUp from '../pages/sign-up/SignUp'; 
function App() {
  return (
    <AppTheme>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<MarketingPage />} />
           <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </Router>
    </AppTheme>
  );
}

export default App;
