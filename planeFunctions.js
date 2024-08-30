import {getHelicopterData} from "./getHelicopterData.js";
import {getRescueHelicopterData} from "./getRescueHelicopterData.js";

let helicopterRegistrations = new Set();
let aircraftRegister = new Map();

let helicopterRegistrationsLoaded = false;

export function loadPlanes() {
    return aircraftRegister;
}

export function removeAircraft(registration) {
    if (aircraftRegister.has(registration)) {
        aircraftRegister.delete(registration);
    }
}

export function getPlaneOnlineStatus(registration) {
    if (aircraftRegister.has(registration)) {
        return aircraftRegister.get(registration);
    }
}

export function addPlane(registration) {
    if (!aircraftRegister.has(registration)) {
        aircraftRegister.set(registration, 'offline');
    }
}

export async function addMultipleAircraftFromProvider(providerId) {
    const rescueHelicopters = await getRescueHelicopterData();
    const operatorName = getOperatorName(providerId);
    rescueHelicopters.forEach(helicopter => {
        if (helicopter.operator === operatorName) {
            addPlane(helicopter.registration);
        }
    });
}

export async function removeMultipleAircraftFromProvider(providerId) {
    const rescueHelicopters = await getRescueHelicopterData();
    const operatorName = getOperatorName(providerId);
    rescueHelicopters.forEach(helicopter => {
        if (helicopter.operator === operatorName) {
            removeAircraft(helicopter.registration);
        }
    });
}

function getOperatorName(providerId) {
    switch(providerId) {
        case 'aaa':
            return 'Lions Air Skymedia AG';
        case 'airGlaciers':
            return 'Air-Glaciers SA';
        case 'airZermatt':
            return 'Air Zermatt AG';
        case 'rega':
            return 'Schweiz.Luft-Ambulanz AG (REGA)';
        default:
            return '';
    }
}

export async function loadHelicopterData() {
    if (!helicopterRegistrationsLoaded) {
        const data = await getHelicopterData();
        data.forEach(helicopter => helicopterRegistrations.add(helicopter.registration.toUpperCase()));
        console.log('Helicopter data loaded');
        helicopterRegistrationsLoaded = true;
    }
}

export function isHelicopter(registration) {
    return helicopterRegistrations.has(registration);
}

export function clearAllPlanes() {
    aircraftRegister.clear();
}



