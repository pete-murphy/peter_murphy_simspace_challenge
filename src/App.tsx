import React, {
  createContext,
  useEffect,
  useReducer,
  FunctionComponent,
  Dispatch
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
  AppState,
  AppAction
} from "./state";

const initialDispatch: Dispatch<AppAction> = (): void => { }
interface AppDispatch {
  dispatch: Dispatch<AppAction>
}
export const AppContext = createContext<AppState & AppDispatch>({ ...initialState, dispatch: initialDispatch })

const App: FunctionComponent = () => {
  useEffect(() => {
    fetchBreeds().then((breeds: FetchedBreeds) => dispatch(setBreeds(breeds)));
  }, []);

  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );

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
