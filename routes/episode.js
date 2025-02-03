const express = require("express");
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const router = express.Router();

router.post("/episode", async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) throw "Penggunaan: Kirim 'id' dalam body request.";

        const url = `https://otakudesu.cloud/episode/${id}`;
        console.log(`Mengakses URL: ${url}`);  // Debug log untuk memastikan URL yang benar

        // Mengambil halaman
        let response = await fetch(url, {
            headers: { "User-Agent": "Mozilla/5.0" }
        });

        // Debugging status respons
        if (!response.ok) {
            console.error("Gagal mengambil halaman. Status:", response.status); // Status error
            throw `Gagal mengambil halaman: ${response.statusText}`;
        }

        let data = await response.text();
        const $ = cheerio.load(data);
        let downloads = [];

        // Debug log untuk memastikan data halaman telah dimuat
        console.log("Mengambil data dari halaman...");

        // Cek apakah elemen yang dicari ada
        const downloadList = $("div.download ul li");
        if (downloadList.length === 0) {
            console.error("Tidak ditemukan elemen download pada halaman.");
            throw "Tidak ditemukan elemen download pada halaman.";
        }

        downloadList.each((index, element) => {
            let quality = $(element).find("strong").text().trim();
            let links = [];

            $(element).find("a").each((i, el) => {
                let serverName = $(el).text().trim();
                let downloadLink = $(el).attr("href");

                // Memastikan URL valid dengan menghilangkan spasi atau karakter invalid
                if (downloadLink) {
                    downloadLink = downloadLink.replace(/\s+/g, ''); // Menghapus spasi
                    links.push({ serverName, downloadLink: encodeURIComponent(downloadLink) });
                }
            });

            if (quality && links.length > 0) {
                downloads.push({ quality, links });
            }
        });

        // Jika tidak ada download ditemukan
        if (downloads.length === 0) {
            console.error("Tidak ada link download ditemukan.");
            throw "Tidak ada link download ditemukan.";
        }

        res.json({ success: true, downloads });
    } catch (error) {
        console.error("Gagal episode data:", error);
        res.status(500).json({ success: false, error: error });
    }
});

module.exports = router;
