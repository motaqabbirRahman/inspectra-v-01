import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 4001;

// Serve static files from the Vite build folder (dist)
app.use(express.static(path.join(__dirname, '../dist')));

// Catch-all route to serve index.html for any route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
