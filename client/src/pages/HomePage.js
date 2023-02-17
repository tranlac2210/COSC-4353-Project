import React from 'react';
import { BrowserRouter as Router, Route,Routes , Link } from 'react-router-dom';
import { Navbar } from '../components'
import { Background } from '../components'
import { Sidebar } from '../components'
import { Submenu } from '../components'
import { AppProvider } from '../components';

function HomePage() {
  return (
    <>
        <AppProvider>
          <Navbar/>
          <Background/>
          <Sidebar/>
          <Submenu/>
        </AppProvider>
    </>
  );
}

export default HomePage;