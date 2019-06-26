import { Reducer, Dispatch } from "react";
import { Either, right, left } from "fp-ts/lib/Either";
import { Option, none, some } from "fp-ts/lib/Option";
import map from "lodash/fp/map";
import compose from "lodash/fp/compose";
import sortBy from "lodash/fp/sortBy";

export const SET_SELECTED_BREED = "SET_SELECTED_BREED";
export const SET_QUERY = "SET_QUERY";
export const FETCH_BREEDS = "FETCH_BREEDS";
export const FETCH_IMAGES = "FETCH_IMAGES";
export const SET_BREEDS = "SET_BREEDS";
export const SET_IMAGES = "SET_IMAGES";
export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";

export type Breed = string;
export type ImageURI = string;
export type Query = string;
export type ErrorMsg = string;

export type FetchedBreeds = Option<Either<ErrorMsg, Array<Breed>>>;
export type FetchedImages = Option<Either<ErrorMsg, Array<Image>>>;
export type SelectedBreed = Option<Breed>;
export interface Image {
  imageURI: ImageURI;
  breed: Breed;
  favorited: boolean;
}

interface SetSelectedBreedAction {
  type: typeof SET_SELECTED_BREED;
  payload: SelectedBreed;
}

interface SetBreedsAction {
  type: typeof SET_BREEDS;
  payload: FetchedBreeds;
}

interface SetImagesAction {
  type: typeof SET_IMAGES;
  payload: FetchedImages;
}

interface SetQueryAction {
  type: typeof SET_QUERY;
  payload: Query;
}

interface AddFavoriteAction {
  type: typeof TOGGLE_FAVORITE;
  payload: ImageURI;
}

export type AppAction =
  | SetBreedsAction
  | SetQueryAction
  | SetSelectedBreedAction
  | SetImagesAction
  | AddFavoriteAction;

export const fetchBreeds = () =>
  fetch("https://dog.ceo/api/breeds/list/all")
    .then(res => res.json())
    .then(({ message }) =>
      typeof message === "object"
        ? some(right(Object.keys(message)))
        : some(left("Failed to fetch dog breeds!"))
    )
    .catch(_ => some(left("Something went wrong!"))) as Promise<FetchedBreeds>;

export const setBreeds = (breeds: FetchedBreeds): SetBreedsAction => ({
  type: SET_BREEDS,
  payload: breeds
});

export const setQuery = (query: Query): SetQueryAction => ({
  type: SET_QUERY,
  payload: query
});

export const setSelectedBreed = (
  breed: SelectedBreed
): SetSelectedBreedAction => ({
  type: SET_SELECTED_BREED,
  payload: breed
});

export const setImages = (images: FetchedImages): SetImagesAction => ({
  type: SET_IMAGES,
  payload: images
});

export const fetchImages = (breed: Breed) =>
  fetch(`https://dog.ceo/api/breed/${breed}/images`)
    .then(res => res.json())
    .then(({ message }) =>
      Array.isArray(message)
        ? some(
            right(
              message.map(imageURI => ({
                breed,
                favorited: false,
                imageURI
              }))
            )
          )
        : some(left("Failed to fetch images!"))
    )
    .catch(_ => some(left("Something went wrong!"))) as Promise<FetchedImages>;

export interface AppState {
  breeds: FetchedBreeds;
  images: FetchedImages;
  query: Query;
  selectedBreed: SelectedBreed;
}

export const initialState: AppState = {
  breeds: none,
  images: none,
  query: "",
  selectedBreed: none
};

export interface AppDispatch {
  dispatch: Dispatch<AppAction>;
}
export type Context = AppState & AppDispatch;

export const reducer: Reducer<AppState, AppAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_BREEDS:
      return { ...state, breeds: action.payload };
    case SET_QUERY:
      return { ...state, query: action.payload };
    case SET_SELECTED_BREED:
      return { ...state, selectedBreed: action.payload };
    case SET_IMAGES:
      return { ...state, images: action.payload };
    case TOGGLE_FAVORITE:
      return {
        ...state,
        images: state.images.map(e =>
          e.map(
            compose(
              sortBy(({ favorited }) => !favorited),
              map(img =>
                img.imageURI === action.payload
                  ? { ...img, favorited: !img.favorited }
                  : img
              )
            )
          )
        )
      };
    default:
      return state;
  }
};
