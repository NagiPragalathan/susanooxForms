// src/components/PreviewTemplate.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PreviewTemplate = () => {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    const fetchTemplate = async () => {
      const response = await axios.get(`http://localhost:5000/templates/${id}`);
      setTemplate(response.data);
    };

    fetchTemplate();
  }, [id]);

  if (!template) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <style>{template.css}</style>
      <div dangerouslySetInnerHTML={{ __html: template.html }}></div>
    </div>
  );
};

export default PreviewTemplate;
