import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import AppTheme from '../pages/shared-theme/AppTheme';

import Dashboard from '../pages/dashboard/Dashboard';
import MarketingPage from '../pages/marketing-page/MarketingPage';
import SignIn from '../pages/sign-in-side/SignInSide';
import SignUp from '../pages/sign-up/SignUp'; 
import ChatPage from '../pages/chatPage/chatPage';
import LecturerPage from '../pages/Lecture/lecturerPage';

function App() {
  return (
    <AppTheme>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<MarketingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/chatPage" element={<ChatPage />} />
        <Route path="/lecturerPage" element={<LecturerPage />} />
      </Routes>
    </AppTheme>
  );
}

export default App;