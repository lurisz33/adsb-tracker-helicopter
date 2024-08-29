export async function getHelicopterData() {
    try {
        const response = await fetch('http://localhost:3000/helicopter-registrations');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let helicoptersRaw = await response.json();

        // Clean the data
        const helicoptersCleaned = helicoptersRaw.map(helicopter => ({
            registration: helicopter.registration
                .replace(/[\n\/]/g, ' ')
                .replace(/\(2\)/g, '')
                .replace(/\s+/g, ' ')
                .trim(), // Trim leading and trailing spaces
            model: helicopter.model
                .replace(/[\n\/]/g, ' ')
                .replace(/\(2\)/g, '')
                .replace(/\s+/g, ' ')
                .trim(), // Trim leading and trailing spaces
            operator: helicopter.operator
                .replace(/[\n\/]/g, ' ')
                .replace(/\(2\)/g, '')
                .replace(/\s+/g, ' ')
                .trim() // Trim leading and trailing spaces
        }));

        return helicoptersCleaned;
    } catch (error) {
        console.error('Error fetching helicopter data:', error);
        return [];
    }
}