export async function getHelicopterData() {
    const corsProxy = 'https://api.allorigins.win/raw?url=';
    const targetUrl = 'http://www.swissheli.com/heliakt.htm';

    try {
        const response = await fetch(corsProxy + targetUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const htmlText = await response.text();

        // Parse the HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');

        // Extract helicopter data
        const helicopters = [];
        const rows = doc.querySelectorAll('table tbody tr');

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length >= 4) {
                const registration = cells[0].textContent.trim();
                const model = cells[1].textContent.trim();
                const operator = cells[3].textContent.trim();

                if (registration) {
                    helicopters.push({ registration, model, operator });
                }
            }
        });

        // Clean the data
        const helicoptersCleaned = helicopters.map(helicopter => ({
            registration: helicopter.registration
                .replace(/[\n\/]/g, ' ')
                .replace(/\(2\)/g, '')
                .replace(/\s+/g, ' ')
                .trim(),
            model: helicopter.model
                .replace(/[\n\/]/g, ' ')
                .replace(/\(2\)/g, '')
                .replace(/\s+/g, ' ')
                .trim(),
            operator: helicopter.operator
                .replace(/[\n\/]/g, ' ')
                .replace(/\(2\)/g, '')
                .replace(/\s+/g, ' ')
                .trim()
        }));

        return helicoptersCleaned;
    } catch (error) {
        console.error('Error fetching helicopter data:', error);
        return [];
    }
}