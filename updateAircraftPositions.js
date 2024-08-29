import { loadPlanes, isHelicopter, getPlaneOnlineStatus } from "./planeFunctions.js";

const switzerlandCenter = { lat: 46.8182, lon: 8.2275 };
const radiusNm = 250;

export async function updateAircraftPositions(map, markers) {
    const aircraftRegister = loadPlanes();
    const aircraftRegistrations = Set.from(aircraftRegister.keys());

    try {
        const response = await fetch(`https://api.adsb.one/v2/point/${SWITZERLAND_CENTER.lat}/${SWITZERLAND_CENTER.lon}/${RADIUS_NM}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        if (data && data.ac && Array.isArray(data.ac)) {
            const onlineAircraft = new Set();

            data.ac.forEach(aircraft => {
                const reg = aircraft.r ? aircraft.r.trim().toUpperCase() : null;
                if (reg && aircraftRegistrations.includes(reg)) {
                    onlineAircraft.add(reg);
                    aircraftRegister.set(reg, 'online');
                    if (aircraft.lat && aircraft.lon) {
                        const position = [aircraft.lat, aircraft.lon];
                        updateAircraftMarker(map, markers, reg, position, aircraft);
                    }
                }
            });

            aircraftRegistrations.forEach(reg => {
                if (!onlineAircraft.has(reg)) {
                    aircraftRegister.set(reg, 'offline');
                    removeAircraftMarker(map, markers, reg);
                }
            });

            Object.keys(markers).forEach(reg => {
                if (!aircraftRegister.has(reg)) {
                    removeAircraftMarker(map, markers, reg);
                }
            });
        }
    } catch (error) {
        console.error('Error fetching aircraft data:', error);
    }
}

function updateAircraftMarker(map, markers, reg, position, aircraft) {
    const isHelicopterIcon = isHelicopter(reg);
    const aircraftIcon = L.divIcon({
        html: `<div style="font-size: 60px; line-height: 90px; text-align: center;">${isHelicopterIcon ? '🚁' : '✈️'}</div>`,
        className: 'aircraft-icon',
        iconSize: [90, 90],
        iconAnchor: [45, 45]
    });

    if (markers[reg]) {
        markers[reg].setLatLng(position);
        markers[reg].setIcon(aircraftIcon);
    } else {
        markers[reg] = L.marker(position, { icon: aircraftIcon }).addTo(map);
    }

    markers[reg].bindPopup(`
        Registration: ${reg}<br>
        Callsign: ${aircraft.flight ? aircraft.flight.trim() : 'N/A'}<br>
        ICAO: ${aircraft.hex || 'N/A'}<br>
        Category: ${aircraft.category || 'N/A'}<br>
        Type: ${aircraft.t || 'N/A'}<br>
        Lat: ${aircraft.lat}<br>
        Lon: ${aircraft.lon}<br>
        Altitude: ${aircraft.alt_baro || 'N/A'} ft<br>
        Speed: ${aircraft.gs || 'N/A'} knots<br>
        Last seen: ${aircraft.seen || 'N/A'} seconds ago
    `);
}

function removeAircraftMarker(map, markers, reg) {
    if (markers[reg]) {
        map.removeLayer(markers[reg]);
        delete markers[reg];
    }
}