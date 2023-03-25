fetch("../task-2.json")
  .then((response) => response.json())
  .then((data) => {
    const container = displayData(data.data);
    const filterBtn = document.getElementById("filter-btn");
    const sortBtn = document.getElementById("sort-btn");

    function filterData() {
      const keyElement = document.getElementById("filter-key");
      const key = keyElement.value;
      const valueElement = document.getElementById("filter-value");
      const value = valueElement.value;
      if (key === "" || value === "") {
        alert("Fill an empty field");
        return;
      }
      let filteredData = data.data.filter(
        (obj) =>
          obj[key] !== undefined &&
          ((typeof obj[key] === "string" &&
            obj[key].toUpperCase().includes(value.toUpperCase())) ||
            (typeof obj[key] === "boolean" && obj[key].toString() === value) ||
            (typeof obj[key] === "number" && obj[key] === parseInt(value)))
      );
      if (key === "disabled" && value === "true") {
        filteredData = filteredData.filter((obj) => obj.disabled === true);
      } else if (key === "disabled" && value === "false") {
        filteredData = filteredData.filter((obj) => obj.disabled === false);
      }
      displayData(filteredData, container);
    }

    function excludeData() {
      const keyElement = document.getElementById("filter-key");
      const key = keyElement.value;
      const valueElement = document.getElementById("filter-value");
      const value = valueElement.value;
      if (key === "" || value === "") {
        alert("Fill an empty field");
        return;
      }
      let excludedData = data.data.filter(
        (obj) =>
          obj[key] !== undefined &&
          ((typeof obj[key] === "string" &&
            obj[key].toUpperCase().includes(value.toUpperCase())) ||
            (typeof obj[key] === "boolean" && obj[key].toString() === value) ||
            (typeof obj[key] === "number" && obj[key] === parseInt(value)))
      );
      if (key === "disabled" && value === "true") {
        excludedData = excludedData.filter((obj) => obj.disabled === true);
      } else if (key === "disabled" && value === "false") {
        excludedData = excludedData.filter((obj) => obj.disabled === false);
      }

      for (let i = 0; i < excludedData.length; i++) {
        const index = data.data.indexOf(excludedData[i]);
        if (index > -1) {
          data.data.splice(index, 1);
        }
      }

      keyElement.value = "";
      valueElement.value = "";
      displayData(data.data, container);
    }

    function sortData() {
      const keyElement = document.getElementById("sort-key");
      const key = keyElement.value;

      let filteredData;
      if (key === "rating") {
        filteredData = data.data.filter((item) => item.rating !== undefined);
      } else {
        filteredData = data.data;
      }

      const sortedData = filteredData.sort((a, b) =>
        a[key] > b[key] ? 1 : -1
      );

      displayData(sortedData, container);
    }

    filterBtn.addEventListener("click", filterData);
    sortBtn.addEventListener("click", sortData);

    const excludeBtn = document.getElementById("exclude-btn");
    excludeBtn.addEventListener("click", excludeData);
  })
  .catch((error) => console.log(error));

function displayData(data) {
  const container = document.getElementById("data-container");
  container.innerHTML = "";
  data.map(({ name, email, rating, disabled }) => {
    const div = document.createElement("div");
    let markup = `<b>Name:</b> ${name}, <b>Email:</b> ${email}`;
    if (rating !== undefined || disabled !== undefined) {
      markup += `, <b>Rating:</b> ${rating}`;
      markup += `, <b>Disabled:</b> ${disabled}`;
    }
    div.innerHTML = markup;
    container.appendChild(div);
  });
  return container;
}
