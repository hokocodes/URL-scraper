const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// ... Rest of the code ...



app.get('/scrape', async (req, res) => {
  const url = req.query.url;
  
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    // Use Cheerio selectors to scrape data from the webpage
    console.log($);
    // Example: Get the page title
    const pageTitle = $('title').text();
    
    res.send({ title: pageTitle });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error scraping the URL.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// hoko