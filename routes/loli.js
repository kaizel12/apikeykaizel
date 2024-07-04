const express = require('express');
const axios = require('axios');
const router = express.Router();

// Array of Ronaldo images URLs
const data = [
  "https://telegra.ph/file/6c9c350e3b3ff7578082c.jpg",
  "https://telegra.ph/file/72c7ba657280ff4a19bce.jpg",
  "https://telegra.ph/file/ac23cea08e08930392e4c.jpg",
  "https://telegra.ph/file/7f6024d10f867b09c387c.jpg",
  "https://telegra.ph/file/fda24b7c6f22f5271a6a5.jpg",
  "https://telegra.ph/file/a4b59288deef8bfe68981.jpg",
  "https://telegra.ph/file/c4dc308a7809c3965f8c3.jpg",
  "https://telegra.ph/file/134842e255ae96816226c.jpg",
  "https://telegra.ph/file/acbd1a193110989164531.jpg",
  "https://telegra.ph/file/d66a0ee3531a058c7f422.jpg",
  "https://telegra.ph/file/33cf0ce372fafb04fbadf.jpg",
  "https://telegra.ph/file/97513ae5091d8a4f37690.jpg",
  "https://telegra.ph/file/016389801140d3a09e0a1.jpg",
  "https://telegra.ph/file/0a6e27530936f5dd18021.jpg",
  "https://telegra.ph/file/c35675018bc800f177d09.jpg",
  "https://telegra.ph/file/993892d50f84235819222.jpg",
  "https://telegra.ph/file/3d874c5a833f264576726.jpg",
  "https://telegra.ph/file/d88e36a42e45d926f758d.jpg",
  "https://telegra.ph/file/4d25fed72497620c50072.jpg",
  "https://telegra.ph/file/d97539f96b845ccc4178a.jpg",
  "https://telegra.ph/file/af9f9bd1cc9c7e56aeb48.jpg",
  "https://telegra.ph/file/83dd439c0edb7c9d58e6d.jpg",
  "https://telegra.ph/file/3d82e1f89acb9613172c8.jpg",
  "https://telegra.ph/file/23960bd8961c0f73caed2.jpg",
  "https://telegra.ph/file/c946d9d3e30514e4b7f30.jpg",
  "https://telegra.ph/file/7ace4dd8c924c98e2a271.jpg",
  "https://telegra.ph/file/8a0d830eac60806455c66.jpg",
  "https://telegra.ph/file/b2a5303295ad065254dca.jpg",
  "https://telegra.ph/file/590896a55be3553ec2495.jpg",
  "https://telegra.ph/file/79d300ac5edac08c614ca.jpg",
  "https://telegra.ph/file/12c0a547076b6be81bfa0.jpg",
  "https://telegra.ph/file/7a9ecd4fd5336b3a6cc1f.jpg",
  "https://telegra.ph/file/3e015a766c76e7063c1dc.jpg",
  "https://telegra.ph/file/f393827c38b362bd5001d.jpg",
  "https://telegra.ph/file/a4994e1579da8924ec938.jpg",
  "https://telegra.ph/file/d99dce740f3552c6e220b.jpg",
  "https://telegra.ph/file/8c3d40bf4f09e8b8b0575.jpg",
  "https://telegra.ph/file/036c29bd2d886fa23f2f1.jpg",
  "https://telegra.ph/file/2b724dca44a39fbaad8a6.jpg",
  "https://telegra.ph/file/88d1e43916d61200cb382.jpg",
  "https://telegra.ph/file/1a6bf1d7310a43ed8cb0b.jpg",
  "https://telegra.ph/file/8e2c513d49f910d83167d.jpg",
  "https://telegra.ph/file/693ddf27d24453b3ce2b8.jpg",
  "https://telegra.ph/file/271911000e021c6a7c968.jpg",
  "https://telegra.ph/file/76327141a6489034c44a3.jpg",
  "https://telegra.ph/file/090cb3a1a7626861073f6.jpg",
  "https://telegra.ph/file/87bfa432f3ccc0378aa63.jpg",
  "https://telegra.ph/file/1ff481f0b76530f6b720a.jpg",
  "https://telegra.ph/file/01f165fc9669989d64cdc.jpg",
  "https://telegra.ph/file/32abbb1fd58551002e12c.jpg",
  "https://telegra.ph/file/7cd4cd977396eaf961758.jpg",
  "https://telegra.ph/file/488c808171e6abfc107c8.jpg",
  "https://telegra.ph/file/0204679086e3f29587b2d.jpg",
  "https://telegra.ph/file/3a0ab0fa15ada0f68f6e3.jpg",
  "https://telegra.ph/file/6c29a82cb115f78b21c22.jpg",
  "https://telegra.ph/file/c2cd5f81eb2ab702fd452.jpg",
  "https://telegra.ph/file/d854f5483ab860bd03fd4.jpg",
  "https://telegra.ph/file/5023f7b74a275fcaae6ee.jpg",
  "https://telegra.ph/file/a72c79c4d8c03fc759d80.jpg",
  "https://telegra.ph/file/ced9a0f2162d05b1fd093.jpg",
  "https://telegra.ph/file/360816b594f74ccd6c153.jpg",
  "https://telegra.ph/file/80a37c74825938a2e233a.jpg",
  "https://telegra.ph/file/3b2fe6390f0b79ece95a4.jpg",
  "https://telegra.ph/file/44487e41730d7eeca3537.jpg",
  "https://telegra.ph/file/0dee24b3ca33381dc6c09.jpg",
  "https://telegra.ph/file/5d660aea6feb4ca4544a8.jpg"
];

// Endpoint to get a random Ronaldo image
router.get('/loli', async (req, res) => {
  try {
    // Get a random image URL from the data array
    const randomImage = data[Math.floor(Math.random() * data.length)];
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
