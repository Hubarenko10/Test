const data = {
    "data": [
        {"name": "John", "email": "john2@mail.com"},
        {"name": "John", "email": "john1@mail.com"},
        {"name": "Jane", "email": "jane@mail.com"}
    ]
};

const filterBtn = document.getElementById('filter-btn');
const sortBtn = document.getElementById('sort-btn');

function displayData(data) {
    const container = document.getElementById('data-container');
    container.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        const div = document.createElement('div');
        div.innerHTML = `<b>Name:</b> ${data[i].name}, <b>Email:</b> ${data[i].email}`;
        container.appendChild(div);
    }
}

filterBtn.addEventListener('click',function filterData() {
    const keyElement = document.getElementById('filter-key');
    const key = keyElement.value;
    console.log(key)
    const valueElement = document.getElementById('filter-value');
    const value = valueElement.value;
    console.log(value)
    if(key === '' || value === '') {
    alert('Fill an empty field')
    }
    const filteredData = data.data.filter(obj => obj[key] === value);
    displayData(filteredData);
})

sortBtn.addEventListener('click',function sortData() {
    const key = document.getElementById('sort-key');

    const sortedData = data.data.sort((a, b) => (a[key] > b[key]) ? 1 : -1);
    displayData(sortedData);
})

displayData(data.data);