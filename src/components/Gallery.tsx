import React, { useContext } from "react";
import { fold as foldEither } from "fp-ts/lib/Either";
import { fold as foldOption } from "fp-ts/lib/Option";

import { AppContext } from "src/App";
import {
  ordImage,
  toggleFavorite,
  FetchedImages,
  AppDispatch
} from "src/state";

import GalleryImage from "./GalleryImage";
import "./Gallery.scss";
import { sort } from "fp-ts/lib/Array";

type onSomeProps = {
  dispatch: AppDispatch["dispatch"];
};

const onNone = () => null;
const onSome = ({
  dispatch
}: onSomeProps): ((e: FetchedImages) => JSX.Element) =>
  foldEither(
    msg => <h3 className="error">{msg}</h3>,
    images => {
      const { breed } = images[0];
      return (
        <>
          <h3>
            Showing {images.length} results for {breed}
          </h3>
          <ul>
            {sort(ordImage)(images).map(({ imageURI, breed, favorited }) => (
              <li
                key={imageURI}
                onClick={_e => {
                  dispatch(toggleFavorite(imageURI));
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
        </>
      );
    }
  );

export default function Gallery() {
  const { images, dispatch } = useContext(AppContext);
  return (
    <section className="gallery-container">
      {foldOption(onNone, onSome({ dispatch }))(images)}
    </section>
  );
}
