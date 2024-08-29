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
    const aircraftRegister = loadPlanes();
    console.log(aircraftRegister);
    const aircraftList = document.getElementById('aircraftList');
    aircraftList.innerHTML = '';

    aircraftRegister.forEach((status, registration) => {
        const aircraftItem = document.createElement('div');
        aircraftItem.className = 'aircraft-item';

        const regSpan = document.createElement('span');
        regSpan.textContent = registration;
        aircraftItem.appendChild(regSpan);

        const statusActionContainer = document.createElement('div');
        statusActionContainer.className = 'status-action-container';

        const dotSpan = document.createElement('span');
        dotSpan.className = 'dot';
        dotSpan.classList.add(status === 'online' ? 'online' : 'offline');
        statusActionContainer.appendChild(dotSpan);

        aircraftItem.appendChild(statusActionContainer);
        aircraftList.appendChild(aircraftItem);
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


