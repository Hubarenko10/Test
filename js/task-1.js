const btn = document.getElementById("convertBtn");
const resultElement = document.getElementById("result");
const fromInput = document.getElementById("fromUnit");
const toInput = document.getElementById("toUnit");
const distanceInput = document.getElementById("fromValue");

fetch("../task-1.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    btn.addEventListener("click", () => {
      convert(data);
    });
  })
  .catch((error) => console.error(error));

function convert(data) {
  const distance = parseFloat(distanceInput.value);
  if (isNaN(distance)) {
    alert("Please enter a valid distance.");
    return;
  }
  const from = fromInput.value;
  const to = toInput.value;
  if (!data[from] || !data[to]) {
    alert("Please select valid units.");
    return; 
  }
  let result = distance * data[from][to];
  resultElement.innerText = `${distance} ${from} is equal to ${result.toFixed(2)} ${to}.`;
}
