export function initMap() {
    const map = L.map('map').setView([47.3769, 8.5417], 7);  // Use Switzerland as center of map
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 20,
        minZoom: 1
    }).addTo(map);
    return map;
}
