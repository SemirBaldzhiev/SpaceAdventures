import React from 'react';
import Router from './components/Router';
//import Menu from './components/Menu';
import './App.css';
import { UserProvider } from './context/UserContext';

const App = () => {

    return (
        <div>
            <UserProvider>
                <Router />
            </UserProvider>
        </div>
    );
};

export default App;
