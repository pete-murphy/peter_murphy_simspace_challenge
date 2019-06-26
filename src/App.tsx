import React, {
  createContext,
  useEffect,
  useReducer,
  FunctionComponent
} from "react";
import "./App.scss";
import Gallery from "./components/Gallery";
import NavGrid from "./components/NavGrid";
import Search from "./components/Search";
import {
  fetchBreeds,
  initialState,
  reducer,
  setBreeds,
  FetchedBreeds,
  Context
} from "./state";

export const AppContext = createContext<Context>({} as Context);

const App: FunctionComponent = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchBreeds().then((breeds: FetchedBreeds) => dispatch(setBreeds(breeds)));
  }, []);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      <div className="App">
        <div className="header-wrapper">
          <header className="container">
            <h1>Dogs!</h1>
            <Search />
          </header>
        </div>
        <main className="container">
          <NavGrid />
          <Gallery />
        </main>
      </div>
    </AppContext.Provider>
  );
};

export default App;
