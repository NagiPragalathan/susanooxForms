// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GrapesEditor from './components/GrapesEditor';
import TemplateList from './components/TemplateList';
import EditTemplate from './components/EditTemplate';
import PreviewTemplate from './components/PreviewTemplate';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<GrapesEditor />} />
          <Route path="/templates" element={<TemplateList />} />
          <Route path="/edit/:id" element={<EditTemplate />} />
          <Route path="/preview/:id" element={<PreviewTemplate />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
