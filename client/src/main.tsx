import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { logToServer } from './services/loggerService';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

window.addEventListener('error', (event) => {
  logToServer('error', event.message, { stack: event.error?.stack });
});

window.addEventListener('unhandledrejection', (event) => {
  logToServer('error', 'Unhandled Promise Rejection', { reason: event.reason });
});

// Test immédiat au chargement
logToServer('info', '--- LOG DE TEST FRONTEND ---', { debug: true });

// On simule une erreur de rendu ou de logique
logToServer('error', 'ALERTE : Échec de chargement du module CRM', { 
  code: 'ERR_FRONT_001',
  user: 'test-user' 
});
