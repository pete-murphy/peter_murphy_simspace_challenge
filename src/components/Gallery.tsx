import React from "react";
import { FetchedImages, ImageURI, ErrorMsg, SelectedBreed } from "../state";
import { Either } from "fp-ts/lib/Either";

export interface GalleryProps {
  images: FetchedImages;
  breed: SelectedBreed;
}

const onNone = null;

const onSome = (breed: SelectedBreed) => (
  s: Either<ErrorMsg, Array<ImageURI>>
) =>
  s.fold(
    msg => <h3>{msg}</h3>,
    images => (
      <ul>
        {images.map(imageURI => (
          <figure key={imageURI}>
            <img alt={breed.getOrElse("")} src={imageURI}></img>
          </figure>
        ))}
      </ul>
    )
  );

export default function Gallery({ images, breed }: GalleryProps) {
  return <section>{images.fold(onNone, onSome(breed))}</section>;
}
