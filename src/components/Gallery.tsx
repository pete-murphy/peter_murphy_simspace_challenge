import React, { Dispatch } from "react";
import { FetchedImages, ImageURI, ErrorMsg, SelectedBreed, AppAction, ADD_FAVORITE } from "../state";
import { Either } from "fp-ts/lib/Either";
import GalleryImage from "./GalleryImage";
import "./Gallery.scss";

export interface GalleryProps {
  images: FetchedImages;
  breed: SelectedBreed;
  dispatch: Dispatch<AppAction>;
  favorites: Array<ImageURI>;
}

const onNone = null;

const onSome = (breed: SelectedBreed, dispatch: Dispatch<AppAction>, favorites: Array<ImageURI>) => (
  s: Either<ErrorMsg, Array<ImageURI>>
) =>
  s.fold(
    msg => <h3 className="error">{msg}</h3>,
    images => {
      const favoritedImages = images.filter(imageURI => favorites.includes(imageURI))
      const unFavoritedImages = images.filter(imageURI => !favorites.includes(imageURI))
      return (
        <ul>
          {favoritedImages.map((imageURI: ImageURI) => (
            <li style={{
              outline: favorites.includes(imageURI) ? "5px solid red" : "none"
            }} key={imageURI} onClick={_e => { dispatch({ type: ADD_FAVORITE, payload: imageURI }) }}>
              <GalleryImage imageURI={imageURI} breed={breed} />
            </li>
          ))}
          {unFavoritedImages.map((imageURI: ImageURI) => (
            <li style={{
              outline: favorites.includes(imageURI) ? "5px solid red" : "none"
            }} key={imageURI} onClick={_e => { dispatch({ type: ADD_FAVORITE, payload: imageURI }) }}>
              <GalleryImage imageURI={imageURI} breed={breed} />
            </li>
          ))}
        </ul>
      )
    }
  );

export default function Gallery({ images, breed, dispatch, favorites }: GalleryProps) {
  return (
    <section className="gallery-container">
      {images.fold(onNone, onSome(breed, dispatch, favorites))}
    </section>
  );
}
