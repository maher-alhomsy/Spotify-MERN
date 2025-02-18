import { Route, Routes } from 'react-router';

import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';

import Home from './pages/Home';
import Chat from './pages/Chat';
import Main from './layout/Main';
import AuthCallback from './pages/AuthCallback';

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/sso-callback"
          element={
            <AuthenticateWithRedirectCallback signUpForceRedirectUrl="/auth-callback" />
          }
        />
        <Route path="/auth-callback" element={<AuthCallback />} />

        <Route element={<Main />}>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
