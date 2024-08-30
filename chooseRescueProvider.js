import { addMultipleAircraftFromProvider, removeMultipleAircraftFromProvider } from "./planeFunctions.js";
import { updatePlaneList } from "./updatePlaneList.js";

export async function addRescueProviderFunctions() {
    const rescueProviders = document.querySelectorAll('#rescueProviderList div');

    rescueProviders.forEach(provider => {
        provider.addEventListener('click', async function () {
            this.classList.toggle('active');
            const providerId = this.id;
            const isActive = isProviderActive(providerId);

            switch (providerId) {
                case 'aaa':
                    await handleProviderClick('aaa', isActive);
                    break;
                case 'airGlaciers':
                    await handleProviderClick('airGlaciers', isActive);
                    break;
                case 'airZermatt':
                    await handleProviderClick('airZermatt', isActive);
                    break;
                case 'rega':
                    await handleProviderClick('rega', isActive);
                    break;
            }
            updatePlaneList();
        });
    });
}

async function handleProviderClick(providerId, isActive) {
    if (isActive) {
        await addMultipleAircraftFromProvider(providerId);
    } else {
        await removeMultipleAircraftFromProvider(providerId);
    }
}

export function isProviderActive(providerId) {
    const providerElement = document.getElementById(providerId);
    return providerElement.classList.contains('active');
}