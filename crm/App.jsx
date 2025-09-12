import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Cookie from './utils/Cookie';
import '../src/styles/global.css';
import CrmRoutes from 'crm/routes';
import { ThemeProvider } from '@/components/the-context.jsx';
import { SidebarProvider } from '../components/ui/sidebar';
import { AppSidebar } from '../components/app-sidebar';
import Navbar from '../components/nav-bar';

const AuthWrapper = ({ children }) => {
  useEffect(() => {
    // This function checks for the cookie and redirects if it's missing
    const checkCookieAndRedirect = () => {
      if (!Cookie.getCookie("c_ux")) {
        window.open(`${window.location.origin}/app/#/broker/dashboard`, '_self');
      }
    };

    checkCookieAndRedirect(); // Initial check on component mount

    // Set up a polling mechanism to check every 2 seconds
    const interval = setInterval(checkCookieAndRedirect, 2000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return children;
};

const Layout = () => {
  return (
    <main className='bg-background relative flex w-full flex-1 flex-col md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2'>
      <SidebarProvider >
        <AppSidebar />
        <div className='bg-background relative flex w-full flex-1 flex-col md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2'>

          <Navbar />
          <div className="p-8">
            {/* Child routes from CrmRoutes will be rendered here */}
            <Outlet />
          </div>
        </div>
      </SidebarProvider>

    </main>
  );
};

function App() {
  // This initial check prevents the app from rendering briefly before redirecting.
  if (!Cookie.getCookie('c_ux')) {
    window.location.href = "/app/#/login";
    return null; // Render nothing while redirecting
  }

  return (
    <Fragment>
      <ThemeProvider>
        <Router basename="crm">
          <AuthWrapper>
            <Routes>
              {/* --- THIS IS THE KEY CHANGE --- */}
              {/* The Layout component is now a parent route. It will always be visible. */}
              <Route path="/" element={<Layout />}>
                {/* The '*' path makes this route a catch-all for any nested URL.
                  CrmRoutes will be rendered inside the <Outlet /> of the Layout component.
                */}
                <Route path="/*" element={<CrmRoutes />} />
              </Route>
            </Routes>
          </AuthWrapper>
        </Router>
      </ThemeProvider>
    </Fragment>
  );
}

export default App;