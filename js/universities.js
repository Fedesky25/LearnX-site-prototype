initNavToggle(document.querySelector('main'));
const uniList = document.querySelector('.uni-list');
const map = L.map('map', {
    zoomControl: false,
    maxBounds: [[90, 186],[-80,-174]]
}).setView([20, 6], 2);
const tile = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 2,
    maxZoom: 18,
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(map);
L.control.zoom({position: 'bottomright'}).addTo(map);
const icon = L.icon({
    iconUrl: './img/pinPoint.svg',
    iconSize: [25, 30.25],
    iconAnchor: [12.5,30.25],
    popupAnchor: [0,-30.3]
})
fetch('./json/istitutes.json')
.then(file=>{
    file.json()
    .then(data=>{
        data.forEach(element => {
            const marker = L.marker([element.latitude, element.longitude], {title: element.name, icon: icon}).addTo(map);
            marker.bindPopup(`<b>${element.name}</b><br>${element.country}`)
            const li = document.createElement('li');
            li.classList.add('istitute');
            li.innerHTML = `<h3 class="istitute__title" data-country="${element.country}">${element.name}</h3>
                            <p class="istitute__desc">${element.description}</p>
                            <div class="istitute__links">
                                <a href="interviews.html#i-${element.id}" class="btn--alt">LearnX interviews</a>
                                <a href="${element.website}" target="_blank" rel="noopener" class="btn">Their website</a>
                            </div>
                            <button class="istitute__pin" title="See ${element.name} on the map" onclick="moveView(${element.latitude}, ${element.longitude})">
                                <svg viewBox="0 0 10 12.0711"><circle cx="5" cy="5" r="5" fill="currentColor"/><polygon points="5,5 8.535533906,8.535533906 5,12.07106781 1.464466094,8.535533906" fill="currentColor"/><circle cx="5" cy="5" r="1.75" fill="white"/></svg>
                            </button>`
            uniList.appendChild(li);
        });
    })
    .catch(err=>{console.log(err); alert('Something went wrong');})
})
.catch(err=>{console.log(err); alert('Something went wrong');});

if(window.innerWidth < 900) {
    const mapContainer = document.querySelector('.map-container');
    window.addEventListener('hashchange', ()=>{
        if(window.location.hash == '#map') mapContainer.classList.add('show');
        else mapContainer.classList.remove('show');
    })
}

function moveView(lat, lng) {
    const LatLng = [lat,lng]
    if(map.getCenter().distanceTo(LatLng) < 5000) map.setView(LatLng, 15);
    else map.flyTo(LatLng, 15, {duration: 2});
    if(window.innerWidth < 900) window.location.hash = 'map';
}

const countryBounds = {
    world: L.latLngBounds([90, 186],[-80,-174]),
    qatar: L.latLngBounds([24.459986, 52.231436],[26.251514, 50.310799]),
    usa: L.latLngBounds([50.100746, -129.380318],[24.410405, -66.517903]),
    korea: L.latLngBounds([33.975230, 125.124610],[38.774008, 130.098437])
}
document.getElementById('country').addEventListener('change', e=>{
    if(!countryBounds.hasOwnProperty(e.target.value)) return;
    const bounds = countryBounds[e.target.value];
    map.setMaxBounds(countryBounds.world).flyToBounds(bounds, {duration: 1});
    setTimeout(()=>{
        map.setMaxBounds(bounds);
    }, 1001);

    // should ask theb server for only the istitutes 
})