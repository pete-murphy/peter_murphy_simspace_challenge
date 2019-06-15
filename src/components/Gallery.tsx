import React from "react";
import { FetchedImages, ImageURI, ErrorMsg, SelectedBreed } from "../state";
import { Either } from "fp-ts/lib/Either";
import GalleryImage from "./GalleryImage";
import "./Gallery.scss";

export interface GalleryProps {
  images: FetchedImages;
  breed: SelectedBreed;
}

const onNone = null;

const onSome = (breed: SelectedBreed) => (
  s: Either<ErrorMsg, Array<ImageURI>>
) =>
  s.fold(
    msg => <h3 className="error">{msg}</h3>,
    images => (
      <ul>
        {images.map(imageURI => (
          <li key={imageURI}>
            <GalleryImage imageURI={imageURI} breed={breed} />
          </li>
        ))}
      </ul>
    )
  );

export default function Gallery({ images, breed }: GalleryProps) {
  return (
    <section className="gallery-container">
      {images.fold(onNone, onSome(breed))}
    </section>
  );
}
