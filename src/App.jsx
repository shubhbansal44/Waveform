import React, { useEffect } from 'react';
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { useNavigate, Outlet } from 'react-router-dom';
import { useSpotify } from './assets/dependencies/SpotifyContext';

function App() {
  const navigate = useNavigate();
  const { waveFormLogin, spotifyLogin } = useSpotify();

  useEffect(() => {
    if (!waveFormLogin || waveFormLogin === false) {
      navigate('/authentication');
    } else if(waveFormLogin && window.location.pathname === '/') {
      navigate('/home');
    }
  }, [spotifyLogin, waveFormLogin, navigate]);

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <Outlet />
    </>
  );
}

export default App;