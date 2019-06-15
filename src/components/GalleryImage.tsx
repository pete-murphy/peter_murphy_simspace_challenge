import React, { useState } from "react";
import { ImageURI, SelectedBreed } from "../state";

export interface GalleryImageProps {
  imageURI: ImageURI;
  breed: SelectedBreed;
}

const setOpacity = (loaded: boolean) => ({
  opacity: loaded ? 1 : 0
});

export default function GalleryImage({ imageURI, breed }: GalleryImageProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <figure key={imageURI}>
      {!loaded && (
        <div className="loading">
          <span role="img" aria-label="loading">
            🐶
          </span>
        </div>
      )}
      <img
        style={{
          ...setOpacity(loaded),
          transition: "800ms"
        }}
        onLoad={_e => setLoaded(true)}
        alt={breed.getOrElse("")}
        src={imageURI}
      ></img>
    </figure>
  );
}
