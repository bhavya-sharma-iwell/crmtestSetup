import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Cookie from './utils/Cookie';
import  {Button}  from '../components/ui/button';
import '../src/styles/global.css';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import CrmRoutes from  'crm/routes'
// import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import {NavigationMenuDemo} from "./navigation";
// import { Link } from "next/link"

// export function NavigationMenuDemo() {
//   return (
//     <NavigationMenuItem>
//       <NavigationMenuLink asChild>
//         <Link href="/docs">Documentation</Link>
//       </NavigationMenuLink>
//     </NavigationMenuItem>
//   )
// }

// This is the actual dashboard content, separated into its own component.
const DashboardPage = () => {
  const handleRedirect = () => {
		window.open(`${window.location.origin}/app/#/broker/dashboard`,'_blank');	

  };

  return (

    <div>
        <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenuDemo/>
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
    </div>
  );
};


// export default function Layout({ children }) {
//   return (
//     <SidebarProvider>
//       <AppSidebar />
//       <main>
//         <SidebarTrigger />
//         {children}
//       </main>
//     </SidebarProvider>
//   )
// }

// --- Main App Component with Routing ---
// This component handles the different pages of your application.
const Layout = (children) => {
    return (
       
        <SidebarProvider >
        <AppSidebar />
        <main>
          <SidebarTrigger />
          <CrmRoutes />
        </main>
      </SidebarProvider>
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

        <Fragment>

          <Router basename="crm">
            <AuthWrapper>

                <Layout
            
                children = {<CrmRoutes />} />
              </AuthWrapper>

            {/* <Routes>
            
              <Route path="/" element={}>

                <Route index element={<div className="p-8 text-center text-gray-500">Welcome! Please navigate to the dashboard.</div>} />
              
                <Route path="/dashboard" element={<DashboardPage />} />
              </Route>
            </Routes> */}
            {/* <Layout /> */}
          </Router>
        </Fragment>



    
    
    }
    </Fragment>

          
  );
}

export default App;