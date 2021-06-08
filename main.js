// get data from API
const getData = async () => {
  try {
    const response = await axios.get(apiUrl);
    data = response.data;
    displayData(data);
  } catch (error) {
    console.error(error);
  }
};

// display data
const displayData = (data) => {
  data.forEach((country) => {
    dataHtml += `
    <div class="country-wrapper">
          <div class="country-info">
            <span class="country-region"> ${country.region} </span>
            <p class="country-name">${country.name}</p>
          </div>
          <div class="country-flag">
            <img src=${country.flag} alt="country flag" />
          </div>
    </div>
    `;
  });

  countriesContainer.innerHTML = dataHtml;
};

// handle changing the region
const changeRegion = (event) => {
  const region = event.target.value;

  if (region === "all") {
    apiUrl = "https://restcountries.eu/rest/v2/all";
  } else {
    apiUrl = `https://restcountries.eu/rest/v2/region/${region}`;
  }

  // reset
  dataHtml = "";

  getData();
};

let apiUrl = "https://restcountries.eu/rest/v2/all";
let data = [];
const countriesContainer = document.getElementById("countries-container");
let dataHtml = "";

getData();

// get all radio inputs "regions"
const radioInputs = document.querySelectorAll("input[name='region']");

// add event listener to each radio
radioInputs.forEach((input) => {
  input.addEventListener("change", changeRegion);
});
