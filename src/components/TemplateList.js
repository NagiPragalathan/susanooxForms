// src/components/TemplateList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TemplateList = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      const response = await axios.get('http://localhost:5000/templates');
      setTemplates(response.data);
    };

    fetchTemplates();
  }, []);

  return (
    <div>
      <h1>Saved Templates</h1>
      <ul>
        {templates.map((template, index) => (
          <li key={index}>
            <Link to={`/edit/${template._id}`}>Edit Template {index + 1}</Link>
            {' | '}
            <Link to={`/preview/${template._id}`}>Preview Template {index + 1}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TemplateList;
