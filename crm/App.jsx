import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Cookie from './utils/Cookie';
import  {Button}  from '../components/ui/button';
import '../src/styles/global.css';
// import { Button } from "@/components/ui/button";


// This is the actual dashboard content, separated into its own component.
const DashboardPage = () => {
  const handleRedirect = () => {
		window.open(`${window.location.origin}/app/#/broker/dashboard`,'_blank');	

  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Welcome to CRM</h1>
      <button
        onClick={handleRedirect}
        className="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow-md hover:bg-blue-700 transition"
      >
        Go to Mint
      </button>
      {/* <Button variant="outline">Click me</Button> */}

      <div className="flex flex-wrap items-center gap-2 md:flex-row pt-20">   
      <Button variant="outline">Button</Button>  
       </div>

      {/* <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600">
        Hello Tailwind with React! 👋
      </h1>
    </div> */}
    </div>
  );
};


// --- Main App Component with Routing ---
// This component handles the different pages of your application.
const Layout = () => {
    return (
        // A simple layout with a header and an Outlet for nested routes
        <div className="p-8">
            <header className="mb-4">
                <h1 className="text-2xl font-bold text-center">CRM App</h1>
            </header>
            <Outlet /> {/* This is where the child route component will be rendered */}
        </div>
    );
};

const AuthWrapper = ({ children }) => {

  useEffect(() => {
    // Initial check
    if (!Cookie.getCookie("c_ux")) {
		window.open(`${window.location.origin}/app/#/broker/dashboard`,'_self');	

    }

    // Poll every 2s
    const interval = setInterval(() => {
      if (!Cookie.getCookie("c_ux")) {
		window.open(`${window.location.origin}/app/#/broker/dashboard`,'_self');	

        
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return children;
};

function App() {
  if (!Cookie.getCookie('c_ux')) {
      window.location.href = "/app/#/login"
    }
  return (
    <Fragment>
   {Cookie.getCookie('c_ux') && 

    <Router basename="crm">
      <Routes>
        {/*
          The parent route is now a layout route that will render a shared header
          and use an <Outlet /> to display the child route.
        */}
        <Route path="/" element={<AuthWrapper><Layout/></AuthWrapper>}>
  
          <Route index element={<div className="p-8 text-center text-gray-500">Welcome! Please navigate to the dashboard.</div>} />
          {/*
            The dashboard route is now nested. The full path is `/dashboard`.
          */}
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </Router>}
    </Fragment>
          
  );
}

export default App;