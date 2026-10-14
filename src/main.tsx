import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LeadCapturePage } from './features/lead/LeadCapturePage';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LeadCapturePage />
  </StrictMode>,
);
