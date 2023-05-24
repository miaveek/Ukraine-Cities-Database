const endpoint = 'https://raw.githubusercontent.com/miaveek/Ukraine-Cities-Database/main/UA-Cities.json';
const cities = [];
const searchInput = document.querySelector('.search');
const suggesstions = document.querySelector('.suggestions');

fetch(endpoint)
    .then(res => res.json())
    .then(data => cities.push(...data));

function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        const regex = new RegExp(`^${wordToMatch}`, 'gi')
        return place.city.match(regex) || place.admin_name.match(regex)
    })
}

function displayMatches() {
    const matchArr = findMatches(this.value, cities);
    const html = matchArr.map(place => {
        const regex = new RegExp(`^${this.value}`, 'gi');
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const admin_name = place.admin_name.replace(regex, `<span class="hl">${this.value}</span>`);
        return `
        <li>
            <span class="name">${cityName},${admin_name}</span>
            <span class="population">${place.population}</span>
        </li>
        `;

    }).join('');
    suggesstions.innerHTML = html;
}

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

