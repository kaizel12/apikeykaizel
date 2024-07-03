const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const router = express.Router();

router.post('/jadwaltv', async (req, res) => {
    try {
        const { channel } = req.body;
        if (!channel) throw 'Penggunaan: channel harus disertakan';

        const jadwaltv = async (channel) => {
            return new Promise(async (resolve, reject) => {
                let stasiun = [
                    "rcti", "nettv", "antv", "gtv", "indosiar", "inewstv",
                    "kompastv", "metrotv", "mnctv", "rtv", "sctv",
                    "trans7", "transtv", "tvone", "tvri"
                ];

                let isist = "*Available channels* :\n\n";
                for (let i = 0; i < stasiun.length; i++) {
                    isist += `*➣*  ${stasiun[i]}\n`;
                }

                try {
                    const { data } = await axios.get(`https://www.jadwaltv.net/channel/${channel}`);
                    const $ = cheerio.load(data);
                    let isitable1 = [];
                    let isitable2 = [];

                    $("div > div > table:nth-child(3) > tbody > tr").each((i, result) => {
                        isitable1.push({
                            jam: result.children[0].children[0].data,
                            tayang: result.children[1].children[0].data,
                        });
                    });

                    $("div > div > table:nth-child(5) > tbody > tr").each((i, result) => {
                        isitable2.push({
                            jam: result.children[0].children[0].data,
                            tayang: result.children[1].children[0].data,
                        });
                    });

                    const semuatable = [...isitable1, ...isitable2];
                    let daftartay = `*Menampilkan daftar tayang channel ${channel}*\n\n`;
                    for (let i = 0; i < semuatable.length; i++) {
                        daftartay += `${semuatable[i].jam}  ${semuatable[i].tayang}\n`;
                    }

                    resolve(daftartay);
                } catch (e) {
                    resolve(isist);
                }
            });
        };

        const result = await jadwaltv(channel);
        res.json({ channel, schedule: result });
    } catch (error) {
        console.error('Error fetching TV schedule:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
