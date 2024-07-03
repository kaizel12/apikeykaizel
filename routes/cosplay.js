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
  "https://telegra.ph/file/add38ec31c8d6fdb811c2.jpg",
  "https://i.pinimg.com/originals/13/8f/a9/138fa9fab411166bb8c5523bf710ff42.jpg",
  "https://i.pinimg.com/564x/c3/11/9a/c3119aef29726b78b9f0509aa40ccb3b.jpg",
  "https://i.pinimg.com/originals/18/05/40/18054035c2adc989580043b4391e20af.jpg",
  "https://i.pinimg.com/736x/7c/0a/4b/7c0a4bd43596226b6311b8aae2b02408.jpg",
  "https://i.pinimg.com/originals/3d/fe/1d/3dfe1d00cff5b517d4eb56e5297abae9.jpg",
  "https://i.pinimg.com/originals/77/dd/ef/77ddefdd397d0730db97d848781e4df7.jpg",
  "https://i.pinimg.com/736x/43/d9/7d/43d97d69e6552e80da086cd91557c826.jpg",
  "https://i.pinimg.com/originals/e5/f2/86/e5f286ded660f38e8f4db73c8dfafba8.jpg",
  "https://i.pinimg.com/474x/9f/6f/71/9f6f7189691c533cd88ef656ce23bcbb.jpg",
  "https://i.pinimg.com/736x/0d/b8/44/0db844fa29b995dd699bfb9172fad779.jpg",
  "https://i.pinimg.com/736x/41/c3/49/41c349749124411f4b4c0b928eb46207.jpg",
  "https://i.pinimg.com/originals/c6/f7/bf/c6f7bfb44f0c964104ca36c8ee388f71.jpg",
  "https://i.pinimg.com/736x/1e/c5/c3/1ec5c36b3dfa5f1bef5847def89f8df6.jpg",
  "https://i.pinimg.com/originals/76/b6/1a/76b61aebdbc05551c9d8714014d7a30d.jpg",
  "https://i.pinimg.com/originals/3a/3e/fc/3a3efc8f03eb6122b0e04841f4177c2c.jpg",
  "https://i.pinimg.com/originals/77/ae/d7/77aed75e4e9f6bf317f8ca9e872d172a.jpg",
  "https://i.pinimg.com/originals/0d/d5/02/0dd5028b7f3e2e660b78aadb5ee1ecee.jpg",
  "https://i.pinimg.com/474x/9b/b2/d7/9bb2d7e9ca23a61c49c3a9428d6ccb3e.jpg",
  "https://i.pinimg.com/236x/c8/23/40/c82340db05d9ef61411a9d5837eeb2a3.jpg",
  "https://i.pinimg.com/736x/3c/2a/6b/3c2a6b131b6d1377ca31b1cee9eb5e5d.jpg",
  "https://i.pinimg.com/originals/cf/3c/2b/cf3c2bf2ce5ae2555dda6cadf11a67a7.jpg",
  "https://i.pinimg.com/236x/c3/16/e5/c316e5eb1367be33993d2266cc839062.jpg",
  "https://i.pinimg.com/originals/2c/8f/4b/2c8f4bf86a5b05df761cfd0244d37b4d.jpg",
  "https://i.pinimg.com/736x/b4/83/04/b48304a92e85c4eba37b82fdd5d08434.jpg",
  "https://i.pinimg.com/originals/75/b3/99/75b399a50c4ac54e49261dd6e0f81a5b.jpg",
  "https://i.pinimg.com/originals/dd/02/c5/dd02c512af2a70a9840ffab06eb74f4e.jpg",
  "https://i.pinimg.com/originals/53/0a/6d/530a6d47fa85f639587e0c7b54c4457d.jpg",
  "https://i.pinimg.com/originals/1c/eb/aa/1cebaa84d93f590f15933e78efc94f4b.jpg",
  "https://i.pinimg.com/736x/de/e9/68/dee968195b668d1bfd021cedc79cd5ab.jpg"
]

// Endpoint to get a random Ronaldo image
router.get('/cosplay', async (req, res) => {
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
