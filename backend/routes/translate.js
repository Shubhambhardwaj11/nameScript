const express = require("express");
const router = express.Router();
const axios = require("axios")

const transliterate = async (text, langCode) => {
    const response = await axios.get(
        `https://inputtools.google.com/request?text=${text}&itc=${langCode}&num=1`
      
    )
    if (response.data[0] !== 'SUCCESS') return text 
    return response.data[1][0][1][0]
}

router.post("/", async (req, res) => {
  try {
    const Search = require("../models/Search.js");
    const { name } = req.body;
    console.log(name);
    const [
      hindi,
      urdu,
      russian,
      tamil,
      bengali,
      arabic,
      nepali,
      greek,
      marathi,
      Sanskrit,
      punjabi,
      persian,
      gujarati,
      telugu,
      kannada,
      malayalam
    ] = await Promise.all([
      transliterate(name, 'hi-t-i0-und'),
      transliterate(name, 'ur-t-i0-und'),
      transliterate(name, 'ru-t-i0-und'),
      transliterate(name, 'ta-t-i0-und'),
      transliterate(name, 'bn-t-i0-und'),
      transliterate(name, 'ar-t-i0-und'),
      transliterate(name, 'ne-t-i0-und'),
      transliterate(name, 'el-t-i0-und'),
      transliterate(name, 'mr-t-i0-und'),
      transliterate(name, 'sa-t-i0-und'),
      transliterate(name, 'pa-t-i0-und'),
      transliterate(name, 'fa-t-i0-und'),
      transliterate(name, 'gu-t-i0-und'),
      transliterate(name, 'te-t-i0-und'),   // telugu
      transliterate(name, 'kn-t-i0-und'),   // kannada
      transliterate(name, 'ml-t-i0-und'),   // malayalam
    ]);

    const translations = {
      hindi: hindi,
      urdu: urdu,
      russian: russian,
      tamil: tamil,
      arabic: arabic,
      nepali: nepali,
      greek: greek,
      marathi: marathi,
      Sanskrit: Sanskrit,
      bengali: bengali,
      persian: persian,
      punjabi: punjabi,
      gujarati : gujarati,
      telugu : telugu,
      kannada : kannada,
      malayalam : malayalam,
    };

    const search = new Search({
      name: name,
      translations: translations,
    });

    await search.save();
    res.json({
      success: true,
      data: search,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
