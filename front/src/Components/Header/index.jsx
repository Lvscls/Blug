import React from 'react';
import { useNavigate } from 'react-router-dom';

import { StyledHeader, Login, Logout, ProfileLink } from './styles';
import { useAuth } from '../../authContext';


const Header = () => {
  const navigate = useNavigate();

  const { logout, isAuthenticated } = useAuth();
  const handleLogin = () => {
    navigate("/login");
  }

  const handleLogout = () => {
    logout();
  }

  const handleHome = () => {
    navigate("/");
  }
  return (
    <StyledHeader>
      <div>
        <h1 onClick={handleHome}>Blug</h1>
      </div>
      <div>
        {isAuthenticated ? (
          <>
            <ProfileLink href="/profile">P</ProfileLink>
            <Logout onClick={handleLogout}>Déconnexion</Logout>
          </>
        ) : (
          <Login onClick={handleLogin}>Connexion</Login>
        )}
      </div>
    </StyledHeader>
  );
}

export default Header;
