import React, {
  FunctionComponent,
  useEffect,
  useReducer,
  ChangeEventHandler,
  MouseEventHandler
} from "react";
import "./App.scss";
import Gallery from "./components/Gallery";
import NavGrid from "./components/NavGrid";
import Search from "./components/Search";
import {
  fetchBreeds,
  reducer,
  initialState,
  setBreeds,
  setQuery,
  fetchImages,
  Breed,
  setSelectedBreed,
  setImages
} from "./state";
import { some } from "fp-ts/lib/Option";

const App: FunctionComponent = () => {
  useEffect(() => {
    fetchBreeds().then((breeds: any) => dispatch(setBreeds(breeds)));
  }, []);

  const [{ breeds, images, query, selectedBreed, favorites }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const onQueryChange: ChangeEventHandler<HTMLInputElement> = e => {
    dispatch(setQuery(e.target.value));
  };

  const handleSelectBreed = (breed: Breed): MouseEventHandler => _e => {
    dispatch(setSelectedBreed(some(breed)));
    fetchImages(breed).then((images: any) => dispatch(setImages(images)));
  };

  return (
    <div className="App">
      <div className="header-wrapper">
        <header className="container">
          <h1>Dogs!</h1>
          <Search query={query} onQueryChange={onQueryChange} />
        </header>
      </div>
      <main className="container">
        <NavGrid
          selectedBreed={selectedBreed}
          breeds={breeds}
          query={query}
          handleSelect={handleSelectBreed}
        />
        <Gallery breed={selectedBreed} images={images} dispatch={dispatch} favorites={favorites} />
      </main>
    </div>
  );
};

export default App;
