// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './authContext';
import routes from './routes';
import Header from '../src/Components/Header';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
      <Header/>
        <Routes>
          {routes.map((element, index) => {
            return (
              <Route
                path={element.path}
                element={element.component}
                key={element.path + index}
              />
            );
          })}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
