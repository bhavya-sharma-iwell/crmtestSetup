import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Import the new App component which contains the router

// Get the root element from the HTML document.
const rootElement = document.getElementById('root');

// Create a React root and render the App component inside it.
// This is the standard way to render React 18+ applications.
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);