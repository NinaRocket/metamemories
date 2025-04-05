const express = require('express');
const path = require('path');
const cors = require('cors');
const { loadAlbum } = require('./facebook_export/posts/albumLoader');


const app = express();
const PORT = 3001;

// Allow frontend to access this API
app.use(cors());

// Static file serving for local images
app.use('/media', express.static(path.join(__dirname, 'facebook_export', 'posts', 'media')));

// Example endpoint to load an album
app.get('/api/album/:albumFile', (req, res) => {
  const albumFile = req.params.albumFile;

  // add .json if it's missing
  const normalizedFilename = albumFile.endsWith('.json') ? albumFile : `${albumFile}.json`;

  try {
    const data = loadAlbum(normalizedFilename);
    res.json(data);
  } catch (error) {
    console.error("🔥 Error loading album:", error.message);
    res.status(500).json({ error: 'Failed to load album' });
  }
});


app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
