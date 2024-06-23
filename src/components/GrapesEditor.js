// src/components/GrapesEditor.js

import React, { useEffect, useRef } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import './GrapesEditor.css';
import axios from 'axios';

const GrapesEditor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    const editor = grapesjs.init({
      container: editorRef.current,
      fromElement: true,
      height: '100vh',
      width: 'calc(100% - 250px)', // Adjust width to leave space for the block manager
      storageManager: { autoload: 0 },
      blockManager: {
        appendTo: '#blocks',
        blocks: [
          {
            id: 'form',
            label: '<b>Form</b>',
            attributes: { class: 'gjs-block-form' },
            content: `<form class="vertical-form">
                        <div class="form-group">
                          <label for="input1">Input 1</label>
                          <input type="text" class="form-control" id="input1" placeholder="Enter something">
                        </div>
                      </form>`,
          },
          {
            id: 'input',
            label: 'Input',
            attributes: { class: 'gjs-block-input' },
            content: '<div class="form-group"><label>Input</label><input type="text" class="form-control" placeholder="Enter something"></div>',
          },
          {
            id: 'textarea',
            label: 'Textarea',
            attributes: { class: 'gjs-block-textarea' },
            content: '<div class="form-group"><label>Textarea</label><textarea class="form-control" rows="3" placeholder="Enter something"></textarea></div>',
          },
          {
            id: 'checkbox',
            label: 'Checkbox',
            attributes: { class: 'gjs-block-checkbox' },
            content: `<div class="form-group form-check">
                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                        <label class="form-check-label" for="defaultCheck1">
                          Default checkbox
                        </label>
                      </div>`,
          },
          {
            id: 'radio',
            label: 'Radio',
            attributes: { class: 'gjs-block-radio' },
            content: `<div class="form-group form-check">
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
                        <label class="form-check-label" for="exampleRadios1">
                          Default radio
                        </label>
                      </div>`,
          },
          {
            id: 'select',
            label: 'Select',
            attributes: { class: 'gjs-block-select' },
            content: `<div class="form-group"><label>Select</label><select class="form-control">
                        <option>Option 1</option>
                        <option>Option 2</option>
                        <option>Option 3</option>
                      </select></div>`,
          },
          {
            id: 'button',
            label: 'Button',
            attributes: { class: 'gjs-block-button' },
            content: '<div class="form-group"><button type="button" class="btn btn-primary">Submit</button></div>',
          },
        ],
      },
      styleManager: {
        sectors: [
          {
            name: 'General',
            open: false,
            buildProps: ['float', 'display', 'position', 'top', 'right', 'left', 'bottom'],
          },
          {
            name: 'Dimension',
            open: false,
            buildProps: ['width', 'height', 'max-width', 'min-height', 'margin', 'padding'],
          },
          {
            name: 'Typography',
            open: false,
            buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height', 'text-align', 'text-decoration', 'text-shadow'],
          },
          {
            name: 'Decorations',
            open: false,
            buildProps: ['border-radius', 'background-color', 'border', 'box-shadow', 'background'],
          },
          {
            name: 'Extra',
            open: false,
            buildProps: ['opacity', 'transition', 'perspective', 'transform'],
          },
        ],
      },
      plugins: ['gjs-blocks-basic'],
      pluginsOpts: {
        'gjs-blocks-basic': {},
      },
    });

    editor.on('load', () => {
      // Add form container on load
      const wrapper = editor.getWrapper();
      const formContainer = `<form class="vertical-form">
                                <div class="form-group">
                                  <label for="input1">Input 1</label>
                                  <input type="text" class="form-control" id="input1" placeholder="Enter something">
                                </div>
                             </form>`;
      wrapper.append(formContainer);

      console.log('Editor loaded successfully');

      const saveTemplate = async () => {
        try {
          const html = editor.getHtml();
          const css = editor.getCss();
          const components = JSON.stringify(editor.getComponents());
          const styles = JSON.stringify(editor.getStyle());

          await axios.post('http://localhost:5000/save-template', {
            html,
            css,
            components,
            styles,
          });

          alert('Template saved successfully');
        } catch (error) {
          console.error('Error saving template:', error);
        }
      };

      const saveButton = document.getElementById('save-button');
      if (saveButton) {
        saveButton.addEventListener('click', saveTemplate);
      }
    });

    return () => {
      editor.destroy();
    };
  }, []);

  return (
    <div className="editor-container">
      <div id="blocks" className="blocks-container"></div>
      <div ref={editorRef} className="editor-main"></div>
      <button id="save-button" className="save-button" style={{zIndex:99}}>Save</button>
    </div>
  );
};

export default GrapesEditor;
