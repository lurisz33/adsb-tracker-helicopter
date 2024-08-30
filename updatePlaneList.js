import { loadPlanes, removeAircraft, getPlaneOnlineStatus, addPlane } from "./planeFunctions.js";
import { getRescueHelicopterData } from "./getRescueHelicopterData.js";
import { isHelicopter } from "./planeFunctions.js";

const rescueProvidersLogoPaths = [
    { name: 'Schweiz.Luft-Ambulanz AG (REGA)', logo: './assets/regaLogo.svg' },
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

        // Add helicopter or plane icon
        const aircraftTypeSpan = document.createElement('span');
        aircraftTypeSpan.className = 'aircraft-type-icon';
        const aircraftTypeIcon = document.createElement('img');
        aircraftTypeIcon.src = isHelicopter(registration) ? './assets/helicopter.svg' : './assets/plane.svg';
        aircraftTypeIcon.alt = isHelicopter(registration) ? 'Helicopter Icon' : 'Plane Icon';
        aircraftTypeIcon.className = 'aircraft-icon';
        aircraftTypeSpan.appendChild(aircraftTypeIcon);
        aircraftItem.appendChild(aircraftTypeSpan);

        const logoSpan = document.createElement('span');
        logoSpan.className = 'operator-logo-container';
        const logoSrc = getLogoForRegistration(registration);
        if (logoSrc) {
            const logo = document.createElement('img');
            logo.src = logoSrc;
            logo.alt = 'Operator Logo';
            logo.className = 'operator-logo';
            logoSpan.appendChild(logo);
        } else {
            const placeholder = document.createElement('div');
            placeholder.className = 'operator-logo-placeholder';
            logoSpan.appendChild(placeholder);
        }
        aircraftItem.appendChild(logoSpan);

        const regSpan = document.createElement('span');
        regSpan.textContent = registration;
        aircraftItem.appendChild(regSpan);

        const statusActionContainer = document.createElement('div');
        statusActionContainer.className = 'status-action-container';

        const dotSpan = document.createElement('span');
        dotSpan.className = 'dot';
        dotSpan.classList.add(status === 'online' ? 'online' : 'offline');
        statusActionContainer.appendChild(dotSpan);

        const removeButton = document.createElement('button');
        removeButton.className = 'remove-button';
        removeButton.innerHTML = `<img src="./assets/delete.svg" alt="Remove" class="remove-icon">`;
        removeButton.addEventListener('click', () => {
            removeAircraft(registration);
            updatePlaneList();
        });
        statusActionContainer.appendChild(removeButton);

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
function getLogoForRegistration(registration) {
    const rescueHelicopter = rescueHelicopters.find(heli => heli.registration === registration);
    if (rescueHelicopter) {
        const providerLogo = rescueProvidersLogoPaths.find(provider => provider.name === rescueHelicopter.operator);
        return providerLogo ? providerLogo.logo : null;
    }
    return null;
}


