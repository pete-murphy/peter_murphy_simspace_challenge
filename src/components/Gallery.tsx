import React, { useContext } from "react";
import { Image, ErrorMsg, ADD_FAVORITE } from "../state";
import { Either } from "fp-ts/lib/Either";
import GalleryImage from "./GalleryImage";
import "./Gallery.scss";
import { AppContext } from "../App";

const onNone = null;

const onSome = (s: Either<ErrorMsg, Array<Image>>) =>
  s.fold(
    msg => <h3 className="error">{msg}</h3>,
    images => {
      const { dispatch } = useContext(AppContext);
      return (
        <ul>
          {images.map(({ imageURI, breed, favorited }) => (
            <li
              key={imageURI}
              onClick={_e => {
                dispatch({ type: ADD_FAVORITE, payload: imageURI });
              }}
            >
              <GalleryImage
                imageURI={imageURI}
                breed={breed}
                favorited={favorited}
              />
            </li>
          ))}
        </ul>
      );
    }
  );

export default function Gallery() {
  const { images } = useContext(AppContext);
  return (
    <section className="gallery-container">
      {images.fold(onNone, onSome)}
    </section>
  );
}
