import React from 'react';
import { createRoot } from 'react-dom/client'; // Use createRoot from React 18
import './index.css';
import App from './App';

const rootElement = document.getElementById('root'); // Get the root DOM element
const root = createRoot(rootElement); // Create a React root

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
