import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { Atom } from "react-loading-indicators";
import PhotoDetails from "./photo/PhotoDetails";
import "./App.css";

function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
//     const filteredPhotos = photos.filter((photo) => {
//     const query = search.toLowerCase().trim();

//   return (
//     photo.title.toLowerCase().includes(query) ||
//     photo.body.toLowerCase().includes(query) ||
//     String(photo.id).includes(query)
//   );
// });


    async function fetchPhotos() {
      const startTime = Date.now();

      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
          { signal: controller.signal }
        );  

        if (!response.ok) {
          throw new Error("Failed to fetch gallery data.");
        }
        console.log("status:",response.status);

        const result = await response.json();

        // Keep the loader visible for at least 800ms
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 800 - elapsed);

        await new Promise((resolve) => setTimeout(resolve, remaining));

        if (!controller.signal.aborted) {
          setPhotos(result.slice(0, 100));
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Unable to load photos. Check your internet connection.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchPhotos();

    return () => controller.abort();
  }, []);

  useEffect(() => {
  const controller = new AbortController();

  async function fetchPhotos() {
    const startTime = Date.now();

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        { signal: controller.signal }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch gallery data.");
      }

      console.log("status:", response.status);

      const result = await response.json();

      // Keep the loader visible for at least 800ms
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 800 - elapsed);

      await new Promise((resolve) =>
        setTimeout(resolve, remaining)
      );

      if (!controller.signal.aborted) {
        setPhotos(result.slice(0, 100));
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(
          "Unable to load photos. Check your internet connection."
        );
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }

  fetchPhotos();

  return () => controller.abort();
}, []);

// ✅ Keep filteredPhotos outside useEffect
const filteredPhotos = photos.filter((photo) => {
  const query = search.toLowerCase().trim();

  return (
    photo.title.toLowerCase().includes(query) ||
    photo.body.toLowerCase().includes(query) ||
    String(photo.id).includes(query)
  );
});

if (loading) {
  return (
    <div className="loading-screen">
      <Atom
        color="#2563eb"
        size="medium"
        text="Loading"
        textColor="#2563eb"
      />
    </div>
  );
}
 
if (loading) {
  return (
    <div className="loading-screen">
      <Atom
        color="#2563eb"
        size="medium"
        text="Loading"
        textColor="#2563eb"
      />
    </div>
  );
}


  if (error) {
    return (
      <div className="loading-screen error-screen">
        <div>
          <h2>{error}</h2>
          <button onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="gallery-page">
      <header >
        <div>
     <input
       type="text"
       className="search-input"
       placeholder="search"
       value={search}
       onChange={(event) => setSearch(event.target.value)}
    />

    {search && (
      <button
      className="clear-search"
      onClick={() => setSearch("")}
      aria-label="Clear search"
      >
      ✕
    </button>
    )}
</div>
        <p className="eyebrow">DISCOVER THE WORLD</p>
        <h1>Explore Gallery 🌿</h1>
        <p>Discover beautiful images and their stories.</p>

      </header>

      <div className="photo-grid">
        {filteredPhotos.map((photo) => (
          <article
            className="photo-card"
            key={photo.id}
            onClick={() => navigate(`/photo/${photo.id}`)}
            tabIndex={0}
            role="link"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                navigate(`/photo/${photo.id}`);
              }
            }}
          >
            <img
              src={`https://picsum.photos/seed/gallery${photo.id}/600/400`}
              alt={photo.title}
              loading="lazy"
            />

            <div className="photo-content">
              <span className="photo-number">
                PHOTO #{photo.id}
              </span>

              <h2>{photo.title}</h2>

              <p>{photo.body}</p>

              <button
                onClick={(event) => {
                  event.stopPropagation();
                  navigate(`/photo/${photo.id}`);
                }}
              >
                Explore Photo →
              </button>
            </div>
          </article>
        ))}
      </div>

      <footer className="gallery-footer">
        Photos provided by Lorem Picsum
      </footer>
    </main>
  );
}

export default Gallery;

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Gallery />} />
//         <Route path="/photo/:id" element={<PhotoDetails />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }
