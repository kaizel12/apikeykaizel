const express = require("express");
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const router = express.Router();

router.post("/episode", async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) throw "Penggunaan: Kirim 'id' dalam body request.";

        const url = `https://otakudesu.cloud/episode/${id}`;
        let response = await fetch(url, {
            headers: { "User-Agent": "Mozilla/5.0" }
        });

        if (!response.ok) throw "Gagal mengambil halaman";

        let data = await response.text();
        const $ = cheerio.load(data);
        let downloads = [];

        $("div.download ul li").each((index, element) => {
            let quality = $(element).find("strong").text().trim();
            let links = [];

            $(element).find("a").each((i, el) => {
                let serverName = $(el).text().trim();
                let downloadLink = $(el).attr("href");

                if (downloadLink) {
                    links.push({ serverName, downloadLink });
                }
            });

            if (quality && links.length > 0) {
                downloads.push({ quality, links });
            }
        });

        res.json({ success: true, downloads });
    } catch (error) {
        console.error("Gagal episode data:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

module.exports = router;
