
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Atom } from "react-loading-indicators";

export default function PhotoDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchDetails() {
      const startTime = Date.now();

      setLoading(true);
      setError("");
      setPhoto(null);

      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to load photo details.");
        }

        const result = await response.json();

        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 800 - elapsed);

        await new Promise((resolve) => setTimeout(resolve, remaining));

        if (!controller.signal.aborted) {
          setPhoto(result);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Unable to load details. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchDetails();

    return () => controller.abort();
  }, [id]);

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
      <div className="details-page">
        <button
          className="back-button"
          onClick={() => navigate("/")}
        >
          ← Back to Gallery
        </button>
        <p className="error-text">{error}</p>
      </div>
    );
  }

  if (!photo) return null;

  const imageUrl =
    `https://picsum.photos/seed/gallery${photo.id}/900/650`;

  return (
    <main className="details-page">
      <button
        className="back-button"
        onClick={() => navigate("/")}
      >
        ← Back to Gallery
      </button>

      <article className="details-card">
        <div className="details-image">
          <img src={imageUrl} alt={photo.title} />
        </div>

        <div className="details-info">
          <p className="eyebrow">PHOTO #{photo.id}</p>

          <h1>{photo.title}</h1>

          <h3>About this photo</h3>
          <p>{photo.body}</p>

          <div className="photo-meta">
            <span>Image ID: {photo.id}</span>
            <span>Collection: Nature Gallery</span>
          </div>

          <a
            className="full-image-link"
            href={`https://picsum.photos/seed/gallery${photo.id}/1200/900`}
            target="_blank"
            rel="noreferrer"
          >
            View Full Image ↗
          </a>
        </div>
      </article>
    </main>
  );
}
