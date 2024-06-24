import React, { useEffect, useRef } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import './GrapesEditor.css';
import axios from 'axios';

import InputElements from "./GrapeElements/InputBox";
import TextAreaElement from "./GrapeElements/TextArea";
import CheckBoxElement from "./GrapeElements/CheckBox";
import OtherElements from "./GrapeElements/OtherElements";
import DateTimeElement from "./GrapeElements/DateTime";

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
          ...InputElements, ...TextAreaElement, ...CheckBoxElement, ...DateTimeElement, ...OtherElements,
          {
            id: 'multi-select',
            label: 'Multi-Select',
            category: 'Inputs',
            attributes: { class: 'gjs-block-multi-select' },
            content: '<div class="form-group"><label class="block text-gray-700">Multi-Select</label><select multiple class="form-control border rounded-md p-2 w-full" placeholder="Select options"><option value="Option 1">Option 1</option></select></div>',
          }
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
      // Inject Tailwind CSS into the GrapesJS editor iframe
      const iframe = editor.Canvas.getFrameEl();
      const iframeHead = iframe.contentDocument.head;

      // Add Tailwind CSS link
      const link = iframe.contentDocument.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
      iframeHead.appendChild(link);

      // Add Tailwind CSS script
      const script = iframe.contentDocument.createElement('script');
      script.src = 'https://cdn.tailwindcss.com';
      iframeHead.appendChild(script);

      // Add form container on load
      const wrapper = editor.getWrapper();
      const formContainer = `<!-- component -->
      <!-- Code on GiHub: https://github.com/vitalikda/form-floating-labels-tailwindcss -->
      <style>
        .-z-1 {
          z-index: -1;
        }
      
        .origin-0 {
          transform-origin: 0%;
        }
      
        input:focus ~ label,
        input:not(:placeholder-shown) ~ label,
        textarea:focus ~ label,
        textarea:not(:placeholder-shown) ~ label,
        select:focus ~ label,
        select:not([value='']):valid ~ label {
          /* @apply transform; scale-75; -translate-y-6; */
          --tw-translate-x: 0;
          --tw-translate-y: 0;
          --tw-rotate: 0;
          --tw-skew-x: 0;
          --tw-skew-y: 0;
          transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate))
            skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
          --tw-scale-x: 0.75;
          --tw-scale-y: 0.75;
          --tw-translate-y: -1.5rem;
        }
      
        input:focus ~ label,
        select:focus ~ label {
          /* @apply text-black; left-0; */
          --tw-text-opacity: 1;
          color: rgba(0, 0, 0, var(--tw-text-opacity));
          left: 0px;
        }
      </style>
      
      <div class="min-h-screen bg-gray-100 p-0 sm:p-12">
        <div class="mx-auto max-w-md px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl">
          <h1 class="text-2xl font-bold mb-8">Form Title</h1>
          <form id="form" novalidate>
            <div class="relative z-0 w-full mb-5">
              <input
                type="text"
                name="name"
                placeholder=" "
                required
                class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
              <label for="name" class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500 left-0">Enter name</label>
              <span class="text-sm text-red-600 hidden" id="error">Name is required</span>
            </div>
            <div></div>
            <button
              id="button"
              type="button"
              class="w-full px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-pink-500 hover:bg-pink-600 hover:shadow-lg focus:outline-none"
            >
              Submit
            </button>
          </form>
        </div>
      </div>`;
      wrapper.append(formContainer);

      console.log('Editor loaded successfully');

      // Function to change the placeholder value
      const changePlaceholder = (newPlaceholder) => {
        const components = editor.getComponents();
        components.each(component => {
          if (component.is('input') && component.getAttributes().placeholder === "Enter something") {
            component.addAttributes({ placeholder: newPlaceholder });
          }
        });
      };

      // Example usage: Change placeholder of all inputs with the original placeholder "Enter something"
      changePlaceholder('New placeholder text');

      // Function to dynamically add options to the multi-select dropdown
      const addOptionsToMultiSelect = (options) => {
        const components = editor.getComponents();
        components.each(component => {
          if (component.is('select') && component.getAttributes().multiple) {
            options.forEach(option => {
              component.append(`<option value="${option}">${option}</option>`);
            });
          }
        });
      };

      // Example usage: Add options to multi-select dropdown
      addOptionsToMultiSelect(['Option 2', 'Option 3', 'Option 4']);

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
