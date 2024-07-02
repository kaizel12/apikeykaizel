const express = require('express');
const axios = require('axios');
const router = express.Router();

// Array of Ronaldo images URLs
const data = [
    {"url":"https://telegra.ph/file/d8c6442ec60097992ec71.jpg"},
    {"url":"https://telegra.ph/file/6acb9e0bfe2066313b3cc.jpg"},
    {"url":"https://telegra.ph/file/595c694c52a98fd91db28.jpg"},
    {"url":"https://telegra.ph/file/22007b5cf489d4f0aed88.jpg"},
    {"url":"https://telegra.ph/file/7c580d7538766667db619.jpg"},
    {"url":"https://telegra.ph/file/ced306d572faaa2bc6354.jpg"},
    {"url":"https://telegra.ph/file/749007d2e5de11e9efbc5.jpg"},
    {"url":"https://telegra.ph/file/11143983af7aefaf42c9c.jpg"},
    {"url":"https://telegra.ph/file/a8a075dcb2acdebdba4dd.jpg"},
    {"url":"https://telegra.ph/file/483ccad1ace9676181cb9.jpg"},
    {"url":"https://telegra.ph/file/5fdc36fb3c545b468c81c.jpg"},
    {"url":"https://telegra.ph/file/70f4db29c1cf3bec36c53.jpg"},
    {"url":"https://telegra.ph/file/13c4a76d8aeb906e067c2.jpg"},
    {"url":"https://telegra.ph/file/1b1447d7b021ba96f13af.jpg"},
    {"url":"https://telegra.ph/file/9310c0527a057f33a7441.jpg"},
    {"url":"https://telegra.ph/file/8fa142f3ff0edeb58b2f2.jpg"},
    {"url":"https://telegra.ph/file/80ea46f52c678dc64736b.jpg"},
    {"url":"https://telegra.ph/file/47d77b00afa5951668709.jpg"},
    {"url":"https://telegra.ph/file/7729fa8af5cb4bce9e2b8.jpg"},
    {"url":"https://telegra.ph/file/dce5af1fe1d8129801e1b.jpg"},
    {"url":"https://telegra.ph/file/a704f2caea4d2e27e7fba.jpg"},
    {"url":"https://telegra.ph/file/2a1ef60de08a790003e88.jpg"},
    {"url":"https://telegra.ph/file/b6f0792f222a111c4951f.jpg"},
    {"url":"https://telegra.ph/file/2fd22b371c05881ea2a5d.jpg"},
    {"url":"https://telegra.ph/file/791337612fd65312dccba.jpg"},
    {"url":"https://telegra.ph/file/a19748b5d9f5dc788931b.jpg"},
    {"url":"https://telegra.ph/file/f1fcac55c7e5af3ee8acf.jpg"},
    {"url":"https://telegra.ph/file/bcb8d1db666018365f37a.jpg"},
    {"url":"https://telegra.ph/file/fb6e8f78ab2d6bc880705.jpg"},
    {"url":"https://telegra.ph/file/d8b7bdde47e180cfab35d.jpg"},
    {"url":"https://telegra.ph/file/876d3a0165aafa81ecae6.jpg"},
    {"url":"https://telegra.ph/file/9330d2f58278de8908557.jpg"},
    {"url":"https://telegra.ph/file/60f069fbfdc830b052498.jpg"},
    {"url":"https://telegra.ph/file/8543cbba1d4cc880688b3.jpg"},
    {"url":"https://telegra.ph/file/24dda746528e84070c456.jpg"},
    {"url":"https://telegra.ph/file/6c603e65244a346ec3a4a.jpg"},
    {"url":"https://telegra.ph/file/0b8a7d5ef5943b624ff0b.jpg"},
    {"url":"https://telegra.ph/file/6c4d70123de011cb35582.jpg"},
    {"url":"https://telegra.ph/file/c4e408b564dc89d42b20d.jpg"},
    {"url":"https://telegra.ph/file/74001e9ccbb88cda82bb4.jpg"},
    {"url":"https://telegra.ph/file/dfd42e18915c7efb4a265.jpg"},
    {"url":"https://telegra.ph/file/9cca87045d5fc695cf93e.jpg"},
    {"url":"https://telegra.ph/file/fa9c19637c864b7148d62.jpg"},
    {"url":"https://telegra.ph/file/f3d1dfe698e9cbbccc3e9.jpg"},
    {"url":"https://telegra.ph/file/b03b23ba9a16e5813aa79.jpg"},
    {"url":"https://telegra.ph/file/a399708f316317645fb45.jpg"},
    {"url":"https://telegra.ph/file/ab178241b1ddc592addec.jpg"},
    {"url":"https://telegra.ph/file/e7aef132c0405436b4faf.jpg"},
    {"url":"https://telegra.ph/file/a8c76642ac0112a2a4b6d.jpg"},
    {"url":"https://telegra.ph/file/efd37d28af9a75b9e8cd7.jpg"},
    {"url":"https://telegra.ph/file/af7e31abdadae4a1b0d63.jpg"},
    {"url":"https://telegra.ph/file/d7b2dded354180e145d4a.jpg"},
    {"url":"https://telegra.ph/file/0e86909e82a3912682e4a.jpg"},
    {"url":"https://telegra.ph/file/0f9bddf9f1630c8226ec7.jpg"},
    {"url":"https://telegra.ph/file/1d9125970335f856d1fb8.jpg"},
    {"url":"https://telegra.ph/file/753083e1fcd9b5fda2916.jpg"},
    {"url":"https://telegra.ph/file/962db5f7bcecaa70771bb.jpg"},
    {"url":"https://telegra.ph/file/4d45c14d2d9454b976284.jpg"},
    {"url":"https://telegra.ph/file/cc217c31d784f88262098.jpg"},
    {"url":"https://telegra.ph/file/31008e9e1fad3c83c2c66.jpg"},
    {"url":"https://telegra.ph/file/016888c2def09ad838b72.jpg"},
    {"url":"https://telegra.ph/file/796a0d09dfc9b88f88aa9.jpg"},
    {"url":"https://telegra.ph/file/faa9bd537bc566c1f01bd.jpg"},
    {"url":"https://telegra.ph/file/5888fcd438d5b54c131b2.jpg"},
    {"url":"https://telegra.ph/file/ae18a1c0fb58c148fcc45.jpg"},
    {"url":"https://telegra.ph/file/c3231d74f06359276a7b1.jpg"}
];

// Endpoint to get a random Ronaldo image
router.get('/shiroko', async (req, res) => {
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
