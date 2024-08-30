import {initMap} from "./initMap.js";
import {centerOnSwitzerland} from "./centerOnSwitzerland.js";
import {initializeRescueHelicopters, updatePlaneList} from "./updatePlaneList.js";
import {addPlane, loadPlanes, removeAircraft, loadHelicopterData} from './planeFunctions.js';
import {updateAircraftPositions} from "./updateAircraftPositions.js";
import {delay} from "./delay.js";
import {getHelicopterData} from "./getHelicopterData.js";
import {clearAllPlanes} from "./planeFunctions.js";
import {addRescueProviderFunctions} from './chooseRescueProvider.js';

const map = initMap();
let markers = {};
let updateInterval;
let state = 'updating';

async function updateSite() {
    try {
        await updateAircraftPositions(map, markers);
        updatePlaneList();
    } catch (error) {
        console.error('Error updating positions:', error);
    }
}

document.getElementById('addPlaneForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const reg = document.getElementById('reg').value.toUpperCase();
    addPlane(reg);
    updatePlaneList();
    document.getElementById('reg').value = '';
});

document.getElementById('centerSwitzerlandBtn').addEventListener('click', () => centerOnSwitzerland(map));

// document.getElementById('resetPlanes').addEventListener('click', function () {
//     clearAllPlanes();
//     updatePlaneList();
// })

document.addEventListener('DOMContentLoaded', async (event) => {
    centerOnSwitzerland(map);
    await loadHelicopterData();
    await getHelicopterData();
    await initializeRescueHelicopters();
    await addRescueProviderFunctions();
    await stateMachine();
});

async function stateMachine() {
    switch (state) {
        case 'timeout':
            await delay(2000);
            state = 'updating';
            await stateMachine();
            break;
        case 'updating':
            await updateSite();
            state = 'timeout';
            await stateMachine();
            break;
    }
}
