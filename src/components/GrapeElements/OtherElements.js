const OtherElements = [
    
    {
        id: 'radio',
        label: 'Radio',
        category: 'Other',
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
        category: 'Other',
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
        category: 'Other',
        attributes: { class: 'gjs-block-button' },
        content: '<div class="form-group"><button type="button" class="btn btn-primary bg-blue-500 text-white rounded-md p-2 w-full">Submit</button></div>',
      },
]
export default OtherElements;