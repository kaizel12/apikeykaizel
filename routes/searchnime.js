const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const router = express.Router();

// Middleware untuk mem-parsing JSON bodies
router.use(express.json());

// Endpoint POST untuk /search
router.post('/searchnime', async (req, res) => {
    try {
        const { query } = req.body;
        if (!query) throw 'Penggunaan: parameter query harus disertakan';

        const result = await fetchSearchResults(query);
        res.json({ query, results: result });
    } catch (error) {
        console.error('Error fetching search results:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint GET untuk /search
router.get('/searchnime', async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) throw 'Penggunaan: parameter q harus disertakan';

        const result = await fetchSearchResults(q);
        res.json({ query: q, results: result });
    } catch (error) {
        console.error('Error fetching search results:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Fungsi untuk mengambil hasil pencarian dari situs eksternal
const fetchSearchResults = async (q) => {
    try {
        const { data } = await axios.get('https://v5.animasu.cc/?s=' + q);
        const $ = cheerio.load(data);
        
        let title = [];
        let status = [];
        let epsd = [];
        let type = [];
        let url = [];
        let img = [];
        let result = [];
        
        $('div.tt').each((a, b) => {
            let titleData = $(b).text().trim();
            title.push(titleData);
        });
        
        $('.bt .sb').each((a, b) => {
            let statsData = $(b).text();
            status.push(statsData);
        });
        
        $('.bt .epx').each((a, b) => {
            let epsData = $(b).text().trim();
            epsd.push(epsData);
        });
        
        $('.typez').each((a, b) => {
            let typeData = $(b).text().trim();
            type.push(typeData);
        });
        
        $('div.bsx a').each((a, b) => {
            let urlData = $(b).attr('href');
            url.push(urlData);
        });
        
        $('div.postbody img').each((a, b) => {
            let imgData = $(b).attr('data-src');
            img.push(imgData);
        });
        
        for (let i = 0; i < title.length; i++) {
            result.push({
                title: title[i],
                status: status[i],
                epsd: epsd[i],
                type: type[i],
                url: url[i],
                img: img[i]
            });
        }

        return result;
    } catch (error) {
        console.error('Error fetching search results:', error);
        return [];
    }
};

module.exports = router;
