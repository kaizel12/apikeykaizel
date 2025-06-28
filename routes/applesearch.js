const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const router = express.Router();

const BASE_URL = 'https://music.apple.com/id/search?term=';

/**
 * Searches Apple Music for a given term.
 * @param {string} term The search term.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of search results.
 */
async function searchAppleMusic(term) {
  const url = `${BASE_URL}${encodeURIComponent(term)}`;

  try {
    // 1. Fetch the page
    const { data: html } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
      }
    });

    // 2. Parse with Cheerio
    const $ = cheerio.load(html);
    const results = [];

    // 3. Extract each grid item
    $('li.grid-item').each((_, li) => {
      const el = $(li);

      const link = el.find('a.click-action').attr('href');
      const title = el
        .find('[data-testid="top-search-result-title"] .top-search-lockup__primary__title')
        .text()
        .trim();
      const subtitle = el
        .find('[data-testid="top-search-result-subtitle"]')
        .text()
        .trim();
      // Get the first srcset from <source type="image/jpeg">
      const imgSrc = el
        .find('picture source[type="image/jpeg"]')
        .first()
        .attr('srcset')
        ?.split(' ')[0] || null;

      if (title && link) {
        results.push({ title, subtitle, link, image: imgSrc });
      }
    });

    return results;
  } catch (err) {
    console.error(`Error scraping "${term}":`, err.message);
    return []; // Return an empty array on error
  }
}

router.get("/api/apple", async (req, res) => {
  const term = req.query.term;

  if (!term) {
    return res.status(400).json({
      status: 400,
      message: "Please provide a search term!"
    });
  }

  try {
    const results = await searchAppleMusic(term);
    res.status(200).json({
      status: 200,
      results: results
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "An error occurred while searching Apple Music."
    });
  }
});

module.exports = router;