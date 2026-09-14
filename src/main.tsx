import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import MotorHubCaseStudy from './pages/MotorHub.tsx';
import AlpineCaseStudy from './pages/Alpine.tsx';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/inicio" element={<App />} />
        <Route path="/sobre-mi" element={<App />} />
        <Route path="/educacion" element={<App />} />
        <Route path="/skills" element={<App />} />
        <Route path="/proyectos" element={<App />} />
        <Route path="/contacto" element={<App />} />
        <Route path="/proyectos/motorhub" element={<MotorHubCaseStudy />} />
        <Route path="/proyectos/alpine" element={<AlpineCaseStudy />} />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

