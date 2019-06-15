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
  FetchedBreeds,
  setQuery,
  fetchImages,
  Breed
} from "./state";

const App: FunctionComponent = () => {
  const [{ breeds, images, query, selectedBreed }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const onQueryChange: ChangeEventHandler<HTMLInputElement> = e => {
    dispatch(setQuery(e.target.value));
  };
  const handleSelectBreed = (breed: Breed): MouseEventHandler => e => {};

  useEffect(() => {
    fetchBreeds().then((breeds: any) => dispatch(setBreeds(breeds)));
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Dogs!</h1>
        <Search query={query} onQueryChange={onQueryChange} />
      </header>
      <main>
        <NavGrid
          breeds={breeds}
          query={query}
          handleClick={handleSelectBreed}
        />
        <Gallery breed={selectedBreed} images={images} />
      </main>

      <pre>
        {JSON.stringify({ breeds, images, query, selectedBreed }, null, 2)}
      </pre>
    </div>
  );
};

export default App;
