import {getHelicopterData} from "./getHelicopterData.js";

const rescueOrganisations = ['Air-Glaciers SA', 'Air Zermatt AG', 'Lions Air Skymedia AG', 'Schweiz.Luft-Ambulanz AG'];

export async function getRescueHelicopterData() {
    try {
        const allHelicopters = await getHelicopterData();

        const filteredHelicopters = allHelicopters.filter(helicopter =>
            rescueOrganisations.some(org =>
                helicopter.operator.toLowerCase().includes(org.toLowerCase())
            )
        );
        //console.log('All helicopters:', allHelicopters.length);
        //console.log('Filtered rescue helicopters:', filteredHelicopters.length);

        filteredHelicopters.forEach(helicopter => {
            //console.log(`${helicopter.registration} - ${helicopter.model} ${helicopter.operator}`);
        });

        return filteredHelicopters;
    } catch (error) {
        console.error('Error in getRescueHelicopterData:', error);
        return [];
    }
}