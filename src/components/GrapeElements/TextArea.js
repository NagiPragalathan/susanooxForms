const TextAreaElement = [
    {
        id: 'textarea',
        label: 'Textarea',
        category: 'Textareas',
        attributes: { class: 'gjs-block-textarea' },
        content: '<div class="form-group"><label class="block text-gray-700">Textarea</label><textarea class="form-control border rounded-md p-2 w-full" rows="3" placeholder="Enter something"></textarea></div>',
      },
      {
        id: 'textarea-rounded',
        label: 'Rounded Textarea',
        category: 'Textareas',
        attributes: { class: 'gjs-block-textarea-rounded' },
        content: '<div class="form-group"><label class="block text-gray-700">Rounded Textarea</label><textarea class="form-control border rounded-full p-2 w-full" rows="3" placeholder="Enter something"></textarea></div>',
      },
      {
        id: 'textarea-outline',
        label: 'Outlined Textarea',
        category: 'Textareas',
        attributes: { class: 'gjs-block-textarea-outline' },
        content: '<div class="form-group"><label class="block text-gray-700">Outlined Textarea</label><textarea class="form-control border-2 border-blue-500 rounded-md p-2 w-full" rows="3" placeholder="Enter something"></textarea></div>',
      },
]
export default TextAreaElement;