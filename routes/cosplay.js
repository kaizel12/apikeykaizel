const express = require('express');
const axios = require('axios');
const router = express.Router();

// Array of Ronaldo images URLs
const data = [
    "https://i.pinimg.com/originals/78/54/43/7854439b63d5e66bdb139f8254c01562.jpg",
    "https://i.pinimg.com/originals/7a/3e/33/7a3e33e5e52afbe89d49d804b374e1c1.jpg",
    "https://i.pinimg.com/originals/99/f0/54/99f05436d0cfe83ae828339fcb15d543.jpg",
    "https://i.pinimg.com/originals/99/f1/12/99f112ddad6c62bdf6d1b0c3a5f47b92.jpg",
    "https://i.pinimg.com/originals/9a/5e/3f/9a5e3f5fbe7efae3b3b0f3e08e67a73d.jpg",
    "https://i.pinimg.com/originals/9b/11/36/9b1136ba05b4b76cbddc522cf42d2d85.jpg",
    "https://i.pinimg.com/originals/9c/a0/28/9ca0283070dbac18db70b5fe1949c24b.jpg",
    "https://i.pinimg.com/originals/9e/09/19/9e09197f9b61213c3de7202e0fc4b798.jpg",
    "https://i.pinimg.com/originals/9e/18/d3/9e18d38118f5af364b12f780ea48a25a.jpg",
    "https://i.pinimg.com/originals/a1/1a/8a/a11a8ad9b53aaf2c0ee8f3c3d8e9b1ec.jpg",
    "https://i.pinimg.com/originals/a2/9a/0d/a29a0d7fc5d5689c6f0f8b5424c97a3d.jpg",
    "https://i.pinimg.com/originals/a5/33/60/a53360e41e17494a8a60d48df8a0df91.jpg",
    "https://i.pinimg.com/originals/a5/8c/95/a58c95b3fd65fe178fbd320c0d1f3f95.jpg",
    "https://i.pinimg.com/originals/a8/0c/b3/a80cb30a7ab4b452ae110a75942d88a3.jpg",
    "https://i.pinimg.com/originals/a9/3d/22/a93d2291051685358aeedb330fbb5b2d.jpg",
    "https://i.pinimg.com/originals/a9/a5/cc/a9a5cc2af106a9f57131792e236e81d2.jpg",
    "https://i.pinimg.com/originals/aa/8b/21/aa8b21e6a4eb1b3d4b92961da5bfa729.jpg",
    "https://i.pinimg.com/originals/b0/5c/cd/b05ccd9a18f69c2bbec876c35c0ea5ba.jpg",
    "https://i.pinimg.com/originals/b1/13/5b/b1135b3937bb130b2c7355bc0e4419a4.jpg",
    "https://i.pinimg.com/originals/b5/65/5c/b5655c882f0eab6af1226ed97ee073c0.jpg",
    "https://i.pinimg.com/originals/b8/f3/3e/b8f33e1771b2cba53db4a05dddfac237.jpg",
    "https://i.pinimg.com/originals/c1/6f/eb/c16feb46dbdc149d8f9af468d0c13634.jpg",
    "https://i.pinimg.com/originals/c3/52/5a/c3525a194238e0a14f8b3151b3e2fe13.jpg",
    "https://i.pinimg.com/originals/c8/26/9e/c8269e20311f40d067c0bde3e0f73ac4.jpg",
    "https://i.pinimg.com/originals/d4/0d/48/d40d4864b396a0b81c7f9e137705ae87.jpg",
    "https://i.pinimg.com/originals/e1/25/bf/e125bf5583cb2851d3527f8d04ff29c3.jpg",
    "https://i.pinimg.com/originals/e4/f4/ff/e4f4ff2cf9cf2710a5e73cc444e30095.jpg",
    "https://i.pinimg.com/originals/e7/8e/2d/e78e2d65efba53d7c18b3b6a7e846c15.jpg",
    "https://i.pinimg.com/originals/e9/07/30/e90730da3d6d6353e9aaec9d07cabe35.jpg",
    "https://i.pinimg.com/originals/e9/a3/15/e9a3156e43794bba7e54d9e9dc73f1cf.jpg",
    "https://i.pinimg.com/originals/f2/61/21/f2612144e650e69e06d5dabe1ae3493e.jpg",
    "https://i.pinimg.com/originals/f3/20/10/f3201050cf3b66ffcd11e9899de5c48c.jpg",
    "https://i.pinimg.com/originals/f3/3d/88/f33d880486f83e0265a51b571207119d.jpg",
    "https://i.pinimg.com/originals/f3/64/0d/f3640d40f9dddc1b4170e6e556fb3270.jpg",
    "https://i.pinimg.com/originals/f3/84/43/f38443a511a6e6a4c82f93b5ea285a39.jpg",
    "https://i.pinimg.com/originals/f4/5e/df/f45edf2a2096cba616f8b2cf06c82695.jpg",
    "https://i.pinimg.com/originals/f4/d8/1e/f4d81e1e91b0a66b6d40788d86c50ad4.jpg",
    "https://i.pinimg.com/originals/f5/8f/6a/f58f6a85dbd3e18008a3c8e8472e1cd3.jpg",
    "https://i.pinimg.com/originals/f7/7d/f1/f77df15e2068d2720412dbeb1ec1686d.jpg",
    "https://i.pinimg.com/originals/fa/7d/d8/fa7dd8f20a888a0637b66a6250a8d0d6.jpg",
    "https://i.pinimg.com/originals/fb/64/11/fb6411a5dd8b87baba01d7a7c7d8be05.jpg",
    "https://i.pinimg.com/originals/fb/c4/3b/fbc43b405b26c6e0e96b80dc1a93547b.jpg"
];


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
