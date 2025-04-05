import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/album/airshow")
      .then((res) => res.json())
      .then((data) => setAlbum(data))
      .catch((err) => console.error("Failed to fetch album:", err));
  }, []);

  if (!album) return <h2>Loading memories…</h2>;

  return (
    <div className="App">
      <h1>{album.albumName}</h1>
      <div className="gallery">
        {album.photos.map((photo, index) => (
          <div key={index} className="photo">
            <img src={`http://localhost:3001${photo.localUrl}`} alt={photo.title} />
            <p>{new Date(photo.takenTimestamp * 1000).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
