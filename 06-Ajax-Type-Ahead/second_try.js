const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

axios.get(endpoint)
.then((res) => {
  const data = res.data;
  return data;
})
.then((data) => {
  cities.push(...data); //inserting data into the 'cities' array
});

function findMatches(wordToMatch, arrayName) {
  let matchedArray = arrayName.filter((place) => {
    const regexp = new RegExp(wordToMatch, 'gi');
    return place.city.match(regexp) || place.state.match(regexp);
  });
  return matchedArray;
}

function displayMatches() {
  // console.log(this.value);
  const arrayToDisplay = findMatches(this.value, cities);
  let html = arrayToDisplay.map((place) => {
    let regexp = new RegExp(this.value, 'gi');
    let cityName = place.city.replace(regexp, `<span class='hl'>${this.value}</span>`);
    let stateName = place.state.replace(regexp, `<span class='hl'>${this.value}</span>`);
    let population = place.population;
    let rank = place.rank;
    let growth = place.growth_from_2000_to_2013;

    let growthColor;
    if (growth.includes("-")){
      growthColor = "growth-negative";
    } else {
      growthColor = "growth-positive";
    }

    return `
      <li>
        <div class="details">
          <h3 class="city-state">${cityName}, ${stateName}</h3>
          <p class="population">Population : <span>${population}</span></p>
          <p class="growth">Growth : <span class="${growthColor}">${growth}</span></p>
        </div>
        <div class="rank">
          <p>#${rank}</p>
        </div>
      </li>
    `;
  }).join('');

  suggestions.innerHTML = html;
}

let searchInputBar = document.querySelector("#search-bar");
searchInputBar.addEventListener("keyup", displayMatches);
searchInputBar.addEventListener("change", displayMatches);

let suggestions = document.querySelector(".suggestions");

