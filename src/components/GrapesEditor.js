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
      width: 'calc(100% - 250px)',
      storageManager: { autoload: 0 },
      blockManager: {
        appendTo: '#blocks',
        blocks: [
          {
            id: 'form',
            label: '<b>Form</b>',
            attributes: { class: 'gjs-block-form' },
            content: `<form class="vertical-form space-y-4 p-4 bg-gray-50 rounded-md">
                        <div class="form-group">
                          <label class="block text-gray-700">Input 1</label>
                          <input type="text" class="form-control border rounded-md p-2 w-full" id="input1" placeholder="Enter something">
                        </div>
                      </form>`,
          },
          {
            id: 'input',
            label: 'Input',
            attributes: { class: 'gjs-block-input' },
            content: '<div class="form-group"><label class="block text-gray-700">Input</label><input type="text" class="form-control border rounded-md p-2 w-full" placeholder="Enter something"></div>',
          },
          {
            id: 'textarea',
            label: 'Textarea',
            attributes: { class: 'gjs-block-textarea' },
            content: '<div class="form-group"><label class="block text-gray-700">Textarea</label><textarea class="form-control border rounded-md p-2 w-full" rows="3" placeholder="Enter something"></textarea></div>',
          },
          {
            id: 'checkbox',
            label: 'Checkbox',
            attributes: { class: 'gjs-block-checkbox' },
            content: `<div class="form-group form-check">
                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                        <label class="form-check-label text-gray-700" for="defaultCheck1">
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
                        <label class="form-check-label text-gray-700" for="exampleRadios1">
                          Default radio
                        </label>
                      </div>`,
          },
          {
            id: 'select',
            label: 'Select',
            attributes: { class: 'gjs-block-select' },
            content: `<div class="form-group"><label class="block text-gray-700">Select</label><select class="form-control border rounded-md p-2 w-full">
                        <option>Option 1</option>
                        <option>Option 2</option>
                        <option>Option 3</option>
                      </select></div>`,
          },
          {
            id: 'button',
            label: 'Button',
            attributes: { class: 'gjs-block-button' },
            content: '<button type="button" class="btn btn-primary bg-blue-500 text-white rounded-md p-2 w-full">Submit</button></div>',
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

    // Inject Tailwind CSS into the GrapesJS editor iframe
    const iframe = editor.Canvas.getFrameEl();
    const head = iframe.contentDocument.head;
    const script = iframe.contentDocument.createElement('script');
    script.src = 'https://cdn.tailwindcss.com';
    head.appendChild(script);

    editor.on('load', () => {
      // Add form container on load
      const wrapper = editor.getWrapper();
      const formContainer = `<div class="bg-red-500">asdfgh</div>`;
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
    <div className="editor-container flex">
      <div id="blocks" className="blocks-container w-64 bg-gray-100 border-r overflow-y-auto p-4"></div>
      <div ref={editorRef} className="editor-main flex-grow p-4 bg-white"></div>
      <button id="save-button" className="save-button absolute bottom-4 right-4 bg-green-500 text-white rounded-md p-2 z-50">Save</button>
    </div>
  );
};

export default GrapesEditor;
