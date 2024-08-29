import { loadPlanes, removeAircraft, getPlaneOnlineStatus, addPlane } from "./planeFunctions.js";
import { getRescueHelicopterData } from "./getRescueHelicopterData.js";

const rescueProviders = [
    { name: 'Schweiz.Luft-Ambulanz AG', logo: './assets/regaLogo.svg' },
    { name: 'Air Zermatt AG', logo: '/assets/airZermattLogo.png' },
    { name: 'Air-Glaciers SA', logo: './assets/airGlaciersLogo.png' },
    { name: 'Lions Air Skymedia AG', logo: './assets/aaaLogo.svg' }
];

let rescueHelicopters = [];

export function updatePlaneList() {
    const planes = loadPlanes();
    console.log(planes);
    const planeList = document.getElementById('planeList');
    planeList.innerHTML = '';

    planes.forEach((aircraft, index) => {
        const aircraftItem = document.createElement('div');
        aircraftItem.className = 'aircraft-item';

        const regSpan = document.createElement('span');
        regSpan.textContent = aircraft.registration || aircraft.reg;
        aircraftItem.appendChild(regSpan);

        const statusActionContainer = document.createElement('div');
        statusActionContainer.className = 'status-action-container';

        const dotSpan = document.createElement('span');
        dotSpan.className = 'dot';
        const isOnline = getPlaneOnlineStatus(aircraft.registration || aircraft.reg);
        dotSpan.classList.add(isOnline ? 'online' : 'offline');
        statusActionContainer.appendChild(dotSpan);

        aircraftItem.appendChild(statusActionContainer);
        planeList.appendChild(aircraftItem);
    });
}

function removeAllRescueHelicopters() {
    rescueHelicopters.forEach(heli => {
        removeAircraft(heli.registration);
    });
}

export async function initializeRescueHelicopters() {
    rescueHelicopters = await getRescueHelicopterData();
    removeAllRescueHelicopters();
}


