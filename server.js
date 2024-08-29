const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = 3000;

app.get('/helicopter-registrations', async (req, res) => {
    try {
        const url = 'http://www.swissheli.com/heliakt.htm';
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        let helicopters = [];

        $('table tbody tr').each((index, element) => {
            const $tds = $(element).find('td');
            const registration = $tds.eq(0).text().trim();
            const model = $tds.eq(1).text().trim();
            const operator = $tds.eq(3).text().trim();

            if (registration) {
                // console.log(`Row ${index + 1}:`);
                // console.log(`Registration: ${registration}`);
                // console.log(`Type: ${secondCell}`);
                // console.log(`Owner: ${fourthCell}`);
                // console.log('-------------------');
                const currentHelicopter = new Helicopter(registration, model, operator);
                helicopters.push(currentHelicopter);
            }
        });

        //console.log(`Total helicopters found: ${helicopters.length}`);
        res.json(helicopters);
    } catch (error) {
        console.error('Error scraping the site:', error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

class Helicopter {
    constructor(registration, model, operator) {
        this.registration = registration;
        this.model = model;
        this.operator = operator;
    }
}

module.exports = Helicopter;