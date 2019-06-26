import React, { useState } from "react";
import { Image } from "../state";

export default function GalleryImage({ imageURI, breed, favorited }: Image) {
  const [loaded, setLoaded] = useState(false);
  return (
    <figure
      key={imageURI}
      style={{
        boxShadow: favorited ? "0 0 0 5px var(--red)" : "none"
      }}
    >
      {!loaded && (
        <div className="loading">
          <span role="img" aria-label="loading">
            🐶
          </span>
        </div>
      )}
      <img
        style={{
          opacity: loaded ? 1 : 0,
          transition: "800ms"
        }}
        onLoad={_e => setLoaded(true)}
        alt={breed}
        src={imageURI}
      ></img>
    </figure>
  );
}
