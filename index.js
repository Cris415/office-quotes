const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');

require('./models/Quote');
mongoose.connect(keys.mongoURI);

const app = express();

const Quote = mongoose.model('quote');

app.get('/api/season/:season/', async (req, res) => {
  const quotes = await Quote.find({ season: req.params.season });
  res.send(quotes);
});

app.get('/api/episode/:season/:episode', async (req, res) => {
  const quotes = await Quote.find({
    season: req.params.season,
    episode: req.params.episode
  });
  res.send(quotes);
});

app.get('/api/person/:person', async (req, res) => {
  const quotes = await Quote.find({ speaker: req.params.person });
  res.send(quotes);
});

app.get('/api/random-quote', async (req, res) => {
  const quote = await Quote.aggregate([
    { $match: {} },
    { $sample: { size: 1 } }
  ]);
  const quoteText = quote[0].line_text + ' - ' + quote[0].speaker;
  res.send(quote[0]);
});

// app.use(express.static('public'));

if (process.env.NODE_ENV === 'production') {
  //  Serve prodution assets like a particular file
  app.use(express.static('client/build'));

  // Serve index.html file for paths not in the server
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
