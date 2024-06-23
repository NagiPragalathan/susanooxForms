// src/components/EditTemplate.js

import React, { useEffect, useRef } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import './GrapesEditor.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditTemplate = () => {
  const { id } = useParams();
  const editorRef = useRef(null);
  const editorInstance = useRef(null);

  useEffect(() => {
    const fetchTemplate = async () => {
      const response = await axios.get(`http://localhost:5000/templates/${id}`);
      const template = response.data;

      const editor = grapesjs.init({
        container: editorRef.current,
        height: '100vh',
        width: 'calc(100% - 250px)',
        storageManager: { autoload: 0 },
        blockManager: { appendTo: '#blocks', blocks: [] }, // Disable block manager
        components: JSON.parse(template.components),
        style: JSON.parse(template.styles),
        blockManager: {
            appendTo: '#blocks',
            blocks: [
              {
                id: 'section',
                label: '<b>Section</b>',
                attributes: { class: 'gjs-block-section' },
                content: `<section>
                    <h1>This is a simple section</h1>
                    <p>You can change this text</p>
                  </section>`,
              },
              {
                id: 'text',
                label: 'Text',
                content: '<div data-gjs-type="text">Insert your text here</div>',
              },
              {
                id: 'image',
                label: 'Image',
                select: true,
                content: { type: 'image' },
                activate: true,
              },
            ],
          },
      });

      editorInstance.current = editor;

      const saveTemplate = async () => {
        try {
          const html = editor.getHtml();
          const css = editor.getCss();
          const components = JSON.stringify(editor.getComponents());
          const styles = JSON.stringify(editor.getStyle());

          await axios.put(`http://localhost:5000/templates/${id}`, {
            html,
            css,
            components,
            styles,
          });

          alert('Template updated successfully');
        } catch (error) {
          console.error('Error updating template:', error);
        }
      };

      const saveButton = document.getElementById('save-button');
      if (saveButton) {
        saveButton.addEventListener('click', saveTemplate);
      }
    };

    fetchTemplate();

    return () => {
      if (editorInstance.current) {
        editorInstance.current.destroy();
      }
    };
  }, [id]);

  return (
    <div className="editor-container">
      <div id="blocks" className="blocks-container"></div>
      <div ref={editorRef} className="editor-main"></div>
      <button id="save-button" className="save-button" style={{zIndex:99}}>Save</button>
    </div>
  );
};

export default EditTemplate;
