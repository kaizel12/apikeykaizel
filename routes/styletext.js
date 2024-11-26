const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const router = express.Router();

/**
 * Endpoint untuk mengubah teks menggunakan berbagai gaya font
 * Parameter: teks (query string)
 */
router.get("/api/styletext", async (req, res) => {
  const teks = req.query.teks;
  if (!teks) {
    return res.status(400).json({
      status: 400,
      message: "Masukkan teks untuk diubah gayanya!",
    });
  }

  try {
    const hasil = await styletext(teks);
    res.status(200).json({
      status: 200,
      message: "Berhasil",
      results: hasil,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: error.message || "Terjadi kesalahan",
    });
  }
});

/**
 * Fungsi untuk mengubah teks menggunakan berbagai gaya font
 * @param {string} teks - Teks yang ingin diubah
 * @returns {Promise<Array>} Array objek hasil perubahan teks
 */
function styletext(teks) {
  return new Promise((resolve, reject) => {
    if (!teks.trim()) {
      return reject(new Error("Teks tidak boleh kosong"));
    }

    axios
      .get("http://qaz.wtf/u/convert.cgi?text=" + encodeURIComponent(teks))
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const hasil = [];

        $("table > tbody > tr").each(function (a, b) {
          hasil.push({
            name: $(b).find("td:nth-child(1) > span").text(),
            result: $(b).find("td:nth-child(2)").text().trim(),
          });
        });

        resolve(hasil);
      })
      .catch((error) =>
        reject(new Error("Gagal mengambil data: " + error.message))
      );
  });
}

module.exports = router;
