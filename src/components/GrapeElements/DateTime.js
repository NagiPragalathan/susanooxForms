const DateTimeElement = [
    {
        id: 'date',
        label: 'date',
        category: 'DateTime',
        attributes: { class: 'gjs-block-checkbox' },
        content: `<div class="relative z-0 w-full mb-5">
                    <input
                        type="text"
                        name="date"
                        placeholder=" "
                        onclick="this.setAttribute('type', 'date');"
                        class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                    />
                    <label for="date" class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500 left-0">Date</label>
                    <span class="text-sm text-red-600 hidden" id="error">Date is required</span>
                </div>`,
    },
    {
        id: 'time',
        label: 'time',
        category: 'DateTime',
        attributes: { class: 'gjs-block-checkbox' },
        content: `<div class="relative z-0 w-full">
                    <input
                        type="text"
                        name="time"
                        placeholder=" "
                        onclick="this.setAttribute('type', 'time');"
                        class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                    />
                    <label for="time" class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500 left-0">Time</label>
                    <span class="text-sm text-red-600 hidden" id="error">Time is required</span>
                </div>`,
    },
]
export default DateTimeElement;