const fs = require('fs');
const path = require('path');

function loadAlbum(albumFileName) {
  const fullPath = path.join(__dirname, 'album', albumFileName);
  console.log("👉 Loading album from:", fullPath);

  const albumJson = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));

  const photos = albumJson.photos.map(photo => {
    const relativePath = photo.uri.split('/media/')[1]; // Extract path after /media/
    const localUrl = `/media/${relativePath}`;
    return {
      title: photo.title,
      creationTimestamp: photo.creation_timestamp,
      takenTimestamp: photo.media_metadata?.photo_metadata?.exif_data?.[0]?.taken_timestamp || null,
      localUrl,
    };
  });

  return {
    albumName: albumJson.name,
    photos,
  };
}

module.exports = { loadAlbum };
