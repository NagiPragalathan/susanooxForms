const InputElements = [
    {
      id: 'input',
      label: 'Input',
      category: 'Inputs',
      attributes: { class: 'gjs-block-input' },
      content: `<div class="relative z-0 w-full mb-5">
                    <input
                        type="text"
                        name="name"
                        placeholder=" "
                        required
                        class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                    />
                    <label for="name" class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Enter name</label>
                    <span class="text-sm text-red-600 hidden" id="error">Name is required</span>
                </div>`,
    },
    {
      id: 'input-rounded',
      label: 'Rounded Input',
      category: 'Inputs',
      attributes: { class: 'gjs-block-input-rounded' },
      content: '<div class="form-group"><label class="block text-gray-700">Rounded Input</label><input type="text" class="form-control border rounded-full p-2 w-full" placeholder="Enter something"></div>',
    },
    {
      id: 'input-outline',
      label: 'Outlined Input',
      category: 'Inputs',
      attributes: { class: 'gjs-block-input-outline' },
      content: '<div class="form-group"><label class="block text-gray-700">Outlined Input</label><input type="text" class="form-control border-2 border-blue-500 rounded-md p-2 w-full" placeholder="Enter something"></div>',
    },
  ];
  
export default InputElements;
  