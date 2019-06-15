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
      {!loaded && <h3 className="loading">Loadingsdijfdsf!!!</h3>}
      <img
        style={{
          ...setOpacity(loaded),
          transition: "1500ms"
        }}
        onLoad={_e => setLoaded(true)}
        alt={breed.getOrElse("")}
        src={imageURI}
      ></img>
    </figure>
  );
}
