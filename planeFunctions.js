import {getHelicopterData} from "./getHelicopterData.js";

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



