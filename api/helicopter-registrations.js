const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

module.exports = async (req, res) => {
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
                helicopters.push({ registration, model, operator });
            }
        });

        res.json(helicopters);
    } catch (error) {
        console.error('Error scraping the site:', error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
};