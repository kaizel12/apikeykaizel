const express = require('express');
const axios = require('axios');
const router = express.Router();

// Array of Ronaldo images URLs
const data = [
"https://telegra.ph/file/15d864007a53b9d7591cb.jpg",
  "https://telegra.ph/file/9e9daebf1dd44368991af.jpg",
  "https://telegra.ph/file/c14b4d4b0755f6aa1141d.jpg",
  "https://telegra.ph/file/f37b6962d29ac9f1d51fa.jpg",
  "https://telegra.ph/file/24e217043c02eb3eae60d.jpg",
  "https://telegra.ph/file/d110fc31c492d2eabde3e.jpg",
  "https://telegra.ph/file/60d6486645762da37046d.jpg",
  "https://telegra.ph/file/ae483268bf630e3505080.jpg",
  "https://telegra.ph/file/e3ce82e512d242315a773.jpg",
  "https://telegra.ph/file/65213f197e2acff691dce.jpg",
  "https://telegra.ph/file/21bfea3640e80666395f7.jpg",
  "https://telegra.ph/file/7b8e56e517f0ff0f877ae.jpg",
  "https://telegra.ph/file/e26bc3bbf3f5aaa7a0a69.jpg",
  "https://telegra.ph/file/be74307a16a6ed59a0754.jpg",
  "https://telegra.ph/file/142acddfef2df68c71fe3.jpg",
  "https://telegra.ph/file/5a0c8e8063f24e4aa1845.jpg",
  "https://telegra.ph/file/bd177f5e77172c986bc66.jpg",
  "https://telegra.ph/file/0e6b04dfb1326c013d556.jpg",
  "https://telegra.ph/file/307eb33a6bdc7f0a63900.jpg",
  "https://telegra.ph/file/71c9cf80ed7317e614214.jpg",
  "https://telegra.ph/file/b1e88746d008c9d76741e.jpg",
  "https://telegra.ph/file/6a3e52fa1db855f883161.jpg",
  "https://telegra.ph/file/692e593eb8b4fbcf8eaf9.jpg",
  "https://telegra.ph/file/794ca8f217680204d094b.jpg",
  "https://telegra.ph/file/add38ec31c8d6fdb811c2.jpg"
    ]

// Endpoint to get a random Ronaldo image
router.get('/cosplay', async (req, res) => {
    try {
        // Get a random image URL from the data array
        const randomImage = data[Math.floor(Math.random() * data.length)].url;
        // Fetch the image data
        const imageResponse = await axios.get(randomImage, { responseType: 'arraybuffer' });
        // Set the response headers
        res.set('Content-Type', 'image/jpeg');
        res.send(imageResponse.data);
    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
