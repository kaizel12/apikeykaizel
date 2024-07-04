const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/simsimi", async (req, res) => {
  const prompt = req.query.prompt;
  if (!prompt) {
    return res.status(400).json({
      status: 400,
      message: "Masukkan Prompt!"
    });
  }

  try {
    const response = await askSimsimi(prompt);
    res.status(200).json({ message: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Terjadi kesalahan dalam memproses permintaan."
    });
  }
});

module.exports = router;

async function askSimsimi(text) {
  const url = 'https://simsimi.vn/web/simtalk';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    Accept: 'application/json, text/javascript, */*; q=0.01',
    'X-Requested-With': 'XMLHttpRequest',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36',
    Referer: 'https://simsimi.vn/'
  };

  try {
    const response = await axios.post(url, `text=${encodeURIComponent(text)}&lc=id`, { headers });
    return response.data.success;
  } catch (error) {
    console.error('Error asking SimSimi:', error);
    throw error;
  }
}

// Contoh penggunaan
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
