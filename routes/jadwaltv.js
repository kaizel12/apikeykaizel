const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const router = express.Router();

// Middleware untuk mem-parsing JSON bodies
router.use(express.json());

// Endpoint POST untuk /jadwaltv
router.post('/jadwaltv', async (req, res) => {
    try {
        const { channel } = req.body;
        if (!channel) throw 'Penggunaan: channel harus disertakan';

        const result = await fetchSchedule(channel);
        res.json({ channel, schedule: result });
    } catch (error) {
        console.error('Error fetching TV schedule:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint GET untuk /jadwaltv
router.get('/jadwaltv', async (req, res) => {
    try {
        const { channel } = req.query;
        if (!channel) throw 'Penggunaan: parameter channel harus disertakan';

        const result = await fetchSchedule(channel);
        res.json({ channel, schedule: result });
    } catch (error) {
        console.error('Error fetching TV schedule:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Fungsi untuk mengambil jadwal TV dari situs eksternal
const fetchSchedule = async (channel) => {
    try {
        const { data } = await axios.get(`https://www.jadwaltv.net/channel/${channel}`);
        const $ = cheerio.load(data);
        
        let schedule = [];
        $("div > div > table:nth-child(3) > tbody > tr").each((i, element) => {
            schedule.push({
                jam: $(element).find('td:nth-child(1)').text().trim(),
                tayang: $(element).find('td:nth-child(2)').text().trim()
            });
        });

        $("div > div > table:nth-child(5) > tbody > tr").each((i, element) => {
            schedule.push({
                jam: $(element).find('td:nth-child(1)').text().trim(),
                tayang: $(element).find('td:nth-child(2)').text().trim()
            });
        });

        return schedule;
    } catch (error) {
        console.error('Error fetching schedule:', error);
        return [];
    }
};

module.exports = router;
