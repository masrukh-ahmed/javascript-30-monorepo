const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

async function getCityStateData() {
  let data = await axios.get(endpoint);
  let cityStateData = await data.data;
  cities.push(...cityStateData); //concept of destructuring using the spread operator
}
getCityStateData(); //calling the function to insert city/state data into 'cities' array

function findMatches(wordToMatch, arrayName) {
  return arrayName.filter(place => {
    const regExp = new RegExp(wordToMatch, 'gi');
    return place.city.match(regExp) || place.state.match(regExp);
  })
}

function displayMatches() {
  const arrayData = findMatches(this.value, cities);
  const html = arrayData.map(place => {
    const regExp = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regExp, `<span class = 'hl'>${this.value}</span>`);
    const stateName = place.state.replace(regExp, `<span class = 'hl'>${this.value}</span>`);
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${place.population}</span>
      </li>
    `;
  });
  suggestions.innerHTML = html.join('');
}

let searchBox = document.querySelector(".search");
searchBox.addEventListener("change", displayMatches);
searchBox.addEventListener("keyup", displayMatches);

let suggestions = document.querySelector(".suggestions");


