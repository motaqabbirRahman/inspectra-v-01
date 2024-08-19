import express from 'express';
import axios from 'axios';

const app = express();

app.get('/proxy', async (req, res) => {
  const url = req.query.url as string | undefined;

  if (!url) {
    return res.status(400).send('URL parameter is missing');
  }

  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    res.set('Content-Type', response.headers['content-type']);
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching image:', error.message);
    res.status(500).send('Error fetching image');
  }
});

app.listen(3001, () => {
  console.log('Proxy server running on port 3001');
});
